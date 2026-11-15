# iOS 专用分段引用

这些文件由 `modules-ios/` 的显式默认值模块生成，供主配置 `#!include` 引用。旧的 `profiles/klee-...` 地址不再用于这份iOS配置。规则通过本目录 `rules-v2/` 的RULE-SET引用，原始连续策略优先级不变。

基础顺序：HTTPDNS拦截器、广告平台拦截器、快捷搜索、DNS防泄露、节点检测、BoxJs、Script-Hub；已有Sub-Store不重复引入。其后是通过静态检查的应用去广告条目。共255项；iOS目录中的3个源阻塞项全部排除。

远程dconf的Rule段仅用于独立文件校验，主配置不得include它；主配置只引用Script、复写和MITM等实际所需分段。参见manifest.json。

生成方式：`python3 tools/integrate_profile.py --platform ios --input 私有配置 --output 仓库外路径`。私有配置和证书不提交到GitHub。原生iOS完整配置加载、真实App流量仍待验证。
