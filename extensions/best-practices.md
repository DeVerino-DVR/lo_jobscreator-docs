# Best practices

Follow these to ship an extension that plays well with `lo_jobscreator`
and other extensions.

## Naming

- **Extension id == resource name.** Anything else makes ownership and
  logging ambiguous when several extensions share the same `uiSections.id`.
- **Section ids are global.** If two extensions register
  `uiSections.id = 'settings'`, the second registration wins and overwrites
  the first. **Always prefix:** `medic_settings`, `bank_vault_config`,
  `your_ext_main`, …
- **Action hooks are global.** Same rule — prefix with your domain.
- **Locale keys are global.** Prefix with `ui_<your_ext>_…`.

## Mutation

- **Do not mutate the registered config table after registration.** The
  core takes a sanitised copy (functions/userdata stripped) for broadcast;
  later mutations will not propagate to admin panels. Re-call
  `RegisterExtension` to update.
- **Server is the source of truth.** `RegisterClientExtension` only stores
  handler functions locally; the metadata always comes from the server snapshot.

## Lua gotchas

- **Never `local source = source`** at the top of a server file.
  `source` is contextual per event handler — caching it freezes it to
  `nil`. Always read `source` directly inside the handler. This has caused
  silent permission failures in the past.
- **Use synchronous server callbacks** for save operations (`lib.callback.await`
  or `Core.Callback.TriggerAwait`). Async events + refresh creates
  race conditions.
- **Prefer `pcall`** around your handlers — a crash in `OnFeature_<hook>`
  must not break the personal menu for the player.

## NUI / CEF gotchas (if you ever ship custom NUI)

- **`backdrop-filter` is broken in CEF** — never use it.
- **The native `<select>` glitches in CEF** — use a custom Combobox
  component (the core ships one if you fork the NUI).
- **`navigator.clipboard` is blocked in CEF** — use the textarea +
  `execCommand('copy')` fallback.

## Items

- **Items declared in `items` are presets, not auto-inserted rows.** The
  admin must still click "create" in the Items tab. This is intentional —
  no surprise SQL inserts.

## Removing fields

Simply unset the field in your next schema. The value will remain in
MySQL (no destructive migration runs). Document the removal so server
owners know they can clean it up via the **Inspection** tab.

## Performance

- Keep `serverHandlers` lean. They run for every action trigger of every
  player.
- If your extension subscribes to `lo_jobscreator:server:EntityUpdated`,
  filter early — don't iterate all jobs on every event.
- Defer heavy work (e.g. spawning props) until a player actually triggers
  your interaction.
