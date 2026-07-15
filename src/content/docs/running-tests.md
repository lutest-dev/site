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

## Inspect discovery first

Use `--dry-run` to print the test plan without loading any modules or executing tests:

```powershell
lutest test src --dry-run
```

This is useful when changing `roots`, `ignore`, or a package path. The command prints the discovered files and exits with failure when the plan is empty.

You can use the same option with `todo` and with the Roblox runtime:

```powershell
lutest todo game --runtime roblox --dry-run
```

## Validate the environment

Run `doctor` before a local or CI run when setup is in doubt:

```powershell
lutest doctor
```

It validates the configuration for every configured runtime. For Roblox, it also checks the API key and the generated bundle prerequisite without contacting the remote execution service.

## Read the result

The reporter keeps successful output to one summary line:

<div class="terminal-output" aria-label="Successful Lutest run"><span class="terminal-success">+ 3 tests passed</span></div>

When a run includes skipped or todo tests, those states remain visible:

<div class="terminal-output" aria-label="Lutest run with skipped and todo tests"><span class="terminal-success">+ 2 tests passed</span>  <span class="terminal-warning">! 1 skipped</span>  <span class="terminal-todo">1 todo</span></div>

Failures show the summary first, then the failing test and its module path:

<div class="terminal-output" aria-label="Failed Lutest run"><span class="terminal-failure">x 1 of 3 tests failed</span>

<span class="terminal-accent">&gt; adds an item</span>
  <span class="terminal-muted">src/inventory.luau:14</span>
  expected inventory to contain potion</div>

If discovery finds nothing, Lutest exits with a failure status and prints:

<div class="terminal-output" aria-label="No test files found"><span class="terminal-failure">x No test files found</span>

<span class="terminal-warning">! Add a test file or update discovery.roots in lutest.toml.</span></div>

The reporter shows no per-file details for a passing run. When a test or lifecycle hook fails, it adds its name, module path, and error details below the summary.
