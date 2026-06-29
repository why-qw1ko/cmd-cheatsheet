# 📊 Cmd Cheatsheet — 项目分析报告

> 生成日期：2026-06-29

---

## 1. 项目概述

**Cmd Cheatsheet** 是一个静态命令速查网站，覆盖 Linux、Claude Code、Windows 三大平台共 63 条命令。项目采用 Astro + Tailwind CSS 构建，通过 GitHub Actions 自动部署到 GitHub Pages。

**仓库地址**：https://github.com/why-qw1ko/cmd-cheatsheet  
**在线地址**：https://why-qw1ko.github.io/cmd-cheatsheet

---

## 2. 技术架构

### 2.1 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 框架 | Astro | v7.x | 静态站点生成，零 JS 运行时 |
| 样式 | Tailwind CSS | v4.x | 原子化 CSS，Vite 插件集成 |
| 数据 | JSON 文件 | — | 每条命令一个 JSON 文件 |
| 部署 | GitHub Actions | — | push 触发自动构建部署 |
| 托管 | GitHub Pages | — | 静态文件托管 |

### 2.2 架构设计

```
┌─────────────────────────────────────────────────┐
│                   用户浏览器                      │
├─────────────────────────────────────────────────┤
│  Astro SSG (构建时渲染 HTML)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Sidebar  │ │  Main    │ │  Floating Nav    │ │
│  │ (分类)    │ │ (内容)   │ │ (A-Z + 滚动联动) │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────────────────────────────────────┐   │
│  │  Search Modal (Ctrl+K 全局搜索)           │   │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  JSON 数据层 (src/data/commands/*/)              │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐          │
│  │ linux/  │ │claudecode│ │windows/ │          │
│  │ 29 条   │ │ 18 条    │ │ 16 条   │          │
│  └─────────┘ └──────────┘ └─────────┘          │
└─────────────────────────────────────────────────┘
```

