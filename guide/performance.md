# Performance

The script is built to run on busy servers. A few knobs let you tune the cost.

## What can cost CPU at scale

- **Custom peds / props** rendered for every nearby client.
- **3D markers** drawn each frame.
- **`ox_target` zones** when many interactions are within range.
- **Player-state polling** in the fallback (no-VORP) mode.

All of these have caps or debounces in `Config.Performance`:

```lua
Config.Performance = {
    markerRenderDistance = 30,           -- meters
    pedRenderDistance    = 50,
    maxRenderedPeds      = 25,           -- absolute cap per client
    propRenderDistance   = 50,
    maxRenderedProps     = 30,
    targetRefreshInterval        = 1000, -- ms, ox_target zone rescan
    connectedPlayerRefreshInterval = 180000, -- ms, standalone job re-read
    updateDebounce       = 2000,         -- ms, panel→clients sync debounce
    pedFaceOnApproach    = true,
    pedFaceDistance      = 3,
}
```

## Recommended baselines

| Server size | What to do |
|---|---|
| < 64 players | Defaults are fine. |
| 64 – 200 | Keep defaults; if you push hundreds of peds, lower `maxRenderedPeds` to 20. |
| 200 – 600 | Drop ped / prop render distance to 40m, marker to 20m, `maxRenderedPeds` to 15. |
| 600+ | Same as above; consider disabling `pedFaceOnApproach`; review your custom peds (each ped is a streamed entity per nearby client). |

## Prompt vs target mode

`ox_target` is generally cheaper than rendering many always-on prompts. If you have lots of interactions in one town, default players to **target** mode (`Config.DefaultInteractionMode = 'target'`).

## Markers

3D markers are the most expensive visual per-frame because every visible marker draws every tick. Use them sparingly — most interactions look better with a blip + a prop than with a marker.

## Caching

The server keeps every job, gang and interaction in memory. Reads (exports, internal lookups) never hit SQL. Writes go to SQL once and broadcast a delta to clients.
