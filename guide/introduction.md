# Introduction

`lo_jobscreator` is an in-game admin panel for RedM that lets you create and manage everything around jobs and gangs without ever editing files:

- Jobs, gangs and public points
- Grades and salaries
- Interactions: stashes, shops, farms, sells, processes, crafts, deliveries, garages, stables, phones, teleports, clothing, dispatch alerts
- Items (created directly into `vorp_inventory`), usable effects (drunk, stress, hunger, screen FX…)
- Custom blips, peds, props, 3D markers
- Templates to bootstrap a job in one click
- Backups, restore, audit log

It is built for, and officially supported on, **VORP** (`vorp_core` + `vorp_inventory`). Without VORP, the script runs in a minimal **standalone** mode (no inventory, statebag-based jobs).

## What you actually edit

Two places — that's it:

- [`config.lua`](/reference/config) — initial defaults (command name, language, permission groups, paycheck interval, etc.). Most of these are also editable live in the panel.
- [`modules/editable/`](/reference/hooks) — five Lua files where you plug your own scripts via named hooks. Shipped unencrypted on purpose.

Everything else is the engine. Do not edit it.

## Who this doc is for

Server owners and admins. You do not need to write code to use the resource — most of this documentation describes the panel and how features behave. The [Reference](/reference/exports) section is for developers who want to integrate with other scripts.

## What's not covered

- Plugging another framework than VORP. The bridge (`modules/editable/framework.lua`) is open and editable, but third-party frameworks are not officially supported.
- Modifying the panel itself (the Vue NUI).
