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
lutest test [paths...] [--runtime lute|roblox]
```

```powershell
lutest todo [paths...] [--runtime lute|roblox]
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

When you pass paths to `lutest test` or `lutest todo`, Lutest uses them as discovery inputs. Without `--runtime`, both commands use `lute`.

When you do not pass paths to `lutest test` or `lutest todo`, Lutest uses roots for the selected runtime from `lutest.toml`, or `.` for the local runtime when no config is present.

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
