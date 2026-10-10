# 条目结构——协议 v1

[English](./README.md)（主版本） · **中文**

每个项目仅存于 `data/entries/<slug>.json`，这是条目的唯一来源。
发布与字段归属见 [DATA-FLOW](../DATA-FLOW.zh-CN.md)。

必填：`protocolVersion: 1`、不可变 `id`、`publication`（待核实 pending、可发布
published、明确撤下 withdrawn）、名称与 HTTPS URL、语义等价的双语一句话描述、
category、去重的 agents、official 与 officialSubject。agents 只记录有文档依据的
Agent 集成或参与，允许空数组。
名称 ≤60 字符，URL ≤500，短描述中／英分别 ≤120／160。
`official` 仅在主体为 `moonshot` 时为 true；其他主体为 community、vendor、none。
可选 `repoUrl` 与 `homepage` 分别指向源码和独立官网。

发布还要求：原作者 `author: {name,url}`；独立审核的 kind 与 scope；支持所选 Kimi
口径的一手证据 `kimiEvidence: [{url,note}]`；`review: {checkedAt,revision,note}`；
`bodyZh` 与 `bodyEn` 原创 Markdown，含介绍、快速使用、前提、限制、出处及核对版本。
撤下必须有 review。推荐来源 `recommendation: {url,githubLogin}` 仅记录真实已合并
PR，不能推断站内身份。pending 不进入公开 README 或可发布条目。

category 仅为仓库分组：official、cli-agents、sdks、apps、integrations、learning；
不能推断站点 kind／scope。
kind：app、miniapp、website、extension、cli、sdk、bot、workflow、skill、prompt、
slides、demo、content、other。
Agent 注册表与站点一致：kimi、kimi-agent、agent-swarm、claude-code、codex、cursor、
copilot、windsurf、trae、cline、gemini、qoder、zcode、workbuddy、pi-agent。

## 选择口径与记录证据

我们收集有趣、能满足真实用户需求的项目。项目须在以下三种口径中满足**任意一种**，
并有可核实的关联。它可以由任何 Agent、多个 Agent 构建，也可以没有已记录的 Agent
参与；只有 `part` 要求 Kimi 参与开发。

| 口径 | 关系 | 一手证据示例 |
| --- | --- | --- |
| `base` — 以 Kimi 为基座 | Kimi 模型或 API 支撑项目的核心能力 | 项目文档或代码，说明核心能力如何使用 Kimi API |
| `eco` — 为 Kimi 生态 | 项目明确服务于 Kimi 用户、开发者或相关集成 | 有文档说明的 Kimi 集成、兼容指南、SDK、工具或学习资源 |
| `part` — Kimi 参与构建 | Kimi 参与了项目的开发过程 | 作者说明、开发日志或贡献记录，说明 Kimi 在开发中的作用 |

`base` 和 `eco` 不要求 Kimi 参与构建，不要求 `agents` 包含 `kimi`，也不要求开发
过程的证据。反过来，`part` 项目不必在运行时使用 Kimi。通用项目仍须有明确、可核实
的 Kimi 关系才能收录；仅仅实用或由某个 Agent 构建并不足够。

`scope` 是单值，不是数组。选择证据最充分的一种关系；多种关系都成立时，将其他
关系写入 `bodyZh` / `bodyEn` 和 `kimiEvidence`，不重复收录，也不扩展协议。
每条证据说明应解释链接支持哪种关系。双语摘要写清项目做什么及已核实的 Kimi 关系；
证据仅能说明运行时使用或生态兼容时，不能改写为“由 Kimi 构建”。

`agents` 只记录有文档依据的 Agent 集成或参与。例如，核心能力使用 Kimi、且有记录
说明使用 Codex 开发的应用，可选 `base` 与 `agents: ["codex"]`；有文档说明支持
Kimi 生态、但没有已记录 Agent 的工具，可选 `eco` 与 `agents: []`。这些是示例，
并非已审核条目。模型／API 使用不证明使用了某个编程 Agent，缺少 Agent 文档时
不能猜测补填。收录资格由口径证据确定，不由 Agent 数组是否包含 Kimi 决定。

## 生成与校验

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
