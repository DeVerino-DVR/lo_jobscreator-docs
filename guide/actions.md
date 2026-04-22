# Personal actions

Personal actions are the entries of the **F-key menu** that members of a
job or gang see in-game.

Default key: `F7` (`Config.ActionMenuKey`).

## Built-in actions

Declared in `Config.Actions` (live-editable in **Configuration serveur →
Actions**). Each action has:

```lua
Config.Actions = {
    handcuff = {
        label           = 'Menotter',
        icon            = 'fa-solid fa-handcuffs',
        type            = 'target_player',
        hook            = 'handcuff',
        distance        = 3.0,
        requireOnDuty   = true,
        defaultJobTypes = { 'leo' },
        featureKey      = 'actionHandcuff',
    },
    -- …
}
```

| Field | Effect |
|---|---|
| `label` / `icon` | UI presentation. |
| `type` | `target_player`, `target_entity`, `self`, `area`. |
| `hook` | Routes to `OnFeature_<hook>` (client) and `OnAction_<hook>` (server). |
| `distance` | Maximum distance to the target. |
| `requireOnDuty` | Action only enabled while on duty. |
| `defaultJobTypes` | Job types that get this action enabled by default. `'*'` = all. |
| `featureKey` | Optional gating against `Config.Features`. |

## Per-entity activation

Inside the entity editor, the **Actions** tab lists every available action
with a checkbox. Toggling a checkbox enables the action for that specific
job/gang. Default state is computed from `defaultJobTypes`.

## Resolution order

When a player triggers an action with `hook = 'handcuff'`, the client
resolves the implementation in this order:

1. `OnFeature_handcuff(actionId, action, target)` in
   `modules/editable/client.lua` (server-owner override).
2. `DefaultAction_handcuff(target)` in `modules/actions/client.lua`
   (built-in default).
3. **Extension client handler** — if any extension registered
   `clientHandlers.OnFeature_handcuff` via `RegisterClientExtension`.
4. **Extension server handler** — if any extension declared
   `serverHandlers.OnAction_handcuff`, the core sends a net event
   automatically.
5. Legacy raw `event` field on the action.

Edit `modules/editable/client.lua` to wire actions to your own scripts. Do
not edit `modules/actions/client.lua` — it is the default behaviour and
gets overwritten on update.

## Adding a new action

For a one-shot action **on this server only**, add it to `Config.Actions`
and write the matching `OnFeature_<hook>` in
`modules/editable/client.lua`.

For a redistributable action **shipped as an extension**, see
[Extensions / actions](/extensions/schema/actions).
