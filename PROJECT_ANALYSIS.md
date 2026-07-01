# 📊 Cmd Cheatsheet — 项目分析报告

> 更新日期：2026-07-01

---

## 1. 项目概述

**Cmd Cheatsheet** 是一个静态命令速查网站，覆盖 Linux、Windows CMD、PowerShell、Claude Code、npm、Git、Redis、Docker 八大平台共 295 条命令。项目采用 Astro + Tailwind CSS 构建，通过 GitHub Actions 自动部署到 GitHub Pages。

**仓库地址**：https://github.com/why-qw1ko/cmd-cheatsheet  
**在线地址**：https://why-qw1ko.github.io/cmd-cheatsheet

---

## 2. 技术架构

### 2.1 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Astro | v7.x | 静态站点生成 |
| 样式 | Tailwind CSS | v4.x | 原子化 CSS，Vite 插件集成 |
| 图标 | Iconify | 2.1.0 | 按需加载图标（Web Component） |
| 数据 | JSON 文件 | — | 每条命令一个 JSON 文件 |
| 部署 | GitHub Actions | — | push 到 main 触发自动构建部署 |
| 托管 | GitHub Pages | — | 静态文件托管 |

### 2.2 文件结构

```
src/
├── components/
│   ├── DomainSidebar.astro   # 左侧分类导航
│   └── CommandNav.astro      # 右侧浮动命令导航（A-Z 索引 + 分组）
├── data/
│   ├── commands/
│   │   ├── linux/            # 83 条 Linux 命令
│   │   ├── cmd/              # 31 条 Windows CMD 命令
│   │   ├── powershell/       # 41 条 PowerShell 命令
│   │   ├── claudecode/       # 30 条 Claude Code 命令
│   │   ├── npm/              # 18 条 npm 命令
│   │   ├── git/              # 25 条 Git 命令
│   │   ├── redis/            # 34 条 Redis 命令
│   │   └── docker/           # 33 条 Docker 命令
│   └── cross-platform.json   # 跨平台命令对照（28 组）
├── layouts/
│   └── Layout.astro          # 全局样式 + 搜索弹窗 CSS + SPA 路由
└── pages/
    ├── index.astro           # 首页：命令列表 + 渲染 + 所有交互逻辑
    └── overview.astro        # 总览页：全平台分类网格卡片
```

### 2.3 数据格式

每条命令是一个独立 JSON 文件：

```json
{
  "name": "命令名",
  "aliases": ["别名"],
  "domain": "linux",
  "category": "file",
  "tags": ["标签1", "标签2"],
  "description": "命令描述",
  "syntax": "命令语法",
  "example": "示例",
  "scenarios": ["场景1", "场景2"],
  "related": ["相关命令"]
}
```

**domain 值**：`linux` / `cmd` / `powershell` / `claudecode` / `npm` / `git` / `redis` / `docker`

**category 值**（各平台使用的子集不同）：
- `file` / `text` / `system` / `network` / `process` / `session` / `config` / `review` / `cli` / `package`

### 2.4 架构：SPA 壳

项目采用**自定义 SPA 壳架构**（非 Astro View Transitions）：

```
Layout.astro（持久壳）
├── 固定 Header（logo / 搜索入口 / 首页链接 / 总览链接 / 更新日志 / 反馈 / GitHub / 主题切换）
├── <div id="content-main">（动态内容区）
│   ├── index.astro 的内容
│   └── overview.astro 的内容
└── 内联 <script>：SPA Router
    ├── spaNavigate(url)：fetch HTML → 提取 #content-main → 替换 DOM → 重新执行脚本
    ├── 拦截内部链接点击事件
    ├── popstate 监听（浏览器前进/后退）
    └── updateActiveNav()：高亮当前页面导航项
```

**状态管理（index.astro 运行时）**：
- `activeDomain`：当前选中的分类
- `activeTag`：当前筛选的标签
- `activeCategory`：当前筛选的分类
- `expandMemory`：localStorage 存储的展开状态

