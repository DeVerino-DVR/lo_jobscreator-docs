# Introduction

`lo_jobscreator` is a complete job, gang and interaction system for **RedM**
servers. Instead of editing a `Config.lua` and restarting the server every
time you want to add a stash, a delivery point or a new job, you do it all
**from inside the game** through a Vue 3 admin panel — and your changes go
live without a restart.

## What you can do with it

- **Create jobs and gangs** with their grades, salaries, blip and per-grade
  permissions.
- **Drop interactions on the map**: stash, shop, delivery, teleport, vehicle
  garage, stable, clothing store, crafting, processing, farming, selling,
  duty, telephone, wardrobe, boss action…
- **Manage public points** independent from any job (a public stash, a
  public clothing store, etc.).
- **Configure inventory items** (VORP / ox_inventory) — register them in MySQL,
  enable usable items, manage stack limits and weight.
- **Drop custom blips and NPC peds** anywhere on the map (server-wide visible
  to every player).
- **Hand out personal actions** to roleplayers (handcuff, revive, search,
  bandage, …) gated by job, grade and on-duty state.
- **Audit, backup, template and restore** every change.

## Who it is for

- **Server owners** who pay for the script and want to run their RedM server
  without writing Lua.
- **Roleplay servers** that need fast iteration on jobs, gangs and economy.
- **Resource developers** who want to extend the panel with their own
  features and **sell** them as standalone resources — see the
  [Extensions API](/extensions/overview).

## What this documentation covers

| Section | For whom |
|---|---|
| [Guide](/guide/introduction) | Server owners installing, configuring and operating the script. |
| [Admin Panel](/admin/dashboard) | Walkthrough of every tab in `/jobcreator`. |
| [Extensions API](/extensions/overview) | Third-party developers building add-on resources. |
| [Reference](/reference/config) | `Config.lua`, SQL schema, exports, events and hooks. |

## Versioning

The script follows semantic versioning. The **public extension API** is
considered stable and will not break across minor versions — see
[Public contract](/extensions/contract). The internal Lua and the NUI store
shape are not part of that contract and may change at any time.
