> **2026-11-15 修正（v2）**：旧版远程分段未满足iOS托管配置独立校验的FINAL要求，不能正常加载；旧版配置请重新生成/替换。
> v2远程dconf具有独立校验所需的`[Rule] FINAL,DIRECT`，但主配置**绝不引用它们的Rule段**。主配置只用RULE-SET加载去广告路由，自己的FINAL保持在末尾。
> 不要为了修复旧配置而给早期Rule include补上FINAL，这会提前终止匹配。
> 上游有道词典存在一条没有策略的裸域名规则，v2未猜测其策略，已明确排除并在manifest记录。此前静态检查未识别这个缺陷。

# 通过 GitHub 链接引入配置分段

这里是由现有 Surge 模块生成的 detached sections，用于在主配置里通过 `#!include` 获取资源。不是 `[Module]` 注册表，也不会自动出现在模块独立开关中。

- `klee-foundation-v2.dconf`：HTTPDNS 拦截器 → 广告平台拦截器 → 快捷搜索 → DNS 防泄露 → 节点检测工具 → BoxJs → Script-Hub。
- `klee-ads-v2.dconf`：其余已成功转换、上游标记为去广告的条目，沿用目录顺序。
- `klee-mitm-v2.dconf`：上述模块所需主机名，附加 Google 重写和现有 Sub-Store 使用的公共主机名。
- `manifest.json`：完整选择、优先级、原始参数默认值和排除项。

当前共256项。当前可莉官方模板将 HTTPDNS、广告平台拦截器排在前两位。TestFlight 解锁在源模板中默认关闭；已有内嵌 Sub-Store 的配置不再重复加载它。哈罗和驾校一点通源内容存在阻塞，不纳入运行配置。签到等其余工具未启用。

参数在生成时按模块默认值展开，因为普通配置分段不会处理模块 `#!arguments` 元数据。脚本和复写有序段先引入 foundation，再引入 ads，最后保留用户原有内容。路由规则改为45个按原始顺序连续分组的RULE-SET，保留901条有效规则的策略、先后关系和no-resolve选项。MITM 的 `hostname` 必须只有一个最终值；主配置保留自己的CA证书和其他选项，主机名由远程专用分段提供，不能再用本地 `hostname` 覆盖它。

适用于 Surge Mac 6.9.0+/iOS 5.22.0+ 的混合分段引用。重新加载配置时按 Surge 的远程资源加载机制获取内容；不承诺 GitHub 提交后会立即刷新所有缓存。此处含大量App规则，不表示已对所有App完成流量测试。

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/rules-v2/foundation-001.list,REJECT,update-interval=3600
# 实际主配置含全部45个连续策略分组，不可只复制第一组
# 此后是原有规则，包括末尾 FINAL

[Script]
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-foundation-v2.dconf
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-ads-v2.dconf
# 此后保留原有脚本

[MITM]
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-mitm-v2.dconf
# CA证书等内容只保存在用户私有配置中
```

实际生成的配置还会为 Body Rewrite、Map Local、Header Rewrite 等实际存在的段添加对应链接。不要只复制上面的局部示例替代完整生成结果。

生成器 `tools/integrate_profile.py` 接收私有配置路径，备份并输出新配置到仓库以外。用户配置、节点密钥、订阅链接及证书不提交到本仓库。

优先级来源：[可莉官方模板](https://raw.githubusercontent.com/luestr/ProxyResource/main/Tool/Loon/Lcf/zh-CN/Loon_Auto_Select_Config_By_iKeLee.lcf)。语法依据：[Surge分段引用说明](https://manual.nssurge.com/profile/format.html)。
