import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://why-qw1ko.github.io',
  base: '/cmd-cheatsheet',
  integrations: [
    starlight({
      title: 'Cmd Cheatsheet',
      description: '命令速查站 — Linux · Claude Code · Windows',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/why-qw1ko/cmd-cheatsheet',
        },
      ],
      sidebar: [
        {
          label: '🐧 Linux',
          items: [
            { label: 'ls', link: '/commands/linux/ls' },
            { label: 'grep', link: '/commands/linux/grep' },
            { label: 'find', link: '/commands/linux/find' },
            { label: 'cat', link: '/commands/linux/cat' },
            { label: 'chmod', link: '/commands/linux/chmod' },
            { label: 'curl', link: '/commands/linux/curl' },
            { label: 'tar', link: '/commands/linux/tar' },
            { label: 'ssh', link: '/commands/linux/ssh' },
            { label: 'awk', link: '/commands/linux/awk' },
            { label: 'sed', link: '/commands/linux/sed' },
            { label: 'top', link: '/commands/linux/top' },
            { label: 'df', link: '/commands/linux/df' },
          ],
        },
        {
          label: '🤖 Claude Code',
          items: [
            { label: '/clear', link: '/commands/claudecode/clear' },
            { label: '/compact', link: '/commands/claudecode/compact' },
            { label: '/resume', link: '/commands/claudecode/resume' },
            { label: '/exit', link: '/commands/claudecode/exit' },
            { label: '/help', link: '/commands/claudecode/help' },
            { label: '/config', link: '/commands/claudecode/config' },
            { label: '/cost', link: '/commands/claudecode/cost' },
            { label: '/doctor', link: '/commands/claudecode/doctor' },
            { label: '/review', link: '/commands/claudecode/review' },
            { label: 'claude (CLI)', link: '/commands/claudecode/cli' },
          ],
        },
        {
          label: '🪟 Windows',
          items: [
            { label: 'dir', link: '/commands/windows/dir' },
            { label: 'ipconfig', link: '/commands/windows/ipconfig' },
            { label: 'tasklist', link: '/commands/windows/tasklist' },
            { label: 'Get-Process', link: '/commands/windows/get-process' },
            { label: 'netstat', link: '/commands/windows/netstat' },
            { label: 'sfc', link: '/commands/windows/sfc' },
            { label: 'Get-ChildItem', link: '/commands/windows/get-childitem' },
            { label: 'winget', link: '/commands/windows/winget' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    {
      name: 'tailwind',
      hooks: {
        'astro:config:setup': ({ updateConfig }) => {
          updateConfig({
            vite: {
              plugins: [tailwindcss()],
            },
          });
        },
      },
    },
  ],
});
