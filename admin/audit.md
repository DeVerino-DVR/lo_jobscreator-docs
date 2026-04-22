# Audit log

In-panel walkthrough. See [Guide / Audit](/guide/audit) for the
concepts.

## Filters

- By actor (`character.name`).
- By action (`entity.update`, `interaction.delete`, `backup.restore`, …).
- By date range.
- By target (entity name).

## Diff view

Click any row to open the **before / after** JSON diff. The diff is rendered
field-by-field, with green = added, red = removed.

## Discord mirror

If `Config.Logs.webhook` is set, every entry is also pushed to the Discord
channel as an embed with the diff truncated to 1500 characters.
