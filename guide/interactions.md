# Interactions

Every interaction is a point in the world, attached to a job, a gang or "public", with a behaviour determined by its **type**.

## Anatomy of an interaction

When you create or edit an interaction the panel asks you for:

| Field | What it is |
|---|---|
| Type | What happens when a player triggers it (see [Interaction types](/reference/interaction-types)) |
| Position | Where it is. You either point at it (raycast) or drag it with a 3D gizmo. |
| Prompt / target | What players see — a floating label, an `ox_target` zone, or both. |
| Blip | Optional map marker. |
| Ped | Optional NPC that stands there (model, scenario, weapons…). |
| Prop | Optional static object (table, sign, anvil…). |
| 3D marker | Optional ground marker (visual only). |
| Type-specific config | Fields that depend on the type (item list for shop, recipes for craft, destinations for delivery…). |

## How players actually trigger it

Two modes, set per player in **Preferences → Interaction mode**:

- **Prompt** (default) — a floating text appears within range. Players press the configured key to use it.
- **Target** — invisible until the player aims at it with `ox_target`. Requires `ox_target` running.

Server owners pick the default in `Config.DefaultInteractionMode`.

## Limits

Each interaction can have a **daily** and/or **total** use limit (per player). When the limit is hit the interaction refuses to trigger and tells the player. Counters reset at server restart for total limits and at the daily reset hour for daily ones.

## Job / grade restrictions

For job and gang interactions, you can restrict who can use it by grade (e.g. only sergeant and up). For public interactions, you can optionally limit by job (e.g. only doctors can use this hospital teleport).

## Placement modes

When placing a ped, prop, blip or marker, two modes are available:

- **Raycast** (default) — point at the ground with the mouse, scroll to rotate, click to confirm.
- **Gizmo** — the object spawns in front of you and a 3D gizmo lets you drag and rotate it precisely. Requires `jo_libs`.

Set the default in `Config.PlacementMode`. Admins can override their own choice in **Preferences**.
