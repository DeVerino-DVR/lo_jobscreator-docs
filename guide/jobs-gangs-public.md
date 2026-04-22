# Jobs vs Gangs vs Public interactions

Three top-level entity kinds live in the panel. Pick the right one for your
use case.

## Jobs

A **job** represents a structured organisation: police, medic, mayor, taxi
company, hunter co-op, …

- Owns a list of **grades** (rank + salary + boss flag).
- Owns a list of **interactions** (stash, shop, duty, …) accessible only by
  members.
- Has an entity `type` (`leo`, `medic`, `gouv`, `job`, `craft`, `farm`, `hunt`,
  `fish`, `trade`, …) that controls which **personal actions** appear by
  default in the F-key menu of members.
- Members are tracked through your framework (`character.job`).

Stored in `lo_jobs`.

## Gangs

A **gang** is the same shape as a job but lives in `lo_gangs` and uses
`character.gang` / `character.ganggrade` instead. Only enabled when
`Config.Features.gangs = true`.

If your framework does not have a gang concept, see the optional core patch
described in `GANG_SETUP.md` shipped with the script.

## Public interactions

A **public interaction** is a single point on the map that **does not belong
to any job or gang**. Examples:

- A public stash anybody can use.
- A general-store shop in a town centre.
- A public clothing store / wardrobe.
- A teleport between two map points.
- A public crafting bench.

Stored in `lo_public_interactions`. They appear under the **Public** tab of
the admin panel and are gated by `Config.InteractionTypes[type].isPublic`
(only types with that flag can become public).

## Quick decision matrix

| You want… | Pick |
|---|---|
| A bank vault used only by the bank job | Job interaction |
| A barber shop usable by everyone | Public interaction (`clothing_store`) |
| A weapon stash for the Lemoyne Raiders | Gang interaction |
| A hunter sells point usable by every Hunter job | Job interaction (per Hunter job) |
| A delivery point that any player can complete | Public interaction (`delivery_point`) |
