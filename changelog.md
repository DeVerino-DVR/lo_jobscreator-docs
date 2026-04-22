# Changelog

## 2.0 — Extension API

### Added

- **Public Extension API**: `RegisterExtension` / `UnregisterExtension`
  / `ListExtensions` (server) and `RegisterClientExtension` /
  `GetClientExtensions` (client). Extensions can contribute items,
  personal actions, interaction types, UI sections and locale strings
  without forking the core.
- **Sample extension** shipped under `examples/lo_medicjob_example/`.
- **`EXTENSIONS.md`** developer reference inside the script.
- **Extension UI section tabs** in the entity editor with 9 field types
  (text, number, boolean, select, multiselect, grade, item, textarea, json).
- **Provider tracking** via `entity.data._extProviders[sectionId]` so
  data survives extension restarts and is shown with an "Extension not
  loaded" banner if the owning extension is stopped.
- **Locale merging** at runtime — extensions ship FR/EN dictionaries that
  fall back when the server owner has not provided overrides.

### Changed

- `extensionData` no longer leaks unrelated keys into the editor — only
  keys that match a currently-registered `uiSection.id` or that are
  recorded in `_extProviders` are exposed.
- Tab bar in `EntityEditor.vue` now wraps with `overflow-x-auto` instead
  of overflowing.

### Fixed

- Race condition between async fire-and-forget event + refresh on save.
- `local source = source` cached `nil` in `UIUpsertInteraction` —
  removed everywhere.
- `<select>` glitches in CEF replaced with custom Combobox.
- `navigator.clipboard` blocked in CEF — replaced with textarea +
  `execCommand('copy')` fallback.

## 1.x

Initial release line. See git history.
