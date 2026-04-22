# Resource layout

A minimum extension is three files placed in any folder of your
`resources/` directory (the path itself does not matter to FXServer):

```
resources/your_ext/
├── fxmanifest.lua
├── server.lua
└── client.lua
```

## `fxmanifest.lua`

```lua
fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'you'
description 'My extension for lo_jobscreator'
version '1.0.0'

dependencies { 'lo_jobscreator' }

server_script 'server.lua'
client_script 'client.lua'
```

::: tip
The `dependencies { 'lo_jobscreator' }` line tells FXServer to start the
core **before** your extension. You should still defer your
`RegisterExtension` call until the core resource is fully loaded — see
[Server registration](/extensions/server).
:::

## ID convention

The first argument to `RegisterExtension` (the extension id) **must equal
your resource name**. This guarantees:

- The audit log shows the right owner.
- Section ownership is unambiguous when several extensions use the same
  `uiSections.id`.
- Auto-cleanup on `onResourceStop` finds the right entries.

## Multiple files

Once your extension grows past a single file, organise like this:

```
resources/your_ext/
├── fxmanifest.lua
├── shared/
│   └── config.lua
├── server/
│   ├── main.lua          -- contains RegisterExtension + handlers
│   └── handlers.lua
├── client/
│   ├── main.lua          -- contains RegisterClientExtension + handlers
│   └── handlers.lua
└── locales/
    ├── en.lua
    └── fr.lua
```

There is **no** convention enforced — the only public contract is the
`RegisterExtension(id, config)` call signature.
