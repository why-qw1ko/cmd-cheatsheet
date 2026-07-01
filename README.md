# 🖥️ Cmd Cheatsheet — 命令速查站

一个现代化的命令速查工具，覆盖 **Linux**、**Windows CMD**、**PowerShell**、**Claude Code**、**npm**、**Git**、**Redis**、**Docker** 八大平台，共 **295 条**常用命令。

🔗 **在线访问**：[https://why-qw1ko.github.io/cmd-cheatsheet](https://why-qw1ko.github.io/cmd-cheatsheet)

---

## ✨ 功能特性

- 🔍 **全局搜索** — `Ctrl+K` 快速搜索命令名、描述、标签、别名
- 📋 **一键复制** — 命令语法、命令名均可一键复制
- 🌙 **暗色模式** — 支持手动切换 + 跟随系统偏好
- 📱 **响应式** — 适配手机、平板、桌面端
- 🎯 **命令导航** — 右侧浮动导航，A-Z 字母索引 + 分组筛选
- 🔄 **跨平台对照** — Linux ↔ CMD ↔ PowerShell 命令等价对照
- 🏷️ **分类筛选** — 点击分类标签（文件/文本/系统等）过滤命令
- ⚠️ **危险标识** — 高危/中危命令醒目标注
- 💾 **展开记忆** — localStorage 保存每个分类的展开状态
- 🦴 **骨架屏** — 切换分类时平滑过渡
- ⚡ **SPA 无刷新** — 页面间跳转无闪烁，自定义 fetch-based router

---

## 📦 命令统计

| 平台 | 命令数 | 示例 |
|------|--------|------|
| 🐧 Linux | 83 | `ls` `grep` `ssh` `systemctl` `awk` `htop` |
| 💻 Windows CMD | 31 | `dir` `ipconfig` `taskkill` `robocopy` `sfc` |
| ⚡ PowerShell | 41 | `Get-ChildItem` `Invoke-WebRequest` `Select-Object` |
| 🤖 Claude Code | 30 | `/clear` `/compact` `--print` `--model` `/mcp` |
| 📦 npm | 18 | `install` `run` `init` `publish` `audit` |
| 🔀 Git | 25 | `commit` `branch` `rebase` `stash` `cherry-pick` |
| 🔴 Redis | 34 | `GET` `SET` `HGETALL` `SUBSCRIBE` `CONFIG` |
| 🐳 Docker | 33 | `run` `build` `compose` `exec` `logs` `network` |
| **总计** | **295** | |

---

## 🛠️ 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- npm

### 启动

```bash
git clone https://github.com/why-qw1ko/cmd-cheatsheet.git
cd cmd-cheatsheet
npm install
npm run dev
```

访问 `http://localhost:4321/cmd-cheatsheet/`

### 构建

```bash
npm run build
```

输出到 `dist/` 目录。

---

## 📁 项目结构

```
src/
├── components/
│   ├── DomainSidebar.astro   # 左侧分类导航（图标 + 名称 + 命令数 + 跨平台入口）
│   └── CommandNav.astro      # 右侧浮动命令导航（A-Z 索引 + 分组 + 滚动联动）
├── data/
│   ├── commands/
│   │   ├── linux/            # Linux 命令 JSON (83条)
│   │   ├── cmd/              # Windows CMD 命令 JSON (31条)
│   │   ├── powershell/       # PowerShell 命令 JSON (41条)
│   │   ├── claudecode/       # Claude Code 命令 JSON (30条)
│   │   ├── npm/              # npm 命令 JSON (18条)
│   │   ├── git/              # Git 命令 JSON (25条)
│   │   ├── redis/            # Redis 命令 JSON (34条)
│   │   └── docker/           # Docker 命令 JSON (33条)
│   └── cross-platform.json   # 跨平台命令对照数据 (28组)
├── layouts/
│   └── Layout.astro          # 全局布局 + 样式 + 搜索弹窗 + SPA 路由
└── pages/
    ├── index.astro           # 首页：命令列表 + 渲染 + 交互
    └── overview.astro        # 总览页：全平台分类网格卡片
```

---

## ➕ 添加新命令

在对应目录下创建 JSON 文件：

```json
{
  "name": "命令名",
  "aliases": ["别名"],
  "domain": "linux",
  "category": "file",
  "tags": ["标签"],
  "description": "命令描述（中文）",
  "syntax": "命令语法",
  "example": "示例命令",
  "scenarios": ["使用场景"],
  "related": ["相关命令"]
}
```

**domain**：`linux` `cmd` `powershell` `claudecode` `npm` `git` `redis` `docker`

**category**：`file` `text` `system` `network` `process` `session` `config` `review` `cli` `package`

**危险等级**：在 `src/pages/index.astro` 的 `dangerMap` 中添加。

---

## 🚀 部署

通过 **GitHub Actions** 自动部署到 GitHub Pages。

1. 推送到 `main` 分支自动触发构建
2. 进入 **Settings → Pages → Source**，选择 **GitHub Actions**

---

## 📄 技术栈

| 技术 | 用途 |
|------|------|
| [Astro](https://astro.build/) v7 | 静态站点生成 |
| [Tailwind CSS](https://tailwindcss.com/) v4 | 原子化 CSS |
| GitHub Actions | CI/CD |
| GitHub Pages | 托管 |

---

## 📝 许可证

MIT License
