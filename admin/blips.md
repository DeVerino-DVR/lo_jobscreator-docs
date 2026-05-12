# Custom blips

Independent map markers — not tied to a job, gang or interaction.

## Form

| Field | What it is |
|---|---|
| **Name** | Internal name. Not shown in-game. |
| **Sprite** | Pick from the catalog (`PopularBlips` in `config.lua` for a curated list, or any of the built-in blip hashes). |
| **Label** | Tooltip shown when the player hovers it on the map. |
| **Coords** | Placement on the map. |
| **Display** | Where it appears (map only, minimap, both). |
| **Color** | Optional tint for sprites that support it. |
| **Scale** | Optional size override. |

## When to use it

- A landmark that isn't tied to a profession.
- A custom POI you want every player to see on the map.
- A blip attached to an event from another resource (just create it from the panel; events are decoupled).

## How it's rendered

Custom blips are created on every client on connect and refreshed when an admin edits them. No streaming distance — the blip exists on the map regardless of the player's location.
