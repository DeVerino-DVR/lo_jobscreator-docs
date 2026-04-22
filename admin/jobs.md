# Jobs module

Manage every job on the server.

## Listing

The left column lists every job, sortable and filterable. The badge next
to the name is the **entity type** (`leo`, `medic`, `job`, `farm`, …) —
this is what controls personal-action defaults and extension tabs.

## Creating a job

**+ Nouveau** opens the create dialog:

| Field | Required | Notes |
|---|---|---|
| Name | ✓ | snake_case, unique. Will be the value stored in `character.job`. |
| Label | ✓ | Display name. |
| Type | ✓ | One of `Config.EntityTypes`. |

The new job spawns with the default grades from `Config.DefaultGrades`.

## Editor tabs

| Tab | Purpose |
|---|---|
| **Infos** | Name, label, type. Delete button. |
| **Grades** | Grade list (id, name, payment, isboss). |
| **Blip** | Map blip — sprite, scale, coords (capturable). |
| **Interactions** | List of interactions attached to this job. Add / edit / delete. |
| **Actions** | Toggles for personal F-key actions. |
| **Inspection** | Raw entity JSON, copyable. Useful for support tickets. |
| _Extension tabs_ | One per extension uiSection whose `typeKey` matches. |

## "Set me as employee"

Top-right green button. Sets your character's job to this job, grade 0.
Useful while testing.

## Delete

Top-right red button. Asks for confirmation and lists every dependent row
(interactions, audit entries) that will be cleaned up.
