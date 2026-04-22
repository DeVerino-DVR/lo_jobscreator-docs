# FAQ

#### Does the script work without a framework?

Yes — set `Config.Framework.force = 'standalone'`. You will lose
framework-specific features (paycheck banking, character group
permissions, on-duty toggling, …) and have to wire them yourself in
`modules/editable/server.lua`.

#### Can I rename the resource folder?

No. The folder name is part of the NUI URL (`https://lo_jobscreator/…`)
and of the public exports.

#### Will my data survive an update?

Yes. Schema migrations are additive — new columns are added with safe
defaults; no data is destroyed. Always take a snapshot from the
**Sauvegardes** tab before a major version upgrade anyway.

#### How do I delete the gang system once enabled?

Set `Config.Features.gangs = false`. The UI hides everything gang-related
and the script stops querying `lo_gangs` / `lo_gang_interactions` — your
data stays in MySQL but is never read again. Drop the tables manually if
you really want to wipe.

#### Can two admins edit the same entity at the same time?

Yes — saves are atomic per row, last-write-wins. The audit log records both
writes so you can untangle a conflict after the fact.

#### Does it work on QBR / RSG / RPX / …?

Yes — see [Frameworks](/guide/frameworks). Auto-detection covers most
setups. Force the key if your framework is not started yet at our boot
time.

#### How do I add a brand-new interaction type?

- For your own server only: add an entry in `Config.InteractionTypes` and
  hook the runtime in `lo_jobscreator:server:UseInteraction`.
- For a redistributable add-on: use the [Extensions API](/extensions/schema/interactions).

#### Where do extensions store their data?

In the existing entity row, under `entity.data[sectionId]`. Stopping the
extension preserves the data (the panel just shows a banner). See
[Extensions / Reading data at runtime](/extensions/runtime).
