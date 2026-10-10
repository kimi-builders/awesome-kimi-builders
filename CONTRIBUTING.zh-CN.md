# 贡献指南

[English](./CONTRIBUTING.md)(主版本) · **中文**

> 本文件是英文主版本的中文伴生版;内容以英文版为准,两者须在同一 PR 内同步更新。

## 收录什么

**不要求必须用 Kimi 构建。** 项目可以由任何 Agent、多个 Agent 协作，或不借助 Agent 开发。
我们关注有趣、实用且能满足真实用户需求的项目，并要求有证据支持以下**任意一项**关联：

| 收录口径 | 什么样的项目符合 | 合适的一手证据 |
| --- | --- | --- |
| **以 Kimi 为基座**（`base`） | 项目核心功能使用 Kimi 模型或 API，开发工具不限。 | 展示已实现的 Kimi 模型或 API 使用方式的源码、配置或文档。 |
| **为 Kimi 生态**（`eco`） | 明确服务 Kimi 用户或开发者的工具、集成、SDK、Skills 或资源，开发工具不限。 | 说明具体 Kimi 集成或生态用途的文档或源码。 |
| **Kimi 参与构建**（`part`） | Kimi 模型或 Agent 实际参与开发；部分参与即可，成品运行时可以不依赖 Kimi。 | 作者记录或说明 Kimi 实际贡献的开发过程资料。 |

三项是可选口径，不是必须同时满足的条件。请说明项目面向谁、满足什么需求，以及有趣或实用之处。
没有最低 Star 数或项目规模要求。Moonshot 官方工具与模型也可以收录；官方身份与收录口径
是两回事，需要单独核实。

以下仅为说明性示例，不是新增收录：

| 示例 | 收录口径 |
| --- | --- |
| 用 Codex 开发、核心功能调用 Kimi API 的应用 | `base` |
| 用 Claude Code 开发的 Kimi 集成 | `eco` |
| Kimi Code 参与开发、运行时不依赖 Kimi 的解谜游戏 | `part` |
| 仅由其他 Agent 开发、与 Kimi 没有明确关联的项目 | 不符合 |

`scope` 仍为单值：选择证据最充分的一项，其他关联可在正文或审核证据中说明。
Agent 标签记录有资料支持的集成或参与关系，不代表准入资格；不清楚时将 `agents` 留空，
不要仅因项目调用 Kimi API 或服务 Kimi 生态就补上 `kimi` 标签。

不收:

- 与 Kimi 无关的项目(包括「顺便提一句也能用 Kimi」的凑数条目)
- **已废弃或停止维护的项目** —— 无论曾经多好。上游 README 自己宣布迁移/停更的,从清单移除
- 无法公开访问的项目(私有仓库、需要邀请的页面)
- 纯营销页(没有可运行/可阅读内容的落地页)
- 你自己的项目如果还不存在或只是个空壳 —— 先做出来再推荐

## 流程

1. Fork 本仓库,在 `data/entries/` 新建 `<slug>.json`(slug = 小写字母/数字/中划线,
   通常取项目仓库名)。**一个 PR 只加一个项目**,顺手修别人的条目请单独开 PR。
2. 字段按 [`data/README.zh-CN.md`](./data/README.zh-CN.md) 的 schema 填;`descriptionZh`
   和 `descriptionEn` 都必须写,各一句话,说清楚「做什么 + 和 Kimi 的关系」。
   提供所选口径的证据；只有 `part` 需要 Kimi 参与开发的证据。
3. 本地验证:
   ```bash
   node scripts/validate.mjs
   node --test scripts/catalog.test.mjs
   node scripts/build-readme.mjs   # Regenerates both READMEs' list sections
   node scripts/build-catalog.mjs
   git add data/ README.md README.zh-CN.md
   ```
4. 提 PR:标题写 `add: <项目名>`;描述里贴项目链接、目标用户／使用场景和所选口径的证据。
   CI 会重跑校验、测试，以及两份 README 和目录的生成一致性检查。
5. 维护者 review 的看点:链接可访问、项目仍在维护、用户价值及至少一项 Kimi 关联有依据、
   描述属实且双语、`agents` 标注准确、
   分类恰当。小修改维护者会直接 suggestion;口径问题在 PR 里讨论。

## 质量要求

- 描述实事求是,禁止「最好/最强/第一」;不照抄项目方的广告词。
- 描述里不要带链接(条目本身已有 url);不要带 emoji。
- 条目按分类内「新收录在前」排序(生成脚本自动处理)。
- `url` 是项目的公开入口，优先使用仓库地址；仓库与官网地址分别填写在 `repoUrl` 和
  `homepage` 中（如有）。
- 项目废弃、停更或长期 404 时可撤下条目，撤下也走 PR。改名或仓库转移应更新原条目，保留 ID。

## 行为准则

互相尊重,就事论事。涉及骚扰、歧视、垃圾信息的行为会被屏蔽并报告给 GitHub。
(简版:像在一个公开技术社区里那样说话。)

## 发布审核

遵循 `data/README.zh-CN.md` 的 v1 协议。新推荐可先标为 pending，维护者核对一手
证据、作者及官方主体、kind／scope、双语正文与快速使用后，才批准 published 并
合并 main，进入每周快照。withdrawn 是明确审核的动作，不能靠删除文件推断。
运行 `node scripts/build-catalog.mjs` 更新目录，CI 检查一致性。格式通过不证明
功能；未核实宣称不能发布。仓库改名／转移保留 ID，不仅为改名撤下条目。
站点已有作品绑定需在站点另行审核。
