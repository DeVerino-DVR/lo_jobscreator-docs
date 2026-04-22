# Custom UI (iframe)

For advanced extensions you can ship your **own** UI — React, Vue, Svelte
or plain HTML/JS — and have it rendered inside a tab of the entity editor
via a sandboxed iframe. The Job Creator handles tab placement, lifecycle
and data persistence; you handle the rendering and interactions.

::: tip When to use this
- Your form is too complex for the built-in field types.
- You want to render a graph, a table, a map, a 3D preview…
- You want a fully bespoke look that goes beyond a list of inputs.
- You already have a React/Vue codebase and want to embed it.
:::

## Declare the iframe section

In your `RegisterExtension` config, replace `schema.fields` with `iframe`:

```lua
uiSections = {
    {
        id          = 'medic_dashboard',
        label       = 'Medical dashboard',
        typeKey     = 'medic',
        description = 'Custom UI shipped by this extension.',
        iframe = {
            src     = 'web/index.html',           -- relative to your resource files{}
            height  = 520,                         -- pixels
            sandbox = 'allow-scripts allow-forms', -- iframe sandbox attribute
            -- allow = 'clipboard-write',          -- optional, mapped to <iframe allow=...>
        },
    },
}
```

::: warning Mutually exclusive
A section can declare **either** `schema.fields` (built-in fields) **or**
`iframe` (custom UI). If both are present, `iframe` wins.
:::

## Ship the HTML

Add the file to your resource and expose it via `ui_page` + `files{}` in
`fxmanifest.lua`:

```lua
ui_page 'web/index.html'
files {
    'web/index.html',
    'web/app.js',
    'web/style.css',
    -- bundled JS/CSS, fonts, images…
}
```

The Job Creator embeds your iframe at `https://<your_ext>/<src>`. Anything
under `files{}` is served as a static asset by the FXServer NUI loader.

## Communication: postMessage bridge

The parent (Job Creator) and your iframe communicate via the standard
`window.postMessage` API. There is **no** Vue store, **no** Pinia, **no**
import — your iframe is a plain web page.

### Messages from parent → iframe

| Type | Payload | When |
|---|---|---|
| `init` | `{ extId, sectionId, entityType, entityName, value }` | After the iframe sends `ready`, and on every external update of the value (autosave round-trip). |

Every message has `source: 'lo_jobscreator'`.

### Messages from iframe → parent

| Type | Payload | Effect |
|---|---|---|
| `ready` | `{}` | Tell the parent you are ready to receive `init`. Send this on first load. |
| `save` | `{ value: { … } }` | **Partial merge** — keys are merged into the section value. |
| `save-replace` | `{ value: { … } }` | **Full replace** — replaces the section value entirely. |
| `get` | `{}` | Ask the parent to re-send `init` (e.g. on form reset). |

Every message MUST include `target: 'lo_jobscreator'` and SHOULD include
`extId` + `sectionId` for routing.

## Minimal example

```html
<!DOCTYPE html>
<html><head><meta charset="UTF-8" /><title>My UI</title></head>
<body>
  <input id="greeting" type="text" />
  <button id="save">Save</button>

<script>
  let ctx = { extId: '', sectionId: '' };

  function send(type, payload) {
    parent.postMessage(Object.assign({
      target: 'lo_jobscreator', type, extId: ctx.extId, sectionId: ctx.sectionId,
    }, payload || {}), '*');
  }

  window.addEventListener('message', (e) => {
    const m = e.data;
    if (!m || m.source !== 'lo_jobscreator' || m.type !== 'init') return;
    ctx = { extId: m.extId, sectionId: m.sectionId };
    document.getElementById('greeting').value = m.value.greeting || '';
  });

  document.getElementById('save').addEventListener('click', () => {
    send('save', { value: { greeting: document.getElementById('greeting').value } });
  });

  parent.postMessage({ target: 'lo_jobscreator', type: 'ready' }, '*');
</script>
</body></html>
```

## React / Vue / framework code

The iframe is just a static HTML file. Build your bundle with Vite,
webpack, or whatever you like, output `index.html` + `assets/*` into
`web/`, then list every file in `files{}`:

```lua
files {
    'web/index.html',
    'web/assets/*.js',
    'web/assets/*.css',
}
```

The bridge is a 30-line vanilla `useEffect` / `onMounted` hook in your
React/Vue app — see the [`lo_medicjob_example`](https://github.com/DeVerino-DVR/lo_jobscreator-docs/tree/main/extensions/custom-ui) for a working sample.

## Sandbox & security

The iframe runs in a sandboxed browser context with a strict CSP-like
default. The `sandbox` attribute defaults to `allow-scripts allow-forms`.
You can override it:

```lua
sandbox = 'allow-scripts allow-forms allow-popups allow-same-origin'
```

::: warning
`allow-same-origin` removes the strongest security boundary between your
iframe and the panel — only enable it if you understand the risks. Most
extensions never need it.
:::

The `allow` field maps to the `<iframe allow="…">` HTTP feature policy —
e.g. `'clipboard-write; fullscreen'`.

## Lifecycle

| Event | Behaviour |
|---|---|
| Tab is opened | iframe is mounted, sends `ready`, receives `init` with the current value. |
| Admin types in another tab | iframe is unmounted (single tab visible at a time). |
| Value updates externally (other admin) | parent re-sends `init` with the new value. The iframe should **diff** before overwriting unsaved local state. |
| Extension is stopped | tab disappears; data is preserved. |
| Tab is reopened | fresh `init`. |

## Storage

Same as for `schema.fields` sections:

```
entity.data[sectionId]                 = value object
entity.data._extProviders[sectionId]   = '<your_ext_id>'
```

Both `save` and `save-replace` write through the standard
`updateEntity` callback — your data lives in the entity row in MySQL,
backed up, audited, restorable.

## Read at runtime

Same as for the built-in fields — see [Reading data at runtime](/extensions/runtime).

```lua
local job = CreatedJobs['doctor']
local dashboard = job and job.medic_dashboard
if dashboard and dashboard.freeCare then
    -- …
end
```