### 2.3 文件结构

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/pages/index.astro` | ~650 | 首页：数据加载、渲染、交互、搜索 |
| `src/layouts/Layout.astro` | ~950 | 全局布局、CSS 变量、响应式、搜索弹窗 |
| `src/components/DomainSidebar.astro` | ~100 | 侧边栏：分类导航、主题切换、头像 |
| `src/components/CommandNav.astro` | ~130 | 浮动导航：A-Z 索引、滚动联动、筛选 |
| `src/data/commands/**/*.json` | ~30/文件 | 命令数据 |

---

## 3. 功能清单

### 3.1 核心功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 三平台命令展示 | ✅ | Linux 29 / Claude 18 / Windows 16 |
| 手风琴展开/折叠 | ✅ | 点击展开详情，支持一键全部展开/折叠 |
| 一键复制 | ✅ | 命令语法复制 + 命令名复制，toast 反馈 |
| 全局搜索 | ✅ | Ctrl+K，模糊搜索，键盘导航 |
| 暗色模式 | ✅ | 手动切换 + 系统偏好检测 |
| 响应式 | ✅ | 手机抽屉式侧边栏，底部弹出导航 |

### 3.2 增强功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 危险等级标识 | ✅ | 高危(红) / 中危(黄) 命令标注 |
| 展开记忆 | ✅ | localStorage 按分类保存展开状态 |
| A-Z 字母索引 | ✅ | 点击字母筛选对应命令 |
| 滚动联动 | ✅ | IntersectionObserver 实时高亮当前命令 |
| 骨架屏 | ✅ | 切换分类时显示加载骨架 |
| 分类配色 | ✅ | 10 种分类各有独立颜色 |

---

## 4. 命令数据模型

```typescript
interface Command {
  name: string;           // 命令名
  aliases?: string[];     // 别名
  domain: string;         // 平台：linux | claudecode | windows
  category: string;       // 分类：file | text | system | network | process | session | config | review | cli | package
  tags?: string[];        // 标签
  description: string;    // 中文描述
  syntax?: string;        // 语法
  example?: string;       // 示例
  scenarios?: string[];   // 使用场景
  related?: string[];     // 相关命令
  variants?: Variant[];   // 多模式（Windows CMD/PowerShell）
  since?: string;         // 引入版本
}
```

### 4.1 分类统计

| 分类 | 颜色 | 命令数 |
|------|------|--------|
| 文件 (file) | 🟠 橙 | ls, find, cp, mv, rm, mkdir, tar, gzip |
| 文本 (text) | ⚪ 灰 | cat, grep, sed, awk, echo, head, tail, wc, sort, xargs |
| 系统 (system) | 🔵 蓝 | chmod, df, du, systemctl |
| 网络 (network) | 🟢 绿 | curl, ssh, wget, ping |
| 进程 (process) | 🔴 红 | ps, kill, top |
| 会话 (session) | 🟣 紫 | /clear, /compact, /resume, /exit, /help, /login, /logout, /memory |
| 配置 (config) | 🩵 青 | /config, /cost, /doctor, /model, /status, /permissions, /vim |
| 审查 (review) | 🩷 粉 | /review |
| CLI | 🟦 靛 | claude (CLI) |
| 包管理 (package) | 🟡 琥珀 | winget |

---

## 5. 交互设计

### 5.1 页面布局

```
┌─────────┬──────────────────────────┬──────────┐
│  侧边栏  │       主内容区            │ 命令导航  │
│  220px   │  max-width: 1000px      │ 190px    │
│          │                          │ fixed    │
│ 🖥 Linux │  ▸ ls                    │ A  awk   │
│ </> Claude│  ▸ grep                 │ B        │
│ □ Windows│  ▸ find                  │ C  cat   │
│          │  ▸ ...                   │ ...      │
│ [头像]   │                          │ [筛选]   │
│ [主题]   │                          │          │
└─────────┴──────────────────────────┴──────────┘
```

### 5.2 交互流程

1. **分类切换**：点击侧边栏 → 骨架屏 → 渲染命令列表 → 滚动到顶部
2. **命令展开**：点击命令头 → 手风琴展开详情 → 状态保存到 localStorage
3. **搜索**：Ctrl+K → 弹出搜索框 → 实时筛选 → Enter 跳转
4. **导航筛选**：点击字母 → 过滤显示对应命令 → 点击命令跳转
5. **滚动联动**：页面滚动 → IntersectionObserver → 高亮当前命令

---

## 6. 性能指标

| 指标 | 数值 |
|------|------|
| 构建时间 | ~1.5s |
| 页面大小 | ~50KB (HTML + CSS + JS) |
| 首屏渲染 | 静态 HTML，无客户端数据请求 |
| 搜索延迟 | 0ms（全量内存搜索） |
| JSON 数据 | ~30KB（63 条命令） |

---

## 7. 已知限制

| 限制 | 说明 | 潜在方案 |
|------|------|----------|
| 无服务端 | 纯静态，搜索在客户端 | 可接入 Algolia 等搜索服务 |
| 命令数据手动维护 | JSON 文件需手动添加 | 可接入 AI 自动生成命令文档 |
| 无多语言 | 仅中文描述 | 可添加 i18n 支持 |
| 无用户系统 | 无收藏/历史记录 | 可添加 localStorage 收藏功能 |
| 图标依赖内联 SVG | 无图标库 | 可引入 Lucide 等图标库 |

---

## 8. 后续规划

### 短期（v1.1）

- [ ] 命令收藏功能（localStorage）
- [ ] 搜索结果高亮匹配关键词
- [ ] 命令使用频率统计
- [ ] 更多命令补充（目标 100+）

### 中期（v1.5）

- [ ] 英文界面切换（i18n）
- [ ] 命令对比功能（两个命令并排对比）
- [ ] 社区贡献指南 + 命令模板生成器
- [ ] PWA 支持（离线可用）

### 长期（v2.0）

- [ ] AI 驱动的命令推荐
- [ ] 用户自定义命令集
- [ ] 命令执行模拟器
- [ ] 多平台扩展（macOS、Docker、K8s）

---

## 9. Git 提交历史

```
d0e8537 fix: 复制按钮不再展开 + 导航间距统一
f781b60 fix: 导航间距 + 复制hover + 复制成功toast
ba84a68 fix: 复制按钮移至右侧 + 标签样式升级 + 导航间距
b1aa14b fix: 滚动联动修复 + 初始高亮 + 导航间距
b4ca7d7 fix: 字母索引初始加载 + 导航间距 + 筛选时禁用滚动联动
68b5ac9 fix: 字母索引改为筛选过滤 + 滚动联动修复 + 导航左移
e622961 fix: 一键展开折叠改为圆形按钮 + 导航栏修复
20eaf75 feat: 展开折叠 + 危险标识 + 字母索引 + 滚动联动 + 移动端修复
b5815a7 feat: 视觉层级优化 + 分类配色 + 骨架屏 + Footer
c93fe86 fix: 复制反馈 + 导航SaaS风 + 内容区加宽
6e2175a fix: 修复复制按钮导致的布局错位
a26da82 feat: 切换回顶 + 一键回顶 + 复制命令名 + tags间距
3e78224 feat: 更新日志链接 + 导航定位修复 + 头像签名 + 中文README
6863087 feat: 搜索功能 + 顶栏增强 + 布局优化
9dabb2d fix: 修复布局问题 + 恢复顶部导航栏 + 浮动导航
a86f38e feat: 重构布局 + 补充命令至63条 + 移动端适配
```

---

## 10. 总结

Cmd Cheatsheet 是一个功能完整、设计现代的命令速查工具。通过 Astro SSG 实现零运行时开销，JSON 数据驱动实现灵活扩展，组件化架构保证代码可维护性。项目已具备搜索、暗色模式、响应式、危险标识等核心功能，后续可向 AI 驱动、社区协作方向演进。
