# 🖥️ Cmd Cheatsheet

A modern command-line reference covering **Linux**, **Claude Code**, and **Windows** — **63 commands** in one place.

🔗 **Live**: [https://why-qw1ko.github.io/cmd-cheatsheet](https://why-qw1ko.github.io/cmd-cheatsheet)

---

## ✨ Features

- 🔍 **Global Search** — `Ctrl+K` fuzzy search across command names, descriptions, tags, and aliases
- 📋 **One-Click Copy** — Copy syntax or command name instantly
- 🌙 **Dark Mode** — Manual toggle + system preference detection
- 📱 **Responsive** — Mobile, tablet, and desktop layouts
- 🎯 **Command Nav** — Floating right-side navigation with A-Z index + scroll spy
- ⚠️ **Danger Badges** — High-risk / mid-risk commands visually flagged
- 💾 **Expand Memory** — localStorage persists expand/collapse state per domain
- 🦴 **Skeleton Loading** — Smooth transition when switching categories

---

## 📦 Command Stats

| Platform | Count | Examples |
|----------|-------|---------|
| 🐧 Linux | 29 | `ls` `grep` `find` `ssh` `curl` `systemctl` |
| 🤖 Claude Code | 18 | `/clear` `/compact` `/review` `/model` `claude (CLI)` |
| 🪟 Windows | 16 | `dir` `ipconfig` `netstat` `winget` `Get-Process` |

---

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm

### Getting Started

```bash
git clone https://github.com/why-qw1ko/cmd-cheatsheet.git
cd cmd-cheatsheet
npm install
npm run dev
```

Open `http://localhost:4321/cmd-cheatsheet/`

### Build

```bash
npm run build
```

Output goes to `dist/`.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── DomainSidebar.astro   # Left sidebar (icons + names + counts)
│   └── CommandNav.astro      # Floating right nav (A-Z index + scroll spy)
├── data/commands/
│   ├── linux/                # Linux command JSON files
│   ├── claudecode/           # Claude Code command JSON files
│   └── windows/              # Windows command JSON files
├── layouts/
│   └── Layout.astro          # Global layout + styles + search modal
└── pages/
    └── index.astro           # Page logic + rendering + interactions
```

---

## ➕ Adding Commands

Create a JSON file in the appropriate directory:

```json
{
  "name": "command-name",
  "aliases": ["alias"],
  "domain": "linux",
  "category": "file",
  "tags": ["tag1", "tag2"],
  "description": "Command description",
  "syntax": "command syntax",
  "example": "example usage",
  "scenarios": ["use case 1", "use case 2"],
  "related": ["related-command"]
}
```

**Categories**: `file` `text` `system` `network` `process` `session` `config` `review` `cli` `package`

**Danger levels**: Add to `dangerMap` in `src/pages/index.astro`:

```js
const dangerMap = {
  'rm': 'high',     // 🔴 High risk
  'chmod': 'mid',   // 🟡 Medium risk
};
```

---

## 🚀 Deployment

Auto-deploys to GitHub Pages via **GitHub Actions** on push to `main`.

1. Go to **Settings → Pages → Source**
2. Select **GitHub Actions**

---

## 📄 Tech Stack

| Tech | Purpose |
|------|---------|
| [Astro](https://astro.build/) v7 | Static site generation |
| [Tailwind CSS](https://tailwindcss.com/) v4 | Utility-first CSS |
| GitHub Actions | CI/CD |
| GitHub Pages | Hosting |

---

## 📝 License

MIT License

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/xxx`)
3. Commit changes (`git commit -m 'feat: xxx'`)
4. Push (`git push origin feature/xxx`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Icons from [Lucide](https://lucide.dev/)
- Color palette inspired by [Tailwind CSS](https://tailwindcss.com/docs/colors)
- Inspired by [Devhints](https://devhints.io/) and [OverAPI](https://overapi.com/)
