# Extensions API

> Public developer documentation for building third-party extensions on top
> of `lo_jobscreator`. An extension is a standalone RedM resource that
> registers new items, personal actions, interaction types and UI panels
> into the Job Creator at runtime, without modifying the core resource.

::: tip Why an extension?
Build features once, ship them as a separate resource, sell them or open-source
them — without ever forking `lo_jobscreator`. Stopping your extension restores
the core to its original state, byte-for-byte.
:::

## What an extension can do

A registered extension may contribute, **without restart of the core**:

| Contribution | Effect |
|---|---|
| `items` | Pre-fills the **Items** module so admins can drop ready-to-use entries (e.g. `bandage`). |
| `actions` | Adds entries to the **Actions** tab of every entity that matches the type filter. Triggers a `hook` when used in-game. |
| `interactionTypes` | New entry in the interaction-type combobox of `InteractionEditor`. |
| `interactionSchemas` | Custom field renderer for an interaction of that type. |
| `uiSections` | A new tab inside the entity editor (per `typeKey` filter) with a custom form that persists JSON into the entity. Supports both built-in fields and **custom HTML/JS UI** via [iframe](/extensions/custom-ui). |
| `locales` | FR/EN/etc. strings shipped with the extension. |

## Persistence model

The sections, items, actions and types are kept **in memory only** by the
core. The **values** entered by an admin (e.g. an `autoGreet = true`
checkbox) ARE saved into the entity row in MySQL like any other field.

Stopping the extension preserves the data; the editor just shows an
"Extension not loaded" banner instead of the form.

## Public surface

| Side | Export | Purpose |
|---|---|---|
| Server | `RegisterExtension(id, config)` | Register or replace. Idempotent. |
| Server | `UnregisterExtension(id)` | Manually remove. Auto-called on resource stop. |
| Server | `ListExtensions()` | Read-only registry snapshot. |
| Client | `RegisterClientExtension(id, config)` | Register **local** handler functions. |
| Client | `GetClientExtensions()` | Read-only client registry snapshot. |

See [Public contract](/extensions/contract) for the stability guarantee.

## Next steps

- [Quick start](/extensions/quickstart) — copy-paste a minimal working example.
- [Resource layout](/extensions/resource-layout) — files you need.
- [Server registration](/extensions/server) — the `RegisterExtension` call.
- [Client registration](/extensions/client) — handler routing.
- [Schema reference](/extensions/schema/items) — every field and its type.
- [Selling your extension](/extensions/selling) — practical advice.
