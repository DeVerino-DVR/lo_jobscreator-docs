---
layout: home

hero:
  name: lo_jobscreator
  text: Build jobs without leaving the game.
  tagline: In-game job, gang and interaction creator for RedM. Official support for VORP.
  image:
    src: /logo.svg
    alt: lo_jobscreator
  actions:
    - theme: brand
      text: Get started
      link: /guide/introduction
    - theme: alt
      text: Admin panel
      link: /admin/overview
    - theme: alt
      text: Exports & hooks
      link: /reference/exports

features:
  - icon: 🛠️
    title: Everything from one panel
    details: Jobs, gangs, grades, salaries, items, blips, peds, props, markers, garages, stables, deliveries, shops, stashes, phones — created and edited in-game. No file editing, no restart loop.
  - icon: 🔌
    title: VORP-ready
    details: Officially supported on vorp_core + vorp_inventory. Auto-detects ox_lib, jo_libs, vorp_menu and ox_target. Falls back to a built-in standalone mode if nothing is installed.
  - icon: 🧩
    title: Open where it matters
    details: A single editable folder (modules/editable/) lets you plug your own scripts in with named hooks. The rest of the engine is closed and maintained.
  - icon: 🛡️
    title: Permission-aware
    details: Per-tab permission groups, every admin change recorded in an audit log, automatic JSON backups before destructive operations.
---
