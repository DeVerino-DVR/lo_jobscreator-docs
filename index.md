---
layout: home

hero:
  name: lo_jobscreator
  text: Build jobs without leaving the game.
  tagline: Job, gang and interaction creator for RedM. Multi-framework, in-game admin panel, public extension API.
  image:
    src: /logo.svg
    alt: lo_jobscreator
  actions:
    - theme: brand
      text: Get started
      link: /guide/introduction
    - theme: alt
      text: Admin panel
      link: /admin/dashboard
    - theme: alt
      text: Build an extension
      link: /extensions/overview

features:
  - icon: 🛠️
    title: Pure in-game editor
    details: Create, configure and tune jobs, gangs, items, interactions, blips and peds entirely from a Vue admin panel. No file editing, no restart loop.
  - icon: 🔌
    title: Multi-framework
    details: Works with VORP, RSG, QBR, RPX, REDEM, TPZ, FRP and a standalone fallback. Detection is automatic; one config switch overrides it.
  - icon: 🧩
    title: Public extension API
    details: Third-party developers can register items, actions, interaction types and UI sections at runtime. Sell your own extension without ever forking the core.
  - icon: ⚡
    title: Built for big servers
    details: Tested on 600+ player setups. Marker / ped / prop streaming, debounced refreshes and on-demand SQL.
  - icon: 🌐
    title: Translatable
    details: Locale files in /locales (en, fr shipped). Add your own language; extensions can ship their own dictionaries too.
  - icon: 🛡️
    title: Permission-aware
    details: Per-section button gating, optional staff groups, audit log of every admin write, automatic backups before destructive operations.
---
