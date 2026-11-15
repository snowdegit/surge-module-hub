# 全量转换测试与发布门槛

本库使用有限测试验证明确的转换行为，不把「测试用例通过率」等同所有设备、所有App版本上的「兼容成功率100%」。

## 本次结果

| 范围 | 结果 |
| --- | --- |
| 全部275项的源配置/输出结构、URL样例、固定响应、JSON行为及参数检查 | 10,313项：10,311通过，2项上游阻塞 |
| HTTP脚本路由、首匹配、开关、类型、文本/二进制正文适配 | 588项通过 |
| cron/generic调用、开关与可修改计划 | 20项通过 |
| Node行为/回归/网页测试组 | 13组通过 |
| 每个jq源声明至少一个可执行的合成结构样例 | 237/237覆盖 |
| Surge Mac 6.12.0 原生JS解析 | 93/93脚本通过 |
| Surge原生HTTP/任务分发、参数及正文适配 | 608/608通过（上游业务函数替换为探针） |
| Surge原生实际算法合成输入 | 7/7通过 |
| Surge原生模块加载、真实App流量回归 | 尚未完成 |

详细记录：[全量报告](test-results/full-report.json)、[HTTP分发报告](test-results/dispatch-report.json)、[任务报告](test-results/task-report.json)。

### 修复的实际问题

1. 批量JSON替换错误地把整个值数组赋给每个字段；改为按索引配对。
2. URL重定向/替换丢掉未匹配的路径或参数；保留前后缀。
3. URL替换后Host未同步；按新URL更新并保留其他请求头。
4. 合并的Surge脚本入口混用文本/二进制正文；按被选中的上游脚本声明转换输入。
5. 数字开头的根JSON键被生成成数组常量；改为明确对象索引。
6. 对类型不匹配的JSON路径删除发生错误；保留原JSON而不是返回错误字符串。
7. 默认关闭的定时任务不能通过参数启用、cron参数固化；使用原生requirement开关和cron占位符，并增加执行前保护。
8. 引号包裹的switch布尔值被当成真值字符串；按Loon声明类型转为Boolean。
9. 合并URL正则带逗号可能被当成脚本选项分隔符；正则作为带引号的选项输出。

## 测试如何避免自证

`tools/full_test.py` 独立读取原始.lpx与生成.sgmodule，不导入转换器函数。

- 逐项核对所有路由规则，不允许条目静默丢失。
- 为原始URL正则构造实际匹配样例，并比对转换后的模式。
- 对全部本地固定响应核对状态码与解码后的正文。
- 对JSON路径操作，用独立的Python模型生成期望值，再执行输出jq进行比较。
- 对原始jq与转换后的jq执行相同的合成JSON输入，比较结果；类型不匹配时的等价错误路径单独记录，不能替代成功样例。
- 为237个jq源声明各提供至少一个成功执行的合成结构。样例并非真实App抓包，不证明App字段会永远不变。
- HTTP分发与任务测试用探针替换上游业务函数，验证选择和接口适配；这些588/20项不等于完整测试上游JS内部算法。
- 回归测试还实际执行了部分业务脚本，并验证二进制正文、Unicode、参数和URL行为。
- 网页测试使用隔离DOM模型，不宣称等同Safari真机测试。

## 两个明确阻塞

- 哈罗：上游唯一核心脚本404，不能凭空恢复。
- 驾校一点通：源配置把`http-response`当URL条件、把接口URL当JSON路径，不能推断原意。

二者保留为失败/阻塞，不会删掉、跳过或算成通过。网页禁用安装按钮。

## 重现

```sh
python3 tools/build.py
python3 tools/validate.py
python3 tools/full_test.py
node --max-old-space-size=192 --test tests/*.test.cjs
python3 tools/release_gate.py
```

`full_test.py` 默认严格模式：只要有失败（包括上游阻塞）就返回非零。`--allow-blocked`只用于区分已知上游阻塞与新增转换回归，报告仍保留失败数量。

`release_gate.py`在上游阻塞、原生模块验证或真实App回归未完成时始终不通过。CI中「转换测试」和「完整兼容发布门槛」是两个不同任务。

## 原生测试

已于2026-11-15通过Surge内置Tailscale连接Surge Mac 6.12.0（build 12840）的HTTP API，原生探针成功。入站请求经规则匹配，本机回环地址必须直连，避免被FINAL规则发送到远程代理。

[原生解析/分发报告](test-results/native-report.json)、[实际算法合成输入报告](test-results/native-behavior-report.json)。原生分发测试用探针替换上游函数，验证路由、参数类型、正文转换与任务开关，不执行签到、账号或其他外部请求。实际算法样例覆盖Telegram、腾讯视频、Google、Spotify、哔哩哔哩和IT之家；网络、写存储及通知被隔离。

这些测试使用真实Surge JS引擎，但仍未加载全部275个模块，也不是完整App流量验证。`module_load_tested`和`real_app_tested`保持false，完整兼容门槛仍不通过。

先通过只读状态接口和隔离JS探测确认连接；不切换现有配置、不启用全部模块、不执行签到/自动加入任务，不向公网暴露密钥。

```sh
SURGE_TEST_API_KEY='在本机环境变量中提供' python3 tools/native_probe.py --api-url http://你的Mac:6171
```

也可使用位于仓库之外的`--key-file`；HTTPS可用`--ca-file`提供信任证书。工具不关闭TLS验证，不记录密钥。

原生JS回放、模块加载和真实App回归是不同层次。HTTP API脚本探测成功也不会自动把`module_load_tested`或`real_app_tested`设成true。

原生测试命令（密钥仅通过环境变量传入）：

```sh
python3 tools/native_test.py --api-url http://你的Mac:6171
python3 tools/native_behavior.py --api-url http://你的Mac:6171
```
