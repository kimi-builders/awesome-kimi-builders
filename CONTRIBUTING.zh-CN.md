# 贡献指南

[English](./CONTRIBUTING.md)(主版本) · **中文**

> 本文件是英文主版本的中文伴生版;内容以英文版为准,两者须在同一 PR 内同步更新。

## 收录什么

**口径:Kimi 参与即可,不要求 100% 由 Kimi 构建。**

可以收录:

- 用 Kimi 模型/Kimi Code/其他 Agent 参与构建的项目(参与的 Agent 标在 `agents` 里)
- 为 Kimi 生态做的应用(MCP 服务、IDE 插件、提示词/Skills 包、集成)
- 以 Kimi 为基座模型的应用
- Moonshot 官方工具与模型

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
3. 本地验证:
   ```bash
   node scripts/validate.mjs
   node scripts/build-readme.mjs   # 重新生成两份 README 的清单区
   git add data/ README.md README.zh-CN.md
   ```
4. 提 PR:标题写 `add: <项目名>`;描述里贴项目链接和一句话理由。
   CI 会重跑校验和「README 是否为最新生成」检查。
5. 维护者 review 的看点:链接可访问、项目仍在维护、描述属实且双语、`agents` 标注准确、
   分类恰当。小修改维护者会直接 suggestion;口径问题在 PR 里讨论。

## 质量要求

- 描述实事求是,禁止「最好/最强/第一」;不照抄项目方的广告词。
- 描述里不要带链接(条目本身已有 url);不要带 emoji。
- 条目按分类内「新收录在前」排序(生成脚本自动处理)。
- 项目名与 URL 一致:`url` 优先 GitHub 仓库;没有仓库再放官网 `homepage` 字段。
- 项目废弃、停更、改名或长期 404 时条目会被移除(移除也走 PR)。

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
