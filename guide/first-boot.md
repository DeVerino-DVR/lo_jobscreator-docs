# First boot

A short checklist for your first session in the panel.

## 1. Open the panel

`/jobcreator` in chat. If nothing happens, your group is not in `Config.PermissionGroup`.

## 2. Pick your UI providers

Top right of the panel → **Preferences**. Choose the menu, input and progress-bar providers you want. If you have `ox_lib` installed, leave them on **Auto** — it will be picked.

If you serve French players, also set **Language** to `fr`.

## 3. Create your first job

**Jobs** tab → **New job**:

- **Technical name** — lowercase, no spaces (e.g. `sheriff`). This is what's stored on the character.
- **Label** — what players see.
- **Type** — pick a category (`leo`, `medic`, `fire`, `gouv`…). It's used by dispatch and online-counter exports.
- **Grades** — add as many as you want. Each grade has a name, salary, and an "is boss" toggle.
- **Regions** — which areas this job dispatches to. Tick the towns / districts it covers.
- **Blip** — optional, shows on the map.

Save. The job now exists.

## 4. Add an interaction to that job

Open the job → **Interactions** → **New interaction**. Pick a type (`duty`, `stash`, `shop`, `farm`, etc.), place it in the world (raycast or 3D gizmo), fill the form.

Most jobs want at least a `duty` point so members can clock in.

## 5. (Optional) Create custom items

**Items** tab → **New item**. Fill in name, label, weight, limit. Tick "Usable" if you want it to consume on use, configure its effect.

Restart `vorp_inventory` after creating items.

## 6. Back up

**Backups** tab → **Export**. Save the JSON somewhere. Do this regularly.
