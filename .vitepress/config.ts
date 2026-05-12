import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'lo_jobscreator',
  description: 'In-game job, gang and interaction creator for RedM (VORP).',
  cleanUrls: true,
  lastUpdated: true,

  base: '/lo_jobscreator-docs/',

  head: [
    ['link', { rel: 'icon', href: '/lo_jobscreator-docs/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#dc2626' }],
  ],

  themeConfig: {
    siteTitle: 'lo_jobscreator',
    logo: { src: '/logo.svg', width: 24, height: 24 },

    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'Admin Panel', link: '/admin/overview', activeMatch: '/admin/' },
      { text: 'Reference', link: '/reference/exports', activeMatch: '/reference/' },
      { text: 'Changelog', link: '/changelog' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Requirements', link: '/guide/requirements' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'First boot', link: '/guide/first-boot' },
          ],
        },
        {
          text: 'How it works',
          items: [
            { text: 'Concepts', link: '/guide/concepts' },
            { text: 'Jobs, gangs & public', link: '/guide/jobs-gangs-public' },
            { text: 'Interactions', link: '/guide/interactions' },
            { text: 'Items', link: '/guide/items' },
            { text: 'Personal actions', link: '/guide/actions' },
            { text: 'Dispatch (witness)', link: '/guide/dispatch' },
            { text: 'Duty & paychecks', link: '/guide/duty' },
            { text: 'Custom blips / peds / props / markers', link: '/guide/custom-assets' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Permissions', link: '/guide/permissions' },
            { text: 'Backups & restore', link: '/guide/backups' },
            { text: 'Audit log', link: '/guide/audit' },
            { text: 'Localization', link: '/guide/localization' },
            { text: 'Performance', link: '/guide/performance' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
            { text: 'FAQ', link: '/guide/faq' },
          ],
        },
      ],

      '/admin/': [
        {
          text: 'Admin panel',
          items: [
            { text: 'Overview', link: '/admin/overview' },
            { text: 'Dashboard', link: '/admin/dashboard' },
            { text: 'Jobs', link: '/admin/jobs' },
            { text: 'Gangs', link: '/admin/gangs' },
            { text: 'Public actions', link: '/admin/public' },
            { text: 'Items', link: '/admin/items' },
            { text: 'Custom blips', link: '/admin/blips' },
            { text: 'Custom peds', link: '/admin/peds' },
            { text: 'Vehicles, horses, props, markers', link: '/admin/catalogs' },
            { text: 'Templates', link: '/admin/templates' },
            { text: 'Backups & restore', link: '/admin/backups' },
            { text: 'Audit log', link: '/admin/audit' },
            { text: 'Server configuration', link: '/admin/server-config' },
            { text: 'Preferences', link: '/admin/preferences' },
          ],
        },
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Exports', link: '/reference/exports' },
            { text: 'Editable hooks', link: '/reference/hooks' },
            { text: 'Interaction types', link: '/reference/interaction-types' },
            { text: 'Custom interaction types', link: '/reference/custom-types' },
            { text: 'config.lua', link: '/reference/config' },
            { text: 'SQL schema', link: '/reference/sql' },
            { text: 'Server events', link: '/reference/events' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DeVerino-DVR/lo_jobscreator-docs' },
    ],

    footer: {
      message: 'Released under a commercial license. Documentation released under MIT.',
      copyright: 'Copyright © 2024–present lo_jobscreator',
    },

    search: { provider: 'local' },
    outline: { level: [2, 3] },
  },
})
