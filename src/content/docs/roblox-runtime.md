---
title: Roblox Runtime
---

The Roblox runtime runs Lutest suites in a [Roblox Open Cloud Luau Execution](https://create.roblox.com/docs/cloud/reference/features/luau-execution) session task. It prepares one RBXM bundle for the selected test batch, uploads it, runs one remote task, and reports the aggregated result locally.

## Prerequisites

- Install the Lutest CLI.
- Install [Lune](https://lune-org.github.io/docs) and make `lune` available on `PATH`. Lutest uses it to create the temporary RBXM bundle.
- Create or choose a Roblox place for remote tests. A dedicated test place is recommended.
- Create a Roblox Open Cloud API key with read and write access to Luau execution sessions for that place.
- Install the Lutest library in the game through the project's normal package workflow, at the same path that test modules require. This keeps game code and editor tooling able to resolve the library during ordinary development.

## Configure the project

Add a Roblox discovery section and the target universe and place to `lutest.toml`:

```toml
[discovery]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true

[discovery.roblox]
require = "ReplicatedStorage.Packages.lutest"
roots = ["game"]

[roblox]
universe_id = 123456
place_id = 123456
version_id = 123456 # optional
poll_interval_seconds = 2 # optional; defaults to 2
timeout_seconds = 300 # optional; defaults to and cannot exceed 300
```

`discovery.roblox.require` is relative to `game`. It must match the path used by test modules. The harness overlays this module and its Lutest dependencies with the CLI's bundled copy inside the session task; it does not change the published place or replace the project's normal package workflow.

`roots` controls both discovery and bundle contents. Keep it focused on the Roblox source tree to avoid sending unrelated project files.

## Set the API key

Set `ROBLOX_OPEN_CLOUD_API_KEY` for the current PowerShell session:

```powershell
$env:ROBLOX_OPEN_CLOUD_API_KEY = "your-open-cloud-api-key"
lutest test game --runtime roblox
```

Alternatively, create a `.env` file in the project root:

```dotenv
ROBLOX_OPEN_CLOUD_API_KEY=your-open-cloud-api-key
```

The process environment takes precedence over `.env`. Keep the API key out of `lutest.toml` and do not commit the `.env` file. In CI, store it as a secret and expose it as `ROBLOX_OPEN_CLOUD_API_KEY`.

## Write and run a suite

Use the configured library path in a module under `discovery.roblox.roots`:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.Packages.lutest)

local function add(left: number, right: number): number
	return left + right
end

t.test('should add numbers', function()
	assert(add(2, 3) == 5)
end)

return {
	add = add,
}
```

Run every discovered Roblox suite:

```powershell
lutest test --runtime roblox
```

Or narrow discovery to a path:

```powershell
lutest test game/shared --runtime roblox
```

Use the same runtime for todo reporting:

```powershell
lutest todo game --runtime roblox
```

Discovery recognizes either `game.ReplicatedStorage...` or a local alias created with `game:GetService`. A selected path narrows discovery, but a file still needs a static require of `discovery.roblox.require` to be treated as a suite.

## Remote execution model

The runtime is server-side. A client-oriented module can be tested when it only contains environment-compatible unit logic, but code that requires client-only APIs such as `LocalPlayer` will fail as a remote load or test failure.

Lutest continues after an individual suite fails to load and returns that failure with the remaining suite results. If the Open Cloud task itself fails, is cancelled, or times out, the CLI reports the task logs as a runtime error and exits with status `1`.
