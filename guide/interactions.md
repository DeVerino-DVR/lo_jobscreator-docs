# Interactions

An **interaction** is a point on the map that the player walks up to and
triggers a behaviour: open a stash, sell items, accept a delivery, change
clothes, drive a horse out of a stable, …

## Built-in types

Defined in `Config.InteractionTypes` and editable live in
**Configuration serveur → Types d'interaction**.

| Type | Description | Public allowed? |
|---|---|---|
| `stash` | Personal/job storage | ✓ |
| `shop` | Buy items | ✗ |
| `farm` | Pickup an item from a node (with cooldown / daily limit) | ✓ |
| `process` | Convert items A → items B at a workbench | ✓ |
| `sell` | Sell items at a fixed price | ✓ |
| `craft` | Recipe-based crafting | ✓ |
| `phone` | Phone interactions | ✓ |
| `duty` | Take/leave duty | ✗ |
| `clothing_store` | Open clothing store | ✓ |
| `clothing_wardrobe` | Open personal wardrobe | ✓ |
| `vehicle_garage` | Spawn / store a vehicle | ✓ |
| `delivery_point` | Pickup and dropoff routes | ✓ |
| `bossaction` | Boss menu actions | ✗ |
| `teleport` | Two-point teleport | ✓ |
| `stable` | Spawn / store a horse | ✓ |

## Anatomy

Every interaction stores:

- `type` — one of the keys above.
- `coords` — vec3 position.
- `prompt` — label shown to the player.
- `data` — type-specific JSON (items, prices, animations, limits, …).
- `permissions` — grade gate (job/gang only).
- Optional `marker`, `ped`, `prop`, `blip`.

The shape of `data` differs per type — the editor (`InteractionEditor.vue`)
renders the right form automatically.

## Editing

Open any job/gang/public entry, switch to **Interactions**, click an
interaction (or **+ Nouvelle interaction**). Coordinates can be captured
from your current player position (the **Capturer** button).

Saving is done synchronously through a `ServerCallback` — the panel waits
for the SQL write to complete before showing the new state, so there is no
race condition between two admins editing in parallel.

## Custom interaction types

Extensions can register new types — see
[Extensions / interactionTypes](/extensions/schema/interactions). The runtime
hook is `lo_jobscreator:server:UseInteraction`; switch on
`interactionType == 'your_custom_type'`.

## Legacy data shape

Some fields used to be stored **per item** in `data.items[]` instead of at
the root of `data`. Two helpers in `shared/main.lua` handle the fallback
transparently:

| Helper | Looks at |
|---|---|
| `ResolveAnim(d)` | `d.dict/d.anim/d.time` first, then `d.items[].animation`, then `d.recipes[].animation`. |
| `ResolveLimits(d)` | `d.dailyLimit/d.totalLimit` first, then `d.items[].dailyLimit/totalLimit`. |

Always read animations and limits through these helpers, never directly
through `data.dict` / `data.anim` — older entities will not have the flat
keys.
