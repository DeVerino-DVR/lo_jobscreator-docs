# Dashboard

Landing page of `/jobcreator`. Shows aggregated counters and quick links.

## Counters

| Card | Source |
|---|---|
| Jobs | Number of rows in `lo_jobs`. |
| Gangs | Number of rows in `lo_gangs` (only if gangs enabled). |
| Public interactions | Number of rows in `lo_public_interactions`. |
| Items | Number of rows in `items` (the inventory table). |
| Custom blips | `lo_custom_blips`. |
| Custom peds | `lo_custom_peds`. |
| Vehicles, horses, props, markers | Sub-counts of interactions that ship a related entity. |

## Quick actions

The dashboard is also the safe place to:

- Take a global snapshot (top-right **Sauvegardes**).
- Check the latest audit entries.
- See whether the script detected your framework correctly (top-right
  status badge).
