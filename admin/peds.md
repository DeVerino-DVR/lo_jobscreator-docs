# Custom peds

Standalone NPCs spawned by the resource. Visible to every player within
`Config.Performance.pedRenderDistance`.

## Use cases

- Background ambience (a barman, a rancher).
- A specific quest-giver waiting at a door.
- A guard outside a job building.

## Fields

| Field | Notes |
|---|---|
| Model | Picked from `data/pedlist.lua`. |
| Coords + heading | Capturable from current player position. |
| Animation | Optional dict + clip looped on the ped. |
| Scenario | Optional scenario name (e.g. `WORLD_HUMAN_SMOKE`). |
| Frozen | Locks the ped in place. |
| Invincible | Cannot be killed. |

Stored in `lo_custom_peds`.

## Streaming

The streamer keeps the closest `Config.Performance.maxRenderedPeds` peds
around the player and unloads the rest. Tune that cap to your server
budget.

## Face-on-approach

`Config.Performance.pedFaceOnApproach = true` rotates the closest ped to
look at the player when they walk within `pedFaceDistance` metres. Adds a
nice "alive" feel without scripting per-ped behaviour.
