# Custom blips, peds, props & markers

Independent of jobs and gangs, the panel can place visual elements anywhere on the map.

| What | Tab | Stored in |
|---|---|---|
| Blips | Custom blips | `lo_custom_blips` |
| Peds | Custom peds | `lo_custom_peds` |
| Props | Catalogs → Props | `lo_custom_props` |
| 3D markers | Catalogs → Markers | `lo_custom_markers` |
| Vehicles | Catalogs → Vehicles | `lo_custom_vehicles` |
| Horses | Catalogs → Horses | `lo_custom_horses` |

## Blips

Map markers, independent from any interaction. Pick the blip sprite from the catalogue, place it, save.

## Peds

NPCs that exist purely as scenery (a fisherman by the river, a bartender behind a counter). You can attach:

- A **model** (browse the built-in list — broken models are flagged automatically).
- A **scenario** (`WORLD_HUMAN_SMOKING`, `WORLD_HUMAN_DRINKING`, etc.).
- **Weapons** in hand.
- A **freeze** flag to nail them in place.

⚠️ Custom peds are spawned **locally on each client**. Don't spawn another instance of the same ped from another resource with `IsNetworked = true` at the same coords or you'll see doubles.

## Props

Static objects (signs, tables, anvils). Same placement flow as peds.

## 3D markers

The classic floating cone / circle on the ground, purely visual. Use it to highlight an interaction or a gathering point.

## Vehicles & horses catalogues

Used by `vehicle_garage` and `stable` interactions. You define a vehicle / horse once in the catalogue (model + display name + price + optional restrictions) and then reference it by name when configuring a garage or a stable.

## Streaming & performance

The panel streams custom peds, props and markers to clients within range only. Distances and caps are tunable in `Config.Performance`:

- `pedRenderDistance` (default 50m), `maxRenderedPeds` (default 25)
- `propRenderDistance` (default 50m), `maxRenderedProps` (default 30)
- `markerRenderDistance` (default 30m)
- `pedFaceOnApproach` — peds gently turn to face the closest player when within `pedFaceDistance`.

See [Performance](/guide/performance).
