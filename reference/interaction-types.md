# Interaction types

Each entry in `Config.InteractionTypes` represents a built-in interaction
type. The shape of `data` depends on the type. Custom (extension-provided)
types declare their own shape via `interactionSchemas`.

::: warning Legacy `data.items[]`
The original script stores per-item config inside `data.items[i]` rather
than at the root of `data`. Newer fields (animation, daily limit) live on
each item, not on the root. The runtime helpers
`ResolveAnim(d)` and `ResolveLimits(d)` in `shared/main.lua` flatten this
for you — **always** use them at runtime, never read `data.dict` etc. directly.
:::

## `stash`

| Field | Notes |
|---|---|
| `data.maxWeight` | Stash capacity. |
| `data.minGrade` | Minimum grade to access. |
| `data.shared` | Shared by all employees of the job. |

## `shop`

`data.items[i] = { item, label, price, currency, stock?, minGrade? }`.
`currency = 0` (dollars) or `1` (gold).

## `farm`

Per-item harvesting:

```lua
data.items[i] = {
    item, label,
    receiveAmount = { min = 1, max = 3 },     -- legacy: top-level data.amount
    chance        = 100,
    dailyLimit, totalLimit,
    animation = { dict, anim, duration = 5000, flag = 1 },
    requireItem,                               -- consumed per use
    rewardItems = { { item, chance, min, max } }, -- multi-loot
}
```

## `process`

Same shape as `farm` plus `data.items[i].input = { { item, count } }` for
required inputs.

## `sell`

```lua
data.items[i] = { item, price, currency, dailyLimit, totalLimit }
```

`currency = 0` for dollars, `1` for gold.

## `craft`

Recipe-based:

```lua
data.recipes[i] = {
    output = { item, count },
    inputs = { { item, count }, ... },
    duration, animation,
    minGrade, dailyLimit,
}
```

## `phone`

```lua
data = { number, label }
```

Triggers a phone-call menu. Implementation in `modules/phone/`.

## `duty`

```lua
data = { mode = 'toggle' | 'on' | 'off', minGrade }
```

Sets the player on/off duty for the parent job.

## `clothing_store` / `clothing_wardrobe`

Empty `data` — the runtime calls `Config.Framework.clothing.openStore` or
`openWardrobe`.

## `vehicle_garage`

```lua
data = { vehicles = { { model, label, price, minGrade } } }
```

Models from `data/vehlist.lua`.

## `delivery_point`

```lua
data = { destinations = { { coords, reward } }, vehicleModel }
```

Multi-step delivery defined per source point.

## `bossaction`

Empty `data` — opens the boss menu (job/gang management UI).

## `teleport`

```lua
data = { destination = vector4, fade = true, minGrade }
```

## `stable`

```lua
data = { horses = { { model, label, price, minGrade } } }
```

Models from `data/horses.lua`.

## Inspecting real data

In the panel, click any interaction → **Inspection de l'interaction** tab
→ Copy. The JSON shows exactly what the server has stored, including the
`data.disable.move` legacy nesting.
