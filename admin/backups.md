# Backups & restore

See [Guide / Backups](/guide/backups) for the concepts.

This page is the in-panel walkthrough.

## Browsing snapshots

Each row shows: created date, author character, optional note, scope
(global / single section).

Hover any row for a **Restaurer** button.

## Creating a snapshot

**+ Nouvelle sauvegarde** opens a modal:

- **Name** — required.
- **Note** — optional, free text.
- **Scope** — `global` (everything) or one of the section keys
  (`jobs`, `gangs`, `publicInteractions`, `items`, `customBlips`,
  `customPeds`, `settings`).

## Restoring

Confirm modal lists exactly what will be replaced. The script
**auto-creates a safety snapshot** of the current state before doing
anything destructive — so an undo is always one click away.
