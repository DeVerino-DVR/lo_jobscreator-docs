# Items

Create and manage items directly in `vorp_inventory`'s database.

## Item form

| Field | What it is |
|---|---|
| **Name** | Internal identifier (lowercase, no spaces). What other resources use. Immutable. |
| **Label** | What players see. |
| **Weight** | Per-unit weight. |
| **Limit** | Max stack size per inventory. |
| **Type** | `item_standard`, `item_weapon`, etc. |
| **Can remove** | Players can drop it. |
| **Usable** | Players can use it from the inventory. |
| **Consumable** | If on, one is removed per use. If off, the item triggers an action without disappearing (lockpicks, notepads). |
| **Image** | Drag-and-drop a PNG. Saved to `vorp_inventory/html/img/items/`. |

After saving new items, **restart `vorp_inventory`** so it reloads its cache. The panel shows a banner each time this is needed.

## Usable effects

If the item is usable, you can stack one or more effects. Each one has its own sub-form:

| Effect | Notes |
|---|---|
| Hunger / Thirst / Stress | Delta value (positive or negative). Routed through your HUD via `OnUsableHunger` / `OnUsableThirst` / `OnUsableStress`. |
| Player core (health / stamina) | Delta. Routed via `OnUsablePlayerCore`. |
| Horse core | Same idea, for the player's current mount, via `OnUsableHorseCore`. |
| Animation | Dictionary + name + duration. Plays while the item is being used. |
| Drunk gait | Duration + strength. The player wobbles. |
| Camera shake | Intensity + duration. |
| Screen FX | A built-in postFX preset or a named preset from `Config.UsablePresets`. |

All effects fire together when the item is consumed.

## Non-consumable items

Items marked **Usable but not Consumable** trigger the `OnUsableItemTrigger` hook on the client with the item name, the stack id, and the item data. Wire this in `modules/editable/client.lua` to react (open a UI, start a mini-game, send a radio message, etc.).

## Catalog images

The panel comes with a built-in image library (common item icons). If you don't have your own PNG, pick one from the catalog.

## Deletion

Removing an item deletes its row in `vorp_inventory.items` AND its usable config in `lo_item_usables`. Existing copies in player inventories become unusable on the next inventory open; restart `vorp_inventory` to clean them out.
