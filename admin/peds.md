# Custom peds

NPCs that live in the world as scenery. Not tied to a job — for job-bound NPCs (a clerk that opens a stash, a bartender that runs a shop) attach a ped to the interaction itself instead.

## Form

| Field | What it is |
|---|---|
| **Model** | Pick from the catalog. Models flagged "broken" are known-incompatible and won't spawn correctly. |
| **Coords + heading** | Placement. |
| **Scenario** | Optional ambient animation loop (`WORLD_HUMAN_SMOKING`, `WORLD_HUMAN_DRINKING_BEER`, etc.). |
| **Weapon** | Optional weapon hash to give them. |
| **Freeze** | Nail them in place — they won't wander or react. |
| **Invincible** | Bullets, fire, etc. don't kill them. |

## Streaming

Custom peds are spawned **locally on every client** within range:

- Render distance: `Config.Performance.pedRenderDistance` (default 50m).
- Cap per client: `Config.Performance.maxRenderedPeds` (default 25).
- Optional: peds turn to face the closest player within `pedFaceDistance` (`pedFaceOnApproach`).

When a player walks away beyond the render distance, the ped is despawned and re-spawned on next approach.

## Don't network them yourself

If another resource also spawns the same ped at the same coords with `IsNetworked = true`, you'll see two of them. The panel handles peds locally — keep the panel as the single source of truth.

## Broken models

Some RDR2 models are technically valid but don't survive RedM's local ped pool — they disappear or fail to spawn. The panel marks them automatically; pick a non-broken one.
