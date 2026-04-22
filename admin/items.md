# Items module

Manage rows of the `items` inventory table.

## Listing

Searchable table of every item registered in inventory (VORP / ox), with
columns:

| Column | Source |
|---|---|
| Name | `items.item` |
| Label | `items.label` |
| Limit | `items.limit` (per-player stack cap, -1 = unlimited) |
| Usable | `items.usable` |
| Type | `items.type` (item_standard, weapon, clothing, …) |

## Creating an item

**+ Nouvel item** opens a modal asking for the name (snake_case),
label, limit, weight, type and an optional image URL override.

Once saved, the row is inserted into `items` immediately and a refresh
event is broadcast so other resources reading `items` pick it up.

## Image URL pattern

```lua
Config.ImageUrl = 'nui://vorp_inventory/html/img/items/%s.png'
```

`%s` is replaced by the item name. Override per-item with the
`image_url` field.

## Currencies

`dollars` and `or` appear in the table for convenience but they are not
inventory items — they are VORP currencies. The script handles them
internally via `character.addCurrency(0, …)` / `character.addCurrency(1, …)`.
