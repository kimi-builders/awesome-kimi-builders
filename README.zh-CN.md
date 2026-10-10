# Awesome Kimi Builders [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md)(主版本) · **中文**

收集与 Kimi 有关联、有趣且实用的项目，由 [kimi.builders](https://kimi.builders) 社区维护。

## 收录口径

**不要求必须用 Kimi 构建。** 项目可以由任何 Agent、多个 Agent 协作，或不借助 Agent 开发。
我们关注项目是否有趣、能满足真实用户需求，并且有证据支持以下**任意一项**关联：

| 收录口径 | 什么样的项目符合 | 是否要求 Kimi 参与开发 |
| --- | --- | --- |
| **以 Kimi 为基座**（`base`） | 项目核心功能使用 Kimi 模型或 API。 | 不要求，开发工具不限。 |
| **为 Kimi 生态**（`eco`） | 明确服务 Kimi 用户或开发者的工具、集成、SDK、Skills 或资源。 | 不要求，关键是生态关联。 |
| **Kimi 参与构建**（`part`） | Kimi 模型或 Agent 实际参与了开发。 | 要求有参与，但不要求全程；成品运行时可以不依赖 Kimi。 |

三项是可选口径，不是必须同时满足的条件。例如，用 Codex 开发、调用 Kimi API 的应用可按
`base` 推荐；用 Claude Code 开发的 Kimi 集成可按 `eco` 推荐。这些仅是说明性示例，不是新增收录。

Agent 标签只记录有资料支持的集成或参与关系，不是准入门槛，也不能证明项目由 Kimi 编写；
不清楚时可以留空。有趣的项目仍需具有明确的 Kimi 关联；已废弃或停止维护的项目不予收录。

示例、证据要求及审核流程见 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。

## 目录

- [官方与模型](#官方与模型)
- [CLI 与 Agent 工具](#cli-与-agent-工具)
- [SDK 与 API 客户端](#sdk-与-api-客户端)
- [应用与作品](#应用与作品)
- [集成与插件](#集成与插件)
- [教程与资源](#教程与资源)

<!-- BEGIN GENERATED LIST(由 scripts/build-readme.mjs 生成,请勿手改) -->
### 官方与模型

- [Kimi Code](https://github.com/MoonshotAI/kimi-code) — Kimi Code CLI 是 Moonshot AI 的终端编码 Agent，可通过 Kimi 模型读取、修改代码并使用工具。 `kimi` `official`
- [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3) — Kimi K3 是 Moonshot AI 发布的开放权重多模态模型，官方仓库提供模型说明与部署资料。 `official`

### CLI 与 Agent 工具

- [wjt0321/kimi-code-desktop](https://github.com/wjt0321/kimi-code-desktop) — wjt0321 的 Windows 桌面客户端通过本机已安装的 Kimi Code CLI 提供窗口操作。 `kimi`
- [Yann-Up/kimi-code-desktop](https://github.com/Yann-Up/kimi-code-desktop) — Yann-Up 的桌面客户端将本地 Kimi Code CLI 的 Web 界面嵌入原生窗口。 `kimi`

### SDK 与 API 客户端


### 应用与作品


### 集成与插件


### 教程与资源


<!-- END GENERATED LIST -->

## 贡献

一个 PR 收录一个项目,先读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。
本仓库如何出现在 kimi.builders 的 Awesome 页:[DATA-FLOW.zh-CN.md](./DATA-FLOW.zh-CN.md)。

## 许可

清单内容以 [CC0 1.0 Universal](./LICENSE) 发布;`scripts/` 下代码以 MIT 发布。
