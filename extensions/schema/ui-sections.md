# Schema — `uiSections`

Adds a new tab inside the entity editor (per `typeKey` filter), with a
custom form that persists into `entity.data[sectionId]`.

## Shape

```lua
uiSections = {
    {
        id          = 'medic_settings',          -- key inside entity.data, MUST be unique
        label       = 'Medical settings',
        icon        = 'fa-solid fa-stethoscope',
        typeKey     = 'medic',                   -- filter: only entities of this type see the tab
        description = 'Configure medical defaults for this clinic.',
        schema = {
            fields = {
                { key = 'autoGreet',     type = 'boolean', label = 'Auto-greet patients', default = false },
                { key = 'maxBandages',   type = 'number',  label = 'Max bandages / day',  default = 5, min = 0, max = 100 },
                { key = 'unlockGrade',   type = 'grade',   label = 'Min grade for OR' },
                { key = 'requiredItem',  type = 'item',    label = 'Required item to heal' },
                { key = 'mode',          type = 'select',  label = 'Mode',
                  options = {
                      { value = 'free',    label = 'Free care' },
                      { value = 'billed',  label = 'Billed care' },
                  },
                  default = 'free',
                },
                { key = 'allowedRoles',  type = 'multiselect', label = 'Allowed roles',
                  options = { 'doctor', 'nurse', 'student' },
                  default = { 'doctor' },
                },
                { key = 'banner',        type = 'textarea', label = 'Welcome message' },
                { key = 'opaqueConfig',  type = 'json',     label = 'Advanced JSON' },
            },
        },
    },
}
```

## Section fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique key. Stored as `entity.data[id]`. **Prefix with your extension domain.** |
| `label` | string | Tab label. |
| `icon` | string | Optional FontAwesome class. |
| `typeKey` | string | Entity-type filter. Defaults to the extension's top-level `typeKey`. |
| `description` | string | Shown above the form. |
| `schema.fields` | array | List of fields. |

## Supported field types

| Type | Editor | Stored as |
|---|---|---|
| `text` | `<input type="text">` | `string` |
| `number` | `<input type="number">` | `number` |
| `boolean` | checkbox | `boolean` |
| `select` | dropdown of `options[]` | option `value` |
| `multiselect` | multi-dropdown | `array` of values |
| `grade` | dropdown of the entity's grades | grade id (`string`) |
| `item` | dropdown of `data.items` (server inventory) | item name (`string`) |
| `textarea` | multi-line input | `string` |
| `json` | raw JSON editor | parsed value (object/array/etc.) |

`field.options` accepts either `{ value, label }` objects or plain primitives.

## Field options

| Field option | Applies to | Notes |
|---|---|---|
| `key` | all | Required. The key in the stored object. |
| `label` | all | Display label. |
| `description` | all | Shown under the label. |
| `default` | all | Initial value. |
| `required` | all | Renders a red asterisk; not enforced server-side. |
| `placeholder` | text/number/textarea | HTML placeholder. |
| `min` / `max` / `step` | number | HTML5 attributes. |
| `options` | select / multiselect | Choices. |

## Storage

Saved automatically via `data.updateEntity`:

```
entity.data[sectionId][fieldKey] = value
entity.data._extProviders[sectionId] = '<your_ext_id>'
```

The provider key lets the panel show an "Extension not loaded" banner if
your extension is later stopped, without losing the data.

## Display

When an admin opens an entity matching your `typeKey`, an extra tab
appears with the section label. Fields autosave on change.

If the extension is stopped but `entity.data[sectionId]` exists, the tab
shows a banner with the raw JSON — never destroyed.
