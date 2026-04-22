# Troubleshooting

## `/jobcreator` does nothing

- Confirm your character is in a group listed in `Config.PermissionGroup`.
- Check the F8 console for `^1[lo_jobscreator]` red lines.
- Make sure the resource is `started` (`status lo_jobscreator` in the
  server console).

## "ServerDataReady is false"

The server is still loading data from MySQL. Wait a few seconds. If it
never becomes true, check that `oxmysql` is started **before**
`lo_jobscreator` and that the connection string is valid.

## NUI is blank / cursor stuck

- Open `nui_devtools lo_jobscreator` from the F8 console to inspect the
  Vue app and the network calls.
- Check that `web/build/index.html` exists. If you rebuilt the NUI, make
  sure the build succeeded (`pnpm build`).

## Markers / peds do not appear

- `Config.Features.<section> = true`?
- The client thread waits on `LocalPlayer.state.IsInSession`. If that flag
  never flips true, your framework is not setting it — adapt the wait in
  `client/main.lua` or rely on a different ready signal.
- Streaming caps in `Config.Performance` may be hiding distant entries.

## Saves do not persist

- Confirm `oxmysql` is connected and the `lo_*` tables exist.
- Check `lo_audit` — every save writes a row there. If the row is missing,
  the save never reached the server.
- Look for a `HasPermission(nil)` log line — that means somebody cached
  `local source = source` at the top of a Lua file. See
  [Best practices](/extensions/best-practices).

## Extension tab does not show

- The extension's `typeKey` must match the entity's `type` field exactly.
- The extension must have been started **after** `lo_jobscreator`. Stop and
  start it again, or rely on the recommended `while ~= 'started' do Wait` loop.
- Open `nui_devtools` and check the Pinia store: `data.extensions` should
  contain your extension id.

## Currency items missing

`dollars` and `or` are **not** inventory items — they are VORP currencies
managed by `vorp_core`. The script exposes them as items in the editor for
convenience and converts to `character.addCurrency(0, …)` /
`character.addCurrency(1, …)` internally.

## More help

- Inspect any entity from the **Inspection** tab to see the full JSON.
- Inspect any interaction from its editor → **Inspection de l'interaction**.
- Open a ticket with the inspect output attached, and the F8/server log
  excerpt.
