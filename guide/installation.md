# Installation

1. **Drop the folder** `lo_jobscreator` into your `resources/` folder.

2. **Add it to `server.cfg`**, after `oxmysql` and `vorp_core`:

   ```text
   ensure oxmysql
   ensure vorp_core
   ensure vorp_inventory
   ensure lo_jobscreator
   ```

3. **Start the server once.** All SQL tables are created automatically (see [SQL schema](/reference/sql) for the full list).

4. **Set your admin group.** Open `config.lua` and edit:

   ```lua
   Config.PermissionGroup = 'admin'   -- or { 'admin', 'superadmin' }
   ```

5. **Open the panel.** In-game, type `/jobcreator`.

That's it. No external dependencies to set up, no DB seed to run.

## After creating items

The script writes new items into `vorp_inventory`'s `items` table. After you create or edit items in the panel, **restart `vorp_inventory`** so it reloads its cache. The panel reminds you in a banner each time.

## Item images path (RedM-specific gotcha)

When you upload an item image from the panel, the file is written to `vorp_inventory/html/img/items/`. On some Windows setups, writing across resource folders that contain `[brackets]` (e.g. `[inventory]/vorp_inventory`) fails silently. If the panel says "no such file":

```lua
-- in config.lua
Config.ItemImagePath = 'C:/your/path/resources/[inventory]/vorp_inventory/html/img/items/'
-- must end with a trailing slash
```

## Updating

Replace the folder and restart the resource. SQL migrations run automatically on boot. Your data lives in SQL — overwriting the resource folder doesn't delete anything.
