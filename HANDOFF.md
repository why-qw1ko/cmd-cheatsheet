# Cmd Cheatsheet — 开发上下文速递

> 给新 Agent 的快速入门文档。请在对话开始时发送这段文字。

---

## 项目是什么

Cmd Cheatsheet 是一个**静态命令速查网站**，用 Astro + Tailwind CSS 构建，部署在 GitHub Pages。

- 仓库：https://github.com/why-qw1ko/cmd-cheatsheet
- 在线：https://why-qw1ko.github.io/cmd-cheatsheet
- 技术栈：Astro v7 + Tailwind CSS v4 + GitHub Actions + GitHub Pages

## 当前状态（v2.0.0）

共 **181 条命令**，分四个平台：

| 分类 | 目录 | 数量 |
|------|------|------|
| Linux | `src/data/commands/linux/` | 82 |
| Windows CMD | `src/data/commands/cmd/` | 30 |
| PowerShell | `src/data/commands/powershell/` | 40 |
| Claude Code | `src/data/commands/claudecode/` | 29 |

跨平台对照数据：`src/data/cross-platform.json`（28 组）

## 已实现的功能

- 全局搜索（Ctrl+K）
- 一键复制命令
- 暗色模式（手动 + 跟随系统）
- 响应式（手机/平板/桌面）
- 右侧浮动导航（A-Z 字母索引 + 分组筛选）
- 跨平台对照（Linux ↔ CMD ↔ PowerShell）
- 分类标签筛选（点击"文件""文本"等过滤）
- 标签筛选（点击 #标签 过滤，可叠加）
- 危险命令标识（高危/中危）
- 展开记忆（localStorage）
- 骨架屏过渡

## 项目结构

```
src/
├── components/
│   ├── DomainSidebar.astro   # 左侧分类导航 + 跨平台入口 + 主题切换
│   └── CommandNav.astro      # 右侧浮动导航（A-Z 索引 + 分组 + 滚动联动）
├── data/
│   ├── commands/
│   │   ├── linux/            # 82 条
│   │   ├── cmd/              # 30 条
│   │   ├── powershell/       # 40 条
│   │   └── claudecode/       # 29 条
│   └── cross-platform.json   # 跨平台对照
├── layouts/
│   └── Layout.astro          # 全局样式 + 搜索弹窗 CSS
└── pages/
    └── index.astro           # 核心页面：数据加载 + 渲染 + 所有交互逻辑
```

## 添加新命令

在 `src/data/commands/{domain}/` 下创建 JSON：

```json
{
  "name": "命令名",
  "aliases": ["别名"],
  "domain": "linux",
  "category": "file",
  "tags": ["标签"],
  "description": "命令描述",
  "syntax": "命令语法",
  "example": "示例",
  "scenarios": ["场景"],
  "related": ["相关命令"]
}
```

- domain：`linux` / `cmd` / `powershell` / `claudecode`
- category：`file` / `text` / `system` / `network` / `process` / `session` / `config` / `review` / `cli` / `package`
- 危险等级：在 `index.astro` 的 `dangerMap` 中添加
- 跨平台对照：在 `cross-platform.json` 中添加

## 开发注意事项

1. **部署方式**：push 到 main 分支 → GitHub Actions 自动构建部署
2. **本地开发**：`npm install && npm run dev`，访问 `http://localhost:4321/cmd-cheatsheet/`
3. **构建**：`npm run build`，输出到 `dist/`
4. **Git 推送**：需要 GitHub token，用 `GIT_ASKPASS` 方式：
   ```bash
   cat > /tmp/askpass.sh << 'EOF'
   #!/bin/sh
   echo "YOUR_TOKEN_HERE"
   EOF
   chmod +x /tmp/askpass.sh
   GIT_ASKPASS=/tmp/askpass.sh git push origin main
   ```

## 我（用户）的沟通风格

- 中文沟通
- 直接说需求，不需要客套
- 遇到不确定的地方会问
- 希望代码改动后自动 commit + push
- 会提供 GitHub token（ghp_ 开头）
