# Quick start

A complete, working extension in under 60 lines. Drop it into your
`resources/` tree, ensure it after `lo_jobscreator`, and you are done.

## `fxmanifest.lua`

```lua
fx_version 'cerulean'
games { 'rdr3' }
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'you'
description 'Sample extension'
version '1.0.0'

dependencies { 'lo_jobscreator' }

server_script 'server.lua'
client_script 'client.lua'
```

## `server.lua`

```lua
CreateThread(function()
    while GetResourceState('lo_jobscreator') ~= 'started' do Wait(200) end
    exports.lo_jobscreator:RegisterExtension('lo_medicjob_example', {
        label   = 'Medical module',
        typeKey = 'medic',
        items = {
            { name = 'bandage', label = 'Bandage', usable = true, limit = 20 },
        },
        actions = {
            bandage_use = {
                label           = 'Bandage',
                icon            = 'fa-solid fa-bandage',
                type            = 'target_player',
                hook            = 'bandage',
                defaultJobTypes = { 'medic' },
                featureKey      = 'actionBandage',
            },
        },
        uiSections = {
            {
                id      = 'medic_settings',
                label   = 'Réglages médicaux',
                typeKey = 'medic',
                schema  = {
                    fields = {
                        { key = 'autoGreet', type = 'boolean', label = 'Saluer les patients automatiquement', default = false },
                    },
                },
            },
        },
        locales = {
            fr = { ui_medic_autoGreet = 'Saluer les patients automatiquement' },
            en = { ui_medic_autoGreet = 'Auto-greet patients' },
        },
    })
end)
```

## `client.lua`

```lua
CreateThread(function()
    while GetResourceState('lo_jobscreator') ~= 'started' do Wait(200) end
    exports.lo_jobscreator:RegisterClientExtension('lo_medicjob_example', {
        clientHandlers = {
            OnFeature_bandage = function(actionId, action, targetServerId)
                print(('[lo_medicjob_example] Bandage applied to %s'):format(tostring(targetServerId)))
            end,
        },
    })
end)
```

## Test it

1. Add to `server.cfg`:

   ```cfg
   ensure lo_jobscreator
   ensure lo_medicjob_example
   ```

2. Restart the server.
3. In game, run `/jobcreator`, edit any job whose type is `medic`, see the
   new **Réglages médicaux** tab and the **Bandage** entry in the Actions tab.
4. Toggle `autoGreet` — the panel autosaves, no page reload needed.
5. Stop the extension (`stop lo_medicjob_example`). The tab is replaced by a
   "Extension non chargée" banner; the toggle value is still in MySQL.

The same example ships under `examples/lo_medicjob_example/` in the
`lo_jobscreator` resource folder.
