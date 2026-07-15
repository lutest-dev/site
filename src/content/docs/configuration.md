---
title: Configuration
---

Lutest reads `lutest.toml` from the project root.

Pass `--config <path>` to `lutest test`, `lutest todo`, or `lutest doctor` to load a different configuration file. The explicit file must exist; Lutest does not fall back to the default configuration in that case. Its discovery roots are resolved relative to the explicit configuration file's directory.

Runtime-specific discovery keeps local and Roblox test trees separate:

```toml
[discovery]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true

[discovery.lute]
require = "@lib"
roots = ["."]

[discovery.roblox]
require = "ReplicatedStorage.Packages.lutest"
roots = ["src"]

[roblox]
universe_id = 123456
place_id = 123456
version_id = 123456 # optional, recommended in CI
```

Most projects only need to care about three keys.

`discovery.lute.require` tells the local runtime which package path marks a module as test-bearing.

`discovery.roblox.require` is the dotted path relative to `game` that test modules use to require Lutest. Roblox projects normally install that library in the place through their package workflow so game code and the editor can resolve it. During a remote run, the harness overlays the CLI's bundled library at that path for the lifetime of the session task.

`roots` tells Lutest where to start when you run `lutest test` with no explicit paths.

`ignore` prunes paths you never want discovery to scan.

`gitignore` is the switch that decides whether `.gitignore` should also be respected.

When no configuration file exists, the local Lute runtime defaults to `require = "@lib"`, `roots = ["."]`, an empty ignore list, and `gitignore = true`. Configure `[discovery.lute]` explicitly once your project needs a different package path or search root.

Here is the practical way to think about those settings:

- change a runtime's `require` when the project uses a different Lutest import path
- change a runtime's `roots` when you do not want that runtime to scan the whole repository
- change `ignore` when you have generated code, vendor code, or large directories that should always be skipped

For Roblox runs, set `ROBLOX_OPEN_CLOUD_API_KEY` in the process environment or in the project's `.env`. The process environment takes precedence. Do not put the key in `lutest.toml`.

The API key needs the Luau execution session read and write scopes for the configured place. Use a dedicated test place and prefer `version_id` in CI.
