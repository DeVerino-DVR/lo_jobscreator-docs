# Public interactions

Map points that are **not tied to any job or gang** — public stashes,
public clothing stores, teleports, public crafting benches, …

## Editor

Same UI as a job interaction, minus the grade gate. Only interaction types
flagged `isPublic = true` in `Config.InteractionTypes` can be created here.

The editor saves into `lo_public_interactions` and the runtime serves them
to every player.

## Common use cases

- Public stash for everyone (limited weight to avoid abuse).
- Public clothing store and wardrobe for newly-arrived players.
- Teleport between two map sides.
- Public crafting bench for basic items.

## Permissions

Editing public interactions is gated by
`Config.ButtonPermissions.publicActions` (inherits
`Config.PermissionGroup` if empty).
