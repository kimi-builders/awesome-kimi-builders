# 条目结构——协议 v1

[English](./README.md)（主版本） · **中文**

每个项目仅存于 `data/entries/<slug>.json`，这是条目的唯一来源。
发布与字段归属见 [DATA-FLOW](../DATA-FLOW.zh-CN.md)。

必填：`protocolVersion: 1`、不可变 `id`、`publication`（待核实 pending、可发布
published、明确撤下 withdrawn）、名称与 HTTPS URL、语义等价的双语一句话描述、
category、去重的 agents、official 与 officialSubject。
名称 ≤60 字符，URL ≤500，短描述中／英分别 ≤120／160。
`official` 仅在主体为 `moonshot` 时为 true；其他主体为 community、vendor、none。
可选 `repoUrl` 与 `homepage` 分别指向源码和独立官网。

发布还要求：原作者 `author: {name,url}`；独立审核的 kind 与 scope；一手 Kimi
关联证据 `kimiEvidence: [{url,note}]`；`review: {checkedAt,revision,note}`；
`bodyZh` 与 `bodyEn` 原创 Markdown，含介绍、快速使用、前提、限制、出处及核对版本。
撤下必须有 review。推荐来源 `recommendation: {url,githubLogin}` 仅记录真实已合并
PR，不能推断站内身份。pending 不进入公开 README 或可发布条目。

category 仅为仓库分组：official、cli-agents、sdks、apps、integrations、learning；
不能推断站点 kind／scope。scope 为 base（基于 Kimi）、eco（面向生态）、part（参与开发）。
kind：app、miniapp、website、extension、cli、sdk、bot、workflow、skill、prompt、
slides、demo、content、other。
Agent 注册表与站点一致：kimi、kimi-agent、agent-swarm、claude-code、codex、cursor、
copilot、windsurf、trae、cline、gemini、qoder、zcode、workbuddy、pi-agent。

`sourceFile` 由生成器加入，条目作者不要填写。ID 改名／转移后不变，URL 不重复；
拒绝未知字段、错误类型、非法路径和符号链接。README 按 Git 新增时间排序，以文件名
消除同序；完整目录按稳定 ID 排序，产物确定性生成。

```bash
node scripts/validate.mjs
node scripts/build-readme.mjs
node scripts/build-catalog.mjs
node --test scripts/catalog.test.mjs
```

`initial-review.json` 保留原始 52 项及未完成核对事项，仅供审核，不参与发布。
