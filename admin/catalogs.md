# Vehicles, horses, props, markers

The four catalogues. Each entry is a reusable definition you reference from interactions or place directly in the world.

## Vehicles catalogue

Used by `vehicle_garage` interactions.

| Field | What it is |
|---|---|
| **Name** | Internal id. |
| **Model** | RedM vehicle model hash / name. Check it against `data/vehlist.lua` if unsure. |
| **Label** | What players see. |
| **Category** | Wagon, cart, carriage… (free-form for grouping). |
| **Price** | If the garage sells it, the price. |
| **Restrictions** | Optional job / grade gating. |

Garages reference vehicles **by name**. Renaming a catalogue entry breaks every garage that points to it.

## Horses catalogue

Same idea, used by `stable` interactions.

| Field | What it is |
|---|---|
| **Name** | Internal id. |
| **Model** | RedM horse model. |
| **Label** | Display name. |
| **Coat** | Optional pre-defined coat / breed combo. |
| **Price** | If the stable sells it. |

## Props catalogue

Static objects placed in the world (independent from interactions). Browse the prop list, pick a model, place it. Use it to decorate without spawning real interactable entities.

Streaming follows `Config.Performance.propRenderDistance` and `maxRenderedProps`.

## Markers catalogue

3D markers placed in the world. Configure type (cone, circle, square), color, size, height. Use sparingly — markers redraw every frame so dozens of them in one area cost CPU.

Streaming follows `Config.Performance.markerRenderDistance`.
