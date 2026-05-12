# Templates

One-click setups for common jobs and gangs (sheriff, medic, saloon owner, miner, etc.). Each template is a pre-filled definition you can import as-is or edit before saving.

## Importing a template

**Templates** tab → pick one → **Import**. A preview shows what will be created:

- The job / gang itself, with all its grades.
- All its interactions (duty points, stashes, shops, etc.) at default coordinates.
- Any custom items the template needs.

Confirm to commit. Logged in the audit log.

## After import

Templates ship with **placeholder coordinates** (usually around Saint-Denis). After importing, open the job and re-place every interaction at the right spot. The template gives you the shape, not the geography.

## Adding your own templates

Edit `modules/editable/templates.lua`:

```lua
JobTemplates['my_template'] = {
    name = 'my_template',
    labelKey = 'template.my_template.name',
    type = 'leo',
    grades = {
        { id = 0, nameKey = 'template.my_template.grade.0', payment = 50, isboss = false },
        { id = 1, nameKey = 'template.my_template.grade.1', payment = 80, isboss = false },
        { id = 2, nameKey = 'template.my_template.grade.2', payment = 120, isboss = true  },
    },
    -- optional: pre-built interactions
    interactions = { ... },
}
```

Add the matching `labelKey` and `nameKey` entries to your locale files. Restart the resource and your template shows up in the panel.

## Why use templates

- Quickly bootstrap a new server.
- Standardize across multiple servers.
- Distribute job presets to your team.
