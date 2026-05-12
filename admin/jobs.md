# Jobs

Create, edit, delete jobs.

## Job form

| Field | What it does |
|---|---|
| **Technical name** | What gets stored on the character. Lowercase, no spaces. Immutable after creation. |
| **Label** | What players see (e.g. "Forces de l'ordre"). |
| **Type** | A category (`leo`, `medic`, `fire`, `gouv`, …). Drives dispatch routing and online counters. |
| **Description** | Optional, displayed in lists. |
| **Blip** | Optional map blip for the job's main building. |
| **Allowed personal actions** | Which entries from the personal-actions list this job's members get in their F-menu. |
| **Regions** | Which towns / districts this job covers. Used by dispatch. |

## Grades

A job has one or more grades. Each grade has:

- `id` — numeric, 0 is the lowest.
- `name` — display name.
- `payment` — salary per paycheck cycle.
- `isboss` — when true, `bossaction` interactions only show for this grade.

Drag grades to reorder. Deleting a grade demotes all current members to the grade below.

## Interactions

The job's interactions list (stashes, shops, garages, duty points, etc.) lives inside the job edit screen. Add / edit / delete / re-place them from there.

See [Interactions](/guide/interactions) for the field reference.

## Deleting a job

Removes the job from the database, demotes every current member to `unemployed`, and deletes every interaction attached to it. Asks for confirmation; logged in the audit log; restorable from a backup.

## "Apply changes" vs live updates

Most edits push to online clients within a couple seconds. A few — changing the job's technical name (which isn't possible anyway) or moving a ped attached to an interaction — require the player to leave the area and come back.
