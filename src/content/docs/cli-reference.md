---
title: CLI Reference
---

The current CLI is compact.

## Usage

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

The option also accepts `--config=<path>`. An explicit path must exist; otherwise the command fails instead of falling back to defaults. Discovery roots from an explicit configuration file are resolved relative to that file's directory.

## Dry-run plans

Pass `--dry-run` to `test` or `todo` to inspect the files discovery would select without loading modules, executing tests, or starting a Roblox session:

```powershell
lutest test game --runtime roblox --dry-run
```

The plan prints the resolved runtime, optional configuration path, and every discovered file. It exits with `0` when at least one file is found and `1` when discovery is empty.

## Doctor

`lutest doctor` checks whether the local environment is ready without running tests. It reports the loaded configuration and validates configured runtimes.

For Lute, it checks that `[discovery.lute]` has both `require` and `roots`, and reports missing literal roots. For Roblox, it additionally checks `universe_id`, `place_id`, the Open Cloud API key, and whether Lutest can prepare its Roblox bundle. The command exits with `0` only when every configured runtime is ready.

## Setup

`lutest setup` interactively creates an initial `lutest.toml`. It never overwrites an existing configuration and does not create a `.env` file or write API keys.

## Roblox progress in CI

When Roblox output is not attached to a TTY, Lutest prints stable, versioned progress lines such as `lutest(roblox)@0.6.0 [1/5] preparing bundle`. This makes CI logs easier to identify and parse.

## Exit behavior

- exits with `0` when all discovered tests pass
- exits with `1` when discovery finds nothing
- exits with `1` when any test fails
- exits with `1` when a Roblox remote execution cannot complete
