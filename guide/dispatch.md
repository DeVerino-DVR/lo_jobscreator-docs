# Dispatch (witness)

The built-in alert system. When a crime / emergency happens, online players whose job is configured to receive that type of alert — and whose job covers the region — get notified, with a GPS waypoint and a quick "take the call" button.

## Who receives an alert

An alert has a `type` (e.g. `robbery`, `theft`, `down`) and an optional list of jobs to notify. Routing is:

1. If `jobsToAlert` is set, only those jobs are notified.
2. Otherwise, every job whose **type** matches the default category (`leo` for crime, `medic` for medical, `fire` for fire). The map between type and category is in `modules/witness/`.
3. From that list, only jobs whose **regions** intersect the alert's coords actually receive it.
4. From that filtered list, only players currently **on duty** for one of those jobs actually receive it.

## Firing an alert from your script

```lua
-- new form (recommended)
exports.lo_jobscreator:dispatchAlert(GetEntityCoords(PlayerPedId()), 'robbery', {
    title = 'Bank robbery',
    message = 'Suspect armed, fleeing north.',
    jobsToAlert = { 'police', 'sheriff' },
})

-- legacy form (still supported)
exports.lo_jobscreator:dispatchAlert({
    coords = vector3(...),
    type = 'theft',
    title = 'Store theft',
    message = '...',
    jobs = { 'police' },
})
```

## Witness interaction

You can also let players trigger an alert from the world via a **witness** interaction (configurable in the panel). It uses the same routing.

## Sonar / GPS fade

The waypoint dropped on the receiver's map is intentionally fuzzy — the original coords are offset by a random distance (`Config.WitnessSonarOffset`, default 50m) and the waypoint auto-clears after a delay or when the receiver gets close.

## Replacing the default notification

If you run your own dispatch UI (mdt, lo_dispatch, etc.), define the hook in `modules/editable/client.lua`:

```lua
function OnDispatchAlertReceived(alertData, helpers, ctx)
    exports.my_dispatch:CreateAlert({
        title = alertData.title,
        coords = alertData.coords,
        type = ctx.dispatchType,  -- 'police' | 'ems' | 'fire'
    })
    return true   -- 'I handled it' — skip the default banner
end
```

Return `false` (or nothing) to keep the default banner on top of yours.
