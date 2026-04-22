# Custom blips

Standalone map blips that are not attached to any interaction. Visible by
every player at all times.

## Use cases

- Mark a city centre, a pier, a railway stop.
- Show a known PvP zone.
- Display a temporary event location.

## Fields

| Field | Notes |
|---|---|
| Sprite | Picked from the curated [`data/blipslist.lua`](https://github.com/) catalogue. The Combobox shows previews. |
| Scale | 0.1 → 4. |
| Coords | Capture from your current position with the **Capturer** button. |
| Modifier | Optional sprite modifier (`BLIP_MODIFIER_*`). |
| Visible | Toggle to hide without deleting. |

Stored in `lo_custom_blips`.
