# Performance & 600+ players

The script is tuned for big servers. The defaults below were validated on a
600-player live RedM setup.

## Streaming

```lua
Config.Performance = {
    markerRenderDistance = 30.0,
    pedRenderDistance    = 50.0,
    maxRenderedPeds      = 25,
    propRenderDistance   = 50.0,
    maxRenderedProps     = 30,
    targetRefreshInterval = 1000,
    updateDebounce        = 2000,
    pedFaceOnApproach     = true,
    pedFaceDistance       = 3.0,
}
```

- **`maxRenderedPeds` / `maxRenderedProps`** are the hard caps per player.
  Past this number, the streamer keeps the closest entries and skips the
  rest. Increase only if you have headroom in the RDR2 entity budget.
- **`targetRefreshInterval`** controls how often `ox_target` zones are
  rebuilt around the player. 1000 ms is a good balance.
- **`updateDebounce`** is the minimum delay between two NUI auto-refreshes
  pushed by the server. Below 1000 ms you start hitting Vue render churn.

## SQL

- Reads happen once at boot and on `restart lo_jobscreator`.
- Writes are atomic per row and use `ServerCallback` from the NUI so the
  panel waits for the row to land before showing the new state.
- The `lo_audit` table grows over time — set up external retention.

## NUI

- The pre-built bundle is minified and tree-shaken (Vite).
- `backdrop-filter` is **never** used (CEF perf trap).
- The `Combobox` is a custom Vue component — the native `<select>` is
  unreliable in CEF.
- Routes are lazy-loaded; the dashboard tab is the only one that runs at
  open time.

## Markers

`vorp_lib` prompts are rendered only within `markerRenderDistance` of the
player. Tune this if you have hundreds of interactions densely packed in a
town centre.

## Recommendations

- Use `ox_target` (`Config.DefaultInteractionMode = 'target'`) — fewer
  draw calls than the prompt mode.
- Keep `Config.Logs.webhook` empty during stress tests; serialise to
  console only.
- If you run a single massive job (e.g. a 50-grade police), split it into
  smaller subjobs — 50 entries in the Grades table makes the editor
  sluggish (Vue) but stays fine in-game.
