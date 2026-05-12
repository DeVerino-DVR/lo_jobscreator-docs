# FAQ

## Do I have to write Lua to use this?

No. Everything is done from the in-game panel. You only touch Lua if you want to plug your own scripts in (see [Editable hooks](/reference/hooks)).

## Does it work with QBR / RSG / RPX / FRP / TPZ / REDEM?

Not officially. The script is built for **VORP**. The bridge to the framework lives in `modules/editable/framework.lua` and is fully open — you can rewrite it for another core, but that's on you, and support won't cover it.

## Can I run it without VORP?

Yes — it falls back to a minimal **standalone** mode using state-bags for jobs and no inventory. It's intended for dev / testing; production should run VORP.

## Will it conflict with my existing job system?

It writes to VORP characters directly (`character.job`, `character.jobGrade`, `character.gang`, `character.gangGrade`), which is the canonical place. If you have another resource that *also* writes to those fields, declare its upsert/delete exports in `Config.Framework.entityExports.vorp` and both stay in sync.

## Can I create jobs at runtime from another script?

The panel is the supported way. There's no public "CreateJob(name, data)" export — adding one in your own server script is doable (call the same internal upsert), but it's not part of the API and may break on updates.

## How do I sell my own extension on top of it?

Use the [`RegisterInteractionType`](/reference/custom-types) export to declare your own interaction type. Players configure it from the panel, your script handles it at runtime. That's the only supported extension surface.

## Will updating the resource wipe my jobs?

No. The data lives in SQL (`lo_*` tables). Replacing the resource folder doesn't touch them.

## Can I move from one server to another?

Yes. Export from the source server (**Backups → Export**), import on the destination. SQL is self-contained per server.

## Where do I report a bug?

GitHub issues on the [docs / resource repo](https://github.com/DeVerino-DVR/lo_jobscreator-docs). Include your RedM artifact build, server / F8 console output, and steps to reproduce.

## What's licensed how?

The resource itself is commercial. The documentation (this site) is MIT. The contents of `modules/editable/` ship uncrypted because you're meant to edit them.
