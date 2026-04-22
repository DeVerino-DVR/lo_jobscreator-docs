# Installation

## 1. Drop the resource

Place the `lo_jobscreator` folder anywhere in your `resources/` tree. The
folder name **must** stay `lo_jobscreator` — it is referenced in the NUI
URL and in the public exports.

A common layout:

```
resources/
└── [jobs]/
    └── [creator]/
        └── lo_jobscreator/
```

## 2. Ensure it in `server.cfg`

```cfg
ensure oxmysql
ensure vorp_core         # or rsg-core / qbr-core / rpx-core / …
ensure lo_jobscreator
```

Order matters — `lo_jobscreator` must start **after** your framework core.

## 3. First boot creates the SQL schema

On first start with a connected database, the resource auto-creates:

```
lo_jobs                    -- job entities
lo_gangs                   -- gang entities (only if Config.Features.gangs = true)
lo_job_interactions        -- interactions attached to jobs
lo_gang_interactions       -- interactions attached to gangs
lo_public_interactions     -- standalone public interactions
lo_settings                -- live admin-panel settings overrides
lo_audit                   -- write log
lo_backups                 -- snapshot table
```

If you do not want gang support at all, leave
`Config.Features.gangs = false` (default). Gang tables will simply not be
created — no DML is run for them.

## 4. Open the panel

In game, run `/jobcreator`. You should land on the dashboard. If the command
does nothing:

- Check that your character is in a group listed in
  `Config.PermissionGroup`.
- Check the F8 console for a red `[lo_jobscreator]` message.
- See [Troubleshooting](/guide/troubleshooting).

## 5. Editing the NUI (optional)

Only needed if you want to rebuild the front-end from source. The pre-built
NUI bundle ships in `web/build/`.

```bash
cd web
pnpm install
pnpm build
```

Restart the resource (`restart lo_jobscreator`) to pick up the new bundle.
