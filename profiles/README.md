# 通过 GitHub 链接引入配置分段

这里是由现有 Surge 模块生成的 detached sections，用于在主配置里通过 `#!include` 获取资源。不是 `[Module]` 注册表，也不会自动出现在模块独立开关中。

- `klee-foundation.dconf`：HTTPDNS 拦截器 → 广告平台拦截器 → 快捷搜索 → DNS 防泄露 → 节点检测工具 → BoxJs → Script-Hub。
- `klee-ads.dconf`：其余已成功转换、上游标记为去广告的条目，沿用目录顺序。
- `klee-mitm.dconf`：上述模块所需主机名，附加 Google 重写和现有 Sub-Store 使用的公共主机名。
- `manifest.json`：完整选择、优先级、原始参数默认值和排除项。

当前共256项。当前可莉官方模板将 HTTPDNS、广告平台拦截器排在前两位。TestFlight 解锁在源模板中默认关闭；已有内嵌 Sub-Store 的配置不再重复加载它。哈罗和驾校一点通源内容存在阻塞，不纳入运行配置。签到等其余工具未启用。

参数在生成时按模块默认值展开，因为普通配置分段不会处理模块 `#!arguments` 元数据。规则、脚本等有序段先引入 foundation，再引入 ads，最后保留用户原有内容。MITM 的 `hostname` 必须只有一个最终值；主配置保留自己的CA证书和其他选项，主机名由远程专用分段提供，不能再用本地 `hostname` 覆盖它。

适用于 Surge Mac 6.9.0+/iOS 5.22.0+ 的混合分段引用。重新加载配置时按 Surge 的远程资源加载机制获取内容；不承诺 GitHub 提交后会立即刷新所有缓存。此处含大量App规则，不表示已对所有App完成流量测试。

```ini
[Rule]
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-foundation.dconf
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-ads.dconf
# 此后是原有规则，包括末尾 FINAL

[Script]
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-foundation.dconf
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-ads.dconf
# 此后保留原有脚本

[MITM]
#!include https://raw.githubusercontent.com/snowdegit/surge-module-hub/main/profiles/klee-mitm.dconf
# CA证书等内容只保存在用户私有配置中
```

实际生成的配置还会为 Body Rewrite、Map Local、Header Rewrite 等实际存在的段添加对应链接。不要只复制上面的局部示例替代完整生成结果。

生成器 `tools/integrate_profile.py` 接收私有配置路径，备份并输出新配置到仓库以外。用户配置、节点密钥、订阅链接及证书不提交到本仓库。

优先级来源：[可莉官方模板](https://raw.githubusercontent.com/luestr/ProxyResource/main/Tool/Loon/Lcf/zh-CN/Loon_Auto_Select_Config_By_iKeLee.lcf)。语法依据：[Surge分段引用说明](https://manual.nssurge.com/profile/format.html)。
