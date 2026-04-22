# Migration

## v1 → v2

Nothing breaking — v2 is fully backward compatible with v1 data. The
extension API is purely additive.

If you maintained a fork of `lo_jobscreator` to add custom UI sections,
consider porting your work to a standalone extension resource — see
[Extensions API](/extensions/overview) and
[Selling your extension](/extensions/selling).

### Steps

1. Stop the server.
2. Replace `lo_jobscreator/` with the v2 release.
3. Start the server. The new SQL columns / tables are auto-created.
4. Verify the **Configuration serveur** tab still shows your settings.
5. (Optional) Migrate your fork patches to a standalone extension.
