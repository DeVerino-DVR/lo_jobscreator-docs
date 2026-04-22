# Vehicles, horses, props, markers

Catalogues used by the entity / interaction editors.

## Vehicles

The vehicle picker (used by `vehicle_garage` interactions) reads from
`web/public/vehicles/` thumbnails and the `data/vehlist.lua` server-side
list. Add new vehicle models to the Lua list and matching `.webp`
thumbnails in `web/public/vehicles/`.

## Horses

Same logic with `web/public/horses/` and `data/horseslist.lua`. Used by
the `stable` interaction type.

## Props

Static props attached to interactions (e.g. a workbench prop on a craft
point). Catalogued in `data/proplist.lua` with thumbnails in
`web/public/props/`.

## Markers

Pre-defined marker shapes available to interactions. The catalogue is
hardcoded — every RDR2 marker handle the script supports is exposed in the
Combobox.
