# Selling your extension

Practical advice if you plan to **sell** your extension as a standalone
resource.

## Licensing

`lo_jobscreator` is sold under a commercial license. Owning a copy of the
core does **not** give you any redistribution right over the core itself.

You are however free to:

- Sell or open-source your own extension as a separate resource.
- Require buyers to own a valid `lo_jobscreator` license.
- Charge whatever you want for your work.

The Extension API exists precisely to make this possible without you
having to ship any part of the core.

## Branding

- Use your own resource name (e.g. `lo_medicjob_premium`) — never reuse
  `lo_jobscreator` as a prefix.
- Pick your own color/logo for in-game notifications.
- The "Provided by &lt;you&gt;" badge in the panel uses the `label` field
  of your `RegisterExtension` call.

## Versioning

Your extension is a separate resource with its own version. Pin a
**minimum** core version in your README:

> Requires `lo_jobscreator` v2.0 or newer.

If you depend on a specific public-contract feature, document the version
that introduced it. The core's changelog tags every Extension API change.

## Support burden

Stuff to think about before selling:

- Where do customers report bugs? (GitHub issues, Discord, …)
- How do customers update? (manual download, Cfx Asset Escrow, Tebex, …)
- How do you tell whether a bug is yours or the core's? Ask for the
  output of the **Inspection** tab — it includes all data in JSON.

## Recommended structure

```
your_ext/
├── README.md         -- install, requirements, license
├── LICENSE
├── CHANGELOG.md
├── fxmanifest.lua
├── config.lua        -- user-tunable knobs
├── shared/
├── server/
└── client/
```

Ship a `README.md` that:

- Lists the `lo_jobscreator` minimum version.
- Lists every personal action / interaction type / UI section your
  extension contributes (so the buyer knows what to expect).
- Documents every `Config.*` knob.

## Cfx Asset Escrow / Tebex

Both work fine — the script never patches itself at runtime. Your
extension only needs to call `exports.lo_jobscreator:RegisterExtension`
on `start`.

If you escrow your code, double-check that the export call survives the
escrow stage (it does — exports are part of the resource manifest, not
the script body).

## Fair-play tips

- Do not register `uiSections` with `id = 'settings'` or `id = 'config'`
  or any other generic name. **Prefix.**
- Do not steal the player's F-key menu by registering 50 actions.
- Do not push noisy `print()` to the server console — gate behind a
  `Config.Debug` flag.
- When you stop being maintained, push a final version that sets the
  `description` to "Unmaintained" so server owners notice.

## Free alternative

If you don't want to handle a sales pipeline, open-source your extension
on GitHub under MIT/Apache. The Extension API treats free and paid
extensions identically.
