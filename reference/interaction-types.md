# Interaction types

The built-in types you can pick when creating an interaction in the panel.

| Type | Public? | Behaviour |
|---|---|---|
| `stash` | yes | Opens a stash. Personal or shared. Backed by `vorp_inventory` (or `ox_inventory` if installed). |
| `shop` | no | Buys items. Configurable per-item price ($/gold), optional job / grade restriction, optional stock. |
| `farm` | yes | Plays an animation for X seconds → receive a random amount of an item. Multiple possible yields with a selection menu. Optional alert chance to a job type. |
| `sell` | yes | Sells items for $/gold. Per-item price, optional max per cycle, optional daily / total cap. |
| `process` | yes | Converts input items into output items, with a progress bar. |
| `craft` | yes | Pick a recipe → consumes ingredients → spawns the result. |
| `duty` | no | Toggles on / off duty for the player's current job. |
| `bossaction` | no | Boss-only menu — opens an external boss management resource (`lo_bossmenu` / `lo_gangmenu` if installed). Only visible to grades flagged `isboss = true`. |
| `vehicle_garage` | yes | Spawn / store one of the configured vehicles. References entries from the [Vehicles catalogue](/admin/catalogs#vehicles-catalogue). |
| `stable` | yes | Same idea for horses, against the [Horses catalogue](/admin/catalogs#horses-catalogue). |
| `delivery_point` | yes | Starts a delivery mission. Drive to one or more destinations, get paid on completion. Optional cargo, optional vehicle. |
| `phone` | yes | A phone with a contacts list. Call another number — the recipient's phone rings and they can pick up or reject. |
| `teleport` | yes | Teleports the player to a destination. Optional fade and loading. |
| `clothing_store` | yes | Fires your clothing resource's "open store" event. Configure in `Config.Framework.clothing` or implement `CustomOpenClothingStore(src)` in `modules/editable/server.lua`. |
| `clothing_wardrobe` | yes | Same, for the personal wardrobe. Override with `CustomOpenWardrobe(src)`. |
| `witness` | yes | Fires a dispatch alert (see [Dispatch](/guide/dispatch)). |

"Public?" means whether the type can be used in a public-interaction (anyone can use it) or only attached to a job / gang.

## Want a type that's not in this list?

You register it yourself from another resource. See [Custom interaction types](/reference/custom-types).
