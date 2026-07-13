---
title: Running Tests
---

Once you have a test module, running it is straightforward.

With `test` and no paths, Lutest uses the `roots` from `lutest.toml`:

```powershell
lutest test
```

If you want to run only one path, pass it directly:

```powershell
lutest test src
```

## Roblox runtime

Run Roblox-dependent suites against the configured place with:

```powershell
lutest test game --runtime roblox
```

Roblox discovery only selects files with a static require of `discovery.roblox.require`. Both a direct path and a `game:GetService` alias are supported:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.Packages.lutest)
```

A path passed on the command line narrows discovery, but does not bypass this requirement.

Lutest bundles every `.luau` file under `discovery.roblox.roots` together with the CLI's copy of its test library, sends one RBXM binary input, and executes one Luau session task per command. Projects normally keep Lutest installed in the place for development and editor support. Inside the session task, the harness temporarily overlays that library at `discovery.roblox.require` with the bundled CLI version. The bundled code may require modules already present in the target place, but Lutest does not rewrite user imports.

Set `ROBLOX_OPEN_CLOUD_API_KEY` in the environment or `.env` before running the command. In CI, use an API-key secret and a fixed `roblox.version_id`.

See [Roblox Runtime](./roblox-runtime/) for a complete setup guide, including API-key configuration and remote execution behavior.

You can also pass more than one path:

```powershell
lutest test src packages
```

That is the current shape of the test command. You pass paths in, and Lutest runs the test modules it discovers there.

If discovery finds nothing, Lutest exits with a failure status and prints:

```text
no test modules found
```

When tests do run, output is grouped by module path. You will see totals for passed, failed, skipped, and `todo` tests, plus per-test error messages when something fails.
