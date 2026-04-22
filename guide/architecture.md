# Architecture

A bird's eye view of how the resource is laid out.

## Folders

```
lo_jobscreator/
├── client/            -- Lua client (NUI bridge, key handling, marker/ped streaming)
├── server/            -- Lua server (callbacks, SQL, paycheck, audit)
├── shared/            -- Shared globals & helpers (CreatedJobs, Resolve helpers)
├── modules/           -- One folder per feature (farm, sell, process, craft, shop,
│   ├── farm/             stash, phone, delivery, vehicles, duty, witness, peds, …)
│   ├── sell/
│   ├── …
│   ├── editable/      -- ⚠ Owner overrides (framework bridge, custom hooks)
│   └── extensions/    -- Public extension registry (do not edit)
├── data/              -- Static data (peds list, weapons list, blips list, …)
├── locales/           -- en.json / fr.json / your language
├── examples/          -- Sample extensions (reference only)
├── web/               -- Vue 3 + Vite NUI source
└── config.lua         -- Boot defaults (most are also editable in-game)
```

## Lua boot order (server)

1. `MySQL.ready` is the only entry point.
2. `CreateTables()` — creates `lo_*` tables (skips gangs if disabled).
3. `LoadItemsCache()` — pulls inventory items + weapons + currencies.
4. `LoadAllData()` — reads `lo_jobs`, `lo_gangs`, `lo_*_interactions`.
5. `InitializeItemLabels()` — resolves labels for cached items.
6. `ServerDataReady = true` — every callback waits on this flag before responding.

## Lua boot order (client)

1. Wait for `LocalPlayer.state.IsInSession`.
2. Call `lo_jobscreator:server:GetPlayerData`.
3. Hydrate locals (`MyJob`, `MyGrade`, …) and `InitVisuals()` (markers/peds streaming).

## NUI ↔ Lua

- The NUI is a Vue SPA built into `web/build/`.
- `bridge.ts` exposes `fetchNUI(name, payload)` → POST to
  `https://lo_jobscreator/<name>`. Handlers are declared via
  `RegisterNUICallback(name, cb)` in `client/nui.lua`.
- The server pushes updates via `SendNUIMessage` (e.g. `extensionsChanged`).
  The Vue side listens in `web/src/main.ts`.

## Shared globals

Loaded by `shared/main.lua` on both sides (state is independent per side):

| Global | Content |
|---|---|
| `CreatedJobs` | All jobs keyed by name. |
| `CreatedGangs` | All gangs keyed by name. |
| `JobInteractions` | Job interactions, keyed by id. |
| `GangInteractions` | Gang interactions, keyed by id. |
| `PublicInteractions` | Public interactions, keyed by id. |

Plus the helpers `ResolveAnim(d)` and `ResolveLimits(d)` — see
[Reference / Interaction types](/reference/interaction-types) for the legacy
storage format they handle.

## Hot reload

There is no hot-reload of Lua — `restart lo_jobscreator` after changing any
Lua. The NUI itself is reloaded automatically each time the resource starts.
