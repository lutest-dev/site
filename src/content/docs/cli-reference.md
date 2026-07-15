---
title: CLI Reference
---

The current CLI is compact.

## Usage

```powershell
lutest install-package [--output <parent-directory>]
```

```powershell
lutest setup
```

```powershell
lutest test [paths...] [--runtime lute|roblox] [--config <path>] [--dry-run]
```

```powershell
lutest todo [paths...] [--runtime lute|roblox] [--config <path>] [--dry-run]
```

```powershell
lutest doctor [--config <path>]
```

## Version

```powershell
lutest version
```

## Help

```powershell
lutest help
```

## Paths

When you pass paths to `lutest test` or `lutest todo`, Lutest uses them as discovery inputs. Without `--runtime`, the CLI uses `lute` when it is configured; it uses `roblox` only when Roblox is the only configured runtime.

When you do not pass paths to `lutest test` or `lutest todo`, Lutest uses roots for the selected runtime from `lutest.toml`, or `.` for the local runtime when no config is present.

## Configuration path

Pass `--config <path>` to `test`, `todo`, or `doctor` when the configuration is not the `lutest.toml` in the current directory:

```powershell
lutest test --config configs/roblox.toml --runtime roblox
```

The option also accepts `--config=<path>`. An explicit path must exist; otherwise the command fails instead of falling back to defaults.

## Dry-run plans

Pass `--dry-run` to `test` or `todo` to inspect the files discovery would select without loading modules, executing tests, or starting a Roblox session:

```powershell
lutest test game --runtime roblox --dry-run
```

The plan prints the resolved runtime, optional configuration path, and every discovered file. It exits with `0` when at least one file is found and `1` when discovery is empty.

## Doctor

`lutest doctor` checks whether the local environment is ready without running tests. It reports the loaded configuration and validates configured runtimes.

For Lute, it checks that `[discovery.lute]` has both `require` and `roots`. For Roblox, it additionally checks `universe_id`, `place_id`, the Open Cloud API key, and whether Lutest can prepare its Roblox bundle. The command exits with `0` only when every configured runtime is ready.

## Setup

`lutest setup` interactively creates an initial `lutest.toml`. It never overwrites an existing configuration and does not create a `.env` file or write API keys.

## Install Roblox package

`lutest install-package` creates a Roblox-ready `lutest/` source directory containing `init.luau` and its internal modules. Move that directory into the game's source tree; its internal imports use Roblox `script` paths, so Luau LSP can follow the package.

Use `--output <parent-directory>` to choose where the command creates `lutest/`. The parent may already exist; the command never overwrites an existing `lutest/` directory.

```powershell
lutest install-package --output src/ReplicatedStorage
```

After the directory is represented in the game under `ReplicatedStorage`, require it normally:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.lutest)
```

## Exit behavior

- exits with `0` when all discovered tests pass
- exits with `1` when discovery finds nothing
- exits with `1` when any test fails
- exits with `1` when a Roblox remote execution cannot complete
