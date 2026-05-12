# Localization

## Player-facing strings

All text the players see lives in `locales/`. Two languages ship by default:

- `locales/en.json`
- `locales/fr.json`

Pick the default in `config.lua`:

```lua
Config.Lang = 'fr'
```

Each admin can override their own language in **Preferences** (the panel UI follows the admin's choice; what the players see follows `Config.Lang` on the server).

## Adding a language

1. Copy `locales/en.json` to `locales/<code>.json` (e.g. `de.json`).
2. Translate the values. Keys must stay identical.
3. Restart the resource.
4. Set `Config.Lang = 'de'` (or pick it from Preferences).

The panel reads available locales at startup and lists them in the language dropdown.

## What's translatable

Every visible label in the panel, every notification, every prompt, every job-template name. Things that stay in code (technical job names, item names) are **not** translated — they're identifiers.

## Templates

Job templates (in `modules/editable/templates.lua`) reference label **keys** (`labelKey = 'template.sheriff.name'`) instead of hard-coded strings. Add the matching key to every locale file you support.

## Missing keys

If a key is missing in the chosen language, the server falls back to the English value. If it's missing in English too, the raw key is shown — that's the signal you forgot a translation.
