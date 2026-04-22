# Schema — `locales`

Ship i18n strings with your extension.

## Shape

```lua
locales = {
    fr = {
        ui_medic_autoGreet   = 'Saluer les patients automatiquement',
        ui_medic_maxBandages = 'Bandages par jour (max)',
    },
    en = {
        ui_medic_autoGreet   = 'Auto-greet patients',
        ui_medic_maxBandages = 'Bandages per day (max)',
    },
}
```

The top-level keys are language codes — they must match the file names in
`lo_jobscreator/locales/` (e.g. `en.json`, `fr.json`). Add as many as you
support.

## Merge semantics

The dictionaries are merged into the panel's i18n bundle on load. The
**server owner's locale file always wins** on key collision — your strings
are only used as fallbacks.

This means a server owner can completely re-translate your extension by
adding the same keys to their `locales/<lang>.json` without modifying your
code.

## Naming convention

Pick keys that are **unlikely to collide** — prefix with your extension id:

```
ui_<your_ext>_<field>
ui_medic_autoGreet      ✓
ui_<your_ext>_label     ✓
autoGreet               ✗ (will collide)
```

## Server-side strings

The core does not expose `L()` to extensions on purpose — it is internal
and not part of the public contract.

For server-side strings, ship your own micro i18n in your extension. A
simple table works fine:

```lua
local Strings = {
    fr = { bandage_applied = 'Bandage appliqué' },
    en = { bandage_applied = 'Bandage applied' },
}
local function L(key) return (Strings[Config.Lang] or Strings.en)[key] or key end
```
