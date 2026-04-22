# Schema — `items`

Pre-fills the **Items** module with ready-to-use entries. Admins still
have to click "Create" to actually insert the row in MySQL — this avoids
surprise inserts.

## Shape

```lua
items = {
    {
        name        = 'bandage',           -- inventory item name (snake_case, unique)
        label       = 'Bandage',           -- display label
        description = 'Heals minor wounds',
        usable      = true,
        limit       = 20,
        weight      = 0.1,
        type        = 'item_standard',     -- VORP type
        can_remove  = true,
        image_url   = 'https://...',       -- optional override
    },
}
```

## Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✓ | Becomes the row key in `items.item`. snake_case, unique. |
| `label` | string | ✓ | Display label. |
| `description` | string |  | Tooltip. |
| `usable` | boolean |  | If true, marks the item as usable in inventory. |
| `limit` | integer |  | Per-player stack cap. `-1` = unlimited. |
| `weight` | float |  | Inventory weight. |
| `type` | string |  | `item_standard`, `weapon`, `clothing`, … (VORP types). |
| `can_remove` | boolean |  | Whether the item can be dropped/discarded. |
| `image_url` | string |  | Override the default `Config.ImageUrl` template. |

## Display

The item appears in the **Items** tab with an "Extension preset" badge and
a "+ Create" button. Once created, the row lives in MySQL forever — even
if the extension is later stopped.

## Use case

Ship the items your extension depends on so server owners do not have to
manually create them:

```lua
items = {
    { name = 'bandage',  label = 'Bandage',  usable = true, limit = 20 },
    { name = 'morphine', label = 'Morphine', usable = true, limit = 5 },
    { name = 'syringe',  label = 'Syringe',  usable = true, limit = 10 },
},
```
