# Jobs, gangs and public

## Jobs

Created and edited in the **Jobs** tab.

A job is stored as a row in `lo_jobs` and applied to characters via VORP (`character.job` + `character.jobGrade`). If you run a separate job-management resource that exposes upsert/delete exports, declare them in `Config.Framework.entityExports.vorp` and the panel will push every change there too.

### Grades

A grade has:

- `id` — numeric, 0 is the lowest.
- `name` — display name.
- `payment` — salary per paycheck cycle.
- `isboss` — boss-only interactions (`bossaction`) only show for grades where this is true.

There is no hard limit on the number of grades.

### Job type

The type drives:

- **Online counters** — `GetCountByType('leo')` returns how many cops are online.
- **Dispatch routing** — alerts target jobs by type (`leo`, `medic`, `fire`).
- **Paychecks** — `Config.Paycheck.governmentTypes` lists the types paid by the state automatically; others can use a boss-account integration.

You can edit the list of available types in **Server config → Entity types**.

### Regions

Each job has a list of regions (towns + districts) it covers. Alerts and the witness system only notify jobs whose regions intersect the alert's location. Set this in the job edit form.

## Gangs

Same shape as jobs, stored in `lo_gangs`, applied to characters via VORP (`character.gang` + `character.gangGrade`). Created in the **Gangs** tab.

A player can be in a job and a gang simultaneously — the two systems are independent.

## Public interactions

Created in the **Public actions** tab. No job, no gang — anyone in the world can use them. Typical use cases:

- Public stables (anyone can fetch / store their personal horse).
- Public garages.
- Mailboxes, payphones, water pumps.
- Teleporters between map points.

Internally they live in `lo_public_interactions`.

## Which one should I use?

- Something only one profession does → **Job interaction**.
- Something tied to a criminal group with grades and a boss → **Gang interaction**.
- Something anyone in the world does → **Public interaction**.
