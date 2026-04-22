import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'lo_jobscreator',
  description: 'Job, gang & interaction creator for RedM — multi-framework, in-game admin panel, extension API.',
  cleanUrls: true,
  lastUpdated: true,

  // GitHub Pages base path. If you publish at https://<user>.github.io/lo_jobscreator-docs/
  // keep '/lo_jobscreator-docs/'. If you serve from a custom domain, set to '/'.
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
      { text: 'Admin Panel', link: '/admin/dashboard', activeMatch: '/admin/' },
      { text: 'Extensions API', link: '/extensions/overview', activeMatch: '/extensions/' },
      { text: 'Reference', link: '/reference/config', activeMatch: '/reference/' },
      {
        text: 'v2.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Migration v1 → v2', link: '/migration' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Requirements', link: '/guide/requirements' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Frameworks', link: '/guide/frameworks' },
            { text: 'First boot checklist', link: '/guide/first-boot' },
          ],
        },
        {
          text: 'Concepts',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Jobs vs Gangs vs Public', link: '/guide/jobs-gangs-public' },
            { text: 'Interactions', link: '/guide/interactions' },
            { text: 'Personal actions', link: '/guide/actions' },
            { text: 'Permissions', link: '/guide/permissions' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Backups', link: '/guide/backups' },
            { text: 'Templates', link: '/guide/templates' },
            { text: 'Audit log', link: '/guide/audit' },
            { text: 'Performance & 600+ players', link: '/guide/performance' },
            { text: 'Localization', link: '/guide/localization' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
            { text: 'FAQ', link: '/guide/faq' },
          ],
        },
      ],

      '/admin/': [
        {
          text: 'Admin panel',
          items: [
            { text: 'Dashboard', link: '/admin/dashboard' },
            { text: 'Jobs module', link: '/admin/jobs' },
            { text: 'Gangs module', link: '/admin/gangs' },
            { text: 'Public interactions', link: '/admin/public' },
            { text: 'Items module', link: '/admin/items' },
            { text: 'Custom blips', link: '/admin/blips' },
            { text: 'Custom peds', link: '/admin/peds' },
            { text: 'Vehicles, horses, props, markers', link: '/admin/catalogs' },
          ],
        },
        {
          text: 'Tools',
          items: [
            { text: 'Server configuration', link: '/admin/server-config' },
            { text: 'Backups & restore', link: '/admin/backups' },
            { text: 'Templates', link: '/admin/templates' },
            { text: 'Audit log', link: '/admin/audit' },
            { text: 'Preferences', link: '/admin/preferences' },
          ],
        },
      ],

      '/extensions/': [
        {
          text: 'Extensions API',
          items: [
            { text: 'Overview', link: '/extensions/overview' },
            { text: 'Quick start', link: '/extensions/quickstart' },
            { text: 'Resource layout', link: '/extensions/resource-layout' },
            { text: 'Server registration', link: '/extensions/server' },
            { text: 'Client registration', link: '/extensions/client' },
          ],
        },
        {
          text: 'Schema reference',
          items: [
            { text: 'items', link: '/extensions/schema/items' },
            { text: 'actions', link: '/extensions/schema/actions' },
            { text: 'interactionTypes & schemas', link: '/extensions/schema/interactions' },
            { text: 'uiSections', link: '/extensions/schema/ui-sections' },
            { text: 'locales', link: '/extensions/schema/locales' },
          ],
        },
        {
          text: 'Going further',
          items: [
            { text: 'Custom UI (iframe)', link: '/extensions/custom-ui' },
            { text: 'Reading data at runtime', link: '/extensions/runtime' },
            { text: 'Lifecycle & hot reload', link: '/extensions/lifecycle' },
            { text: 'Best practices', link: '/extensions/best-practices' },
            { text: 'Public contract', link: '/extensions/contract' },
            { text: 'Selling your extension', link: '/extensions/selling' },
          ],
        },
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Config.lua', link: '/reference/config' },
            { text: 'SQL schema', link: '/reference/sql' },
            { text: 'Server exports', link: '/reference/exports' },
            { text: 'Server events', link: '/reference/events' },
            { text: 'Action hooks', link: '/reference/hooks' },
            { text: 'Interaction types', link: '/reference/interaction-types' },
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
