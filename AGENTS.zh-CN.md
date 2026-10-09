# AGENTS.md — 给在本仓库工作的 Agent

[English](./AGENTS.md)(主版本) · **中文**

> 本文件是英文主版本的中文伴生版;内容以英文版为准,两者须在同一 PR 内同步更新。

## 这个仓库是什么

`awesome-kimi-builders` 是 kimi.builders 社区的公开收录清单(awesome list)。
站点 <https://kimi.builders/awesome> 的站外推荐数据以本仓库的 `data/entries/*.json` 为准;
README 清单区由 `scripts/build-readme.mjs` 生成,**清单区禁止手改**。

## 目录结构

```text
data/entries/<slug>.json   每个项目一个文件(收录的唯一事实源)
data/README.md             条目 schema(英文为主版本,旁边是中文伴生版)
scripts/validate.mjs       数据校验(零依赖:node scripts/validate.mjs)
scripts/build-readme.mjs   重新生成两份 README 的清单区
.github/workflows/ci.yml   PR 上跑校验 + 生成漂移检查
CONTRIBUTING.md            人的流程(英文为主版本)
DATA-FLOW.md               与 kimi.builders 站点的数据流设计
```

## 语言规则(硬性)

**英文是主版本;翻译放在独立的姊妹文件里** —— 不在同一文件混排。
成对关系:`README.md` ↔ `README.zh-CN.md`、`CONTRIBUTING.md` ↔ `CONTRIBUTING.zh-CN.md`、
`AGENTS.md` ↔ `AGENTS.zh-CN.md`、`DATA-FLOW.md` ↔ `DATA-FLOW.zh-CN.md`、
`data/README.md` ↔ `data/README.zh-CN.md`。
先改英文版,中文版在**同一个 PR** 内更新;以后更多语种(如 `*.ja.md`)沿用同一模式。
代码注释与 commit message 用英文。

## 工作规则

1. **修改清单 = 只改 `data/entries/`**,一个 PR 一个项目。改完必须:
   ```bash
   node scripts/validate.mjs        # 必须全绿
   node scripts/build-readme.mjs    # 重新生成两份 README 清单区并提交 diff
   ```
2. **条目保持双语**(站点两种语言都要渲染):每个条目必须有 `descriptionZh` 和
   `descriptionEn`,各一句,「做什么 + 和 Kimi 的关系」。禁营销腔、禁最高级、禁 emoji。
3. **不许编造**:项目必须真实存在且 URL 可公开访问。**废弃/停更的项目一律不收**,
   无论曾经多好;项目方自己宣布迁移/停更的,从清单移除。
4. `agents` 只能用注册表 id(`data/README.md`,与站点 `src/lib/agents.ts` 同步);
   新增品牌两个仓库一起改。
5. Git 身份:本树统一 `kimi.builders <git@kimi.builders>`,不要切换。
6. 不引入依赖:scripts 只用 Node 标准库(ESM,Node ≥20)。
7. 改 schema 前先读 DATA-FLOW.md;破坏性变更属于协议升级,先登记并获站点维护者确认。
