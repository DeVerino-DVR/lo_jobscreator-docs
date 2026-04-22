# Schema — `interactionTypes` & `interactionSchemas`

Add a brand-new interaction type to the script. Admins can then create
interactions of that type from any entity editor.

## `interactionTypes`

Declares the type itself.

```lua
interactionTypes = {
    heal_point = { label = 'Healing point', icon = 'fa-solid fa-heart', isPublic = false },
}
```

| Field | Type | Notes |
|---|---|---|
| `label` | string | Display label. |
| `icon` | string | FontAwesome class. |
| `isPublic` | boolean | Whether it can be created as a public interaction (not tied to any job). |

## `interactionSchemas`

Declares the form fields shown when an admin edits an interaction of that
type.

```lua
interactionSchemas = {
    heal_point = {
        fields = {
            { key = 'healAmount',  type = 'number',  label = 'HP restored', default = 50, min = 1, max = 100 },
            { key = 'requireItem', type = 'item',    label = 'Required item' },
            { key = 'cooldownMs',  type = 'number',  label = 'Cooldown (ms)', default = 30000 },
        },
    },
}
```

The supported field types are the same as for [uiSections](/extensions/schema/ui-sections#supported-field-types):
`text`, `number`, `boolean`, `select`, `multiselect`, `grade`, `item`,
`textarea`, `json`.

## Runtime

Custom interaction **runtime** is your responsibility. Hook the central
event:

```lua
AddEventHandler('lo_jobscreator:server:UseInteraction', function(playerId, interactionId, interactionType, data)
    if interactionType ~= 'heal_point' then return end
    -- Heal the player using data.healAmount, check data.requireItem, etc.
end)
```

The values entered in the form are saved into `interaction.data` and
delivered as the `data` argument above.

## Display

When an admin creates an interaction, the **Type** combobox shows your new
type (with a "Provided by your_ext" badge). The editor automatically
renders your custom fields below the standard coordinate / prompt fields.
