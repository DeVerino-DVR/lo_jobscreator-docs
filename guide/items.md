# Items

The **Items** tab creates and manages inventory items directly in `vorp_inventory`'s database. No SQL, no resource restart for individual fields — only `vorp_inventory` needs a restart to reload its cache after a batch of new items.

## Creating an item

Fields:

- **Name** — internal name (lowercase, no spaces). This is what other resources use.
- **Label** — what players see.
- **Weight** — single unit weight.
- **Limit** — max stack per inventory.
- **Type** — `item_standard`, `item_weapon`, etc.
- **Can remove** — players can drop it on the ground.
- **Usable** — players can use it from the inventory.
- **Consumable** — only relevant if usable. If on, one is removed per use. If off, the item triggers a custom action without being consumed (lockpicks, notepads, radios…).
- **Image** — drag-and-drop a PNG. The panel writes it to `vorp_inventory/html/img/items/`.

After creating items, **restart `vorp_inventory`** so it reloads the catalogue.

## Usable effects

If the item is usable, you can attach one or more effects. Each effect has its own form:

| Effect | What it does |
|---|---|
| Hunger / Thirst | Adds (or removes) hunger / thirst on use. Wired to your HUD via [`OnUsableHunger` / `OnUsableThirst`](/reference/hooks). |
| Stress | Same idea, for stress (`OnUsableStress`). |
| Health / Stamina | Affects the player core (`OnUsablePlayerCore`). |
| Horse core | Affects the player's mount cores (`OnUsableHorseCore`). |
| Animation | Plays an animation (dict + name) for the configured duration. |
| Drunk gait | Makes the player wobble for X ms. |
| Camera shake | Plays a cam shake with configurable intensity. |
| Screen FX | A built-in postFX preset (or a named preset from `Config.UsablePresets`). |

You can layer several effects per item — they all fire on use.

## Non-consumable items

Items flagged **Usable but not Consumable** call the `OnUsableItemTrigger` client hook with the item name, the stack id, and the item data. Use this for items that should react when used but stay in the inventory (a radio, a lockpick mini-game, a notepad opening a UI, etc.).

## Blacklisted-in-stash items

Some items shouldn't go into stashes (e.g. living animals). Maintain that list in `Config.BlackListedStorageItems`.

## Where the data lives

- The item itself — in `vorp_inventory`'s `items` table.
- Usable config (effects, animations) — in `lo_item_usables`.

Removing an item from the panel deletes both entries.
