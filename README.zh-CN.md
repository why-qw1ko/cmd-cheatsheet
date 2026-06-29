# 🖥️ Cmd Cheatsheet — 命令速查站

一个简洁、美观的命令速查工具，支持 **Linux**、**Claude Code** 和 **Windows** 三大平台。

🔗 **在线访问**：[https://why-qw1ko.github.io/cmd-cheatsheet](https://why-qw1ko.github.io/cmd-cheatsheet)

---

## ✨ 功能特性

- 🐧 **Linux** — 29 条核心命令（文件操作、文本处理、网络调试、系统管理…）
- 🤖 **Claude Code** — 18 条命令（Slash 命令、CLI 参数、会话管理…）
- 🪟 **Windows** — 16 条命令（CMD 经典 + PowerShell 现代语法对照）
- 🔍 **全局搜索** — `Ctrl+K` 快速搜索命令名称、描述、标签
- 📋 **一键复制** — 每条命令旁都有复制按钮
- 🌙 **暗色模式** — 支持手动切换 + 跟随系统偏好
- 📱 **响应式** — 完美适配手机、平板、桌面端
- 🎯 **锚点导航** — 右侧浮动导航，快速跳转到任意命令

---

## 📦 命令统计

| 平台 | 命令数 | 示例 |
|------|--------|------|
| 🐧 Linux | 29 | `ls` `grep` `find` `ssh` `docker` `systemctl` |
| 🤖 Claude Code | 18 | `/clear` `/compact` `/review` `/model` `claude (CLI)` |
| 🪟 Windows | 16 | `dir` `ipconfig` `netstat` `winget` `Get-Process` |

---

## 🛠️ 本地开发

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- npm 或 pnpm

### 启动

```bash
# 克隆仓库
git clone https://github.com/why-qw1ko/cmd-cheatsheet.git
cd cmd-cheatsheet

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:4321/cmd-cheatsheet/`

### 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

---

## 📁 项目结构

```
src/
├── components/
│   ├── DomainSidebar.astro   # 左侧分类导航
│   └── CommandNav.astro      # 右侧浮动命令导航
├── data/commands/
│   ├── linux/                # Linux 命令 JSON 数据
│   ├── claudecode/           # Claude Code 命令 JSON 数据
│   └── windows/              # Windows 命令 JSON 数据
├── layouts/
│   └── Layout.astro          # 全局布局 + 样式
└── pages/
    └── index.astro           # 首页逻辑
```

### 添加新命令

在对应目录下创建 JSON 文件即可，格式如下：

```json
{
  "name": "命令名",
  "aliases": ["别名1", "别名2"],
  "domain": "linux",
  "category": "file",
  "tags": ["标签1", "标签2"],
  "description": "命令描述（中文）",
  "syntax": "命令语法",
  "example": "示例命令",
  "scenarios": ["使用场景1", "使用场景2"],
  "related": ["相关命令1", "相关命令2"]
}
```

Windows 命令支持 `variants` 字段来区分 CMD 和 PowerShell：

```json
{
  "name": "dir",
  "variants": [
    { "name": "CMD", "syntax": "dir [路径]", "example": "dir /s" },
    { "name": "PowerShell", "syntax": "Get-ChildItem [-Path] 路径", "example": "Get-ChildItem -Recurse" }
  ]
}
```

---

## 🚀 部署

项目通过 **GitHub Actions** 自动部署到 GitHub Pages。

推送到 `main` 分支后会自动触发构建和部署。

手动部署设置：
1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **GitHub Actions**

---

## 📄 技术栈

- [Astro](https://astro.build/) — 静态站点生成
- [Tailwind CSS](https://tailwindcss.com/) — 原子化 CSS
- GitHub Pages — 托管
- GitHub Actions — CI/CD

---

## 📝 许可证

MIT License

---

## 🙏 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: xxx'`)
4. 推送到分支 (`git push origin feature/xxx`)
5. 创建 Pull Request