**事件处理**：
- 侧边栏点击 → `switchDomain()`
- 分类标签点击 → `reRenderAccordion()` (按 category 过滤)
- 标签点击 → `reRenderAccordion()` (按 tag 过滤)
- 字母索引点击 → `CommandNav.astro` 中的 filter 逻辑
- 搜索 → `openSearch()` / `selectSearchResult()`
- 跨平台按钮 → `renderCrossPlatformView()`
- 跨平台命令点击 → `switchDomain()` + 滚动定位

### 2.5 页面说明

#### 首页（index.astro）

核心页面，包含：
- 数据加载（import.meta.glob 加载 8 个平台的 JSON）
- 搜索弹窗（Ctrl+K 触发）
- 分类命令列表（手风琴展开/折叠）
- 右侧浮动导航（A-Z 字母索引 + 分组 + 滚动联动）
- 跨平台对照视图
- 所有交互逻辑（~38KB）

#### 总览页（overview.astro）

全平台分类网格卡片：
- 4 列自适应网格（响应式：桌面 4 列 → 平板 2-3 列 → 手机 1 列）
- 每个平台一个卡片，显示分类统计
- 点击卡片跳转到首页对应分类

---

## 3. 功能清单

| 功能 | 实现位置 | 说明 |
|------|----------|------|
| 分类导航 | DomainSidebar.astro | 8 个分类 + 跨平台入口 |
| 命令列表 | index.astro → renderAccordion() | 手风琴展开/折叠 |
| 右侧导航 | CommandNav.astro | A-Z 字母索引 + 分组 + 滚动联动 |
| 全局搜索 | index.astro → searchModal | Ctrl+K，支持键盘导航 |
| 分类筛选 | index.astro → category click | 点击分类标签过滤 |
| 标签筛选 | index.astro → tag click | 点击标签过滤 |
| 跨平台对照 | index.astro → renderCrossPlatformView() | 28 组 Linux ↔ CMD ↔ PowerShell |
| 命令内联对照 | index.astro → cpHtml | 命令详情中显示等价命令 |
| 一键复制 | index.astro → copy handler | 复制语法/命令名 |
| 暗色模式 | Layout.astro + DomainSidebar.astro | 手动切换 + 跟随系统 |
| 危险标识 | index.astro → dangerMap | 高危/中危 badge |
| 展开记忆 | localStorage | 按分类存储展开状态 |
| 骨架屏 | index.astro → skeleton | 切换分类时过渡动画 |
| 回到顶部 | index.astro → back-to-top | 滚动 300px 后显示 |
| SPA 无刷新 | Layout.astro → spaNavigate() | fetch-based 自定义路由 |
| 总览页 | overview.astro | 全平台分类网格卡片 |

---

## 4. 添加新命令的步骤

1. 在 `src/data/commands/{domain}/` 下创建 JSON 文件
2. 填写 name, domain, category, tags, description, syntax, example 等字段
3. 如需危险标识，在 `index.astro` 的 `dangerMap` 中添加
4. 如需跨平台对照，在 `src/data/cross-platform.json` 中添加对应组
5. `npm run build` 验证构建
6. `git add && git commit && git push` 触发部署

### 添加新平台的额外步骤

1. 在 `src/data/commands/` 下创建新目录
2. 在 `index.astro` 中添加 `import.meta.glob` 和 domains 数组条目
3. 在 `overview.astro` 中添加对应的 glob 和 domains 数组条目
4. 在 `DomainSidebar.astro` 的 domains props 中会自动通过 index.astro 传入

---

## 5. 已知注意事项

- 命令导航（右侧浮窗）在 ≤1024px 屏幕隐藏
- 移动端使用顶部栏 + 侧边栏抽屉
- 搜索弹窗通过 Ctrl+K 触发，ESC 关闭
- Windows 命令已拆分为 CMD 和 PowerShell 两个独立分类
- 跨平台对照目前仅覆盖 Linux ↔ Windows（CMD + PowerShell），其他平台暂不参与对照
- `_meta.json` 文件在数据加载时自动过滤，不会被当作命令数据
- SPA 路由仅拦截内部链接，外部链接 / hash / mailto 正常跳转
