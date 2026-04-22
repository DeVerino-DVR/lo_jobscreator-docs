# Localization

The script ships with English and French. Add your own language by dropping
a `<lang>.json` file in `locales/`.

## File format

Plain JSON, one flat dictionary, snake_case keys:

```json
{
  "ui_common_save": "Save",
  "ui_common_delete": "Delete",
  "ui_entity_tab_info": "Info",
  "…": "…"
}
```

Missing keys fall back to French, then to the raw key.

## Selecting the language

```lua
-- Default for everybody:
Config.Lang = 'fr'

-- Per-player override is allowed when:
Config.AllowInGamePreferences = true
```

When player preferences are enabled, an admin can change their own language
from **Préférences** in the panel. The choice is stored server-side (KVP)
and survives reconnects.

## Hardcoded labels in `config.lua`

A few default labels were originally hardcoded in French (e.g. `Recrue`,
`Forces de l'ordre`, `Magasin Vetement`). To translate them, edit the
matching tables in `config.lua`:

- `Config.DefaultGrades`
- `Config.EntityTypes`
- `Config.InteractionTypes`
- `Config.Actions[*].label`

These are also editable live from **Configuration serveur**.

## Extension locales

Extensions ship their own dictionaries — see [Extensions / locales](/extensions/schema/locales).
The server-owner's locale file always wins on key collision, so safe
namespacing is `ui_<your_extension>_<field>`.
