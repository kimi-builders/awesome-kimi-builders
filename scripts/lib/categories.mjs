/* 分类注册表:id → 双语显示名(顺序即 README 渲染顺序)。 */
export const CATEGORIES = [
  { id: 'official', zh: '官方与模型', en: 'Official' },
  { id: 'cli-agents', zh: 'CLI 与 Agent 工具', en: 'CLI & Agents' },
  { id: 'sdks', zh: 'SDK 与 API 客户端', en: 'SDKs' },
  { id: 'apps', zh: '应用与作品', en: 'Apps' },
  { id: 'integrations', zh: '集成与插件', en: 'Integrations' },
  { id: 'learning', zh: '教程与资源', en: 'Learning' },
];

export const CATEGORY_IDS = new Set(CATEGORIES.map((category) => category.id));
