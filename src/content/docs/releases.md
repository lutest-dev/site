---
title: Releases and What's New
---

Lutest releases are published on [GitHub Releases](https://github.com/lutest-dev/lutest/releases). Pin the CLI and the Roblox library to the same tag, then review the notes below before upgrading.

## 0.7.1

Patch release released after `0.7.0`:

- Co-located Roblox suites are isolated from consumers that require them first.
- Readable file symbolic links are included in Roblox discovery and bundles.
- Optional Rojo project mappings are supported through `roblox.rojo_project`.

## 0.7.0

This release added the main inspection and runtime-safety features:

- `lutest debug bundle` prints the generated Roblox instance tree without uploading or running tests.
- `t.is_running()` reports whether code is executing in an active Lutest session.
- Test declarations are inert outside collection, so requiring a test-bearing module from application code does not register tests.
- Empty discovered suites produce a warning instead of silently looking successful.
- Roblox suite discovery uses Luau syntax, preserving load errors and tracebacks.
- CLI help is grouped by run, project, and shared options.
- GitHub Releases now include a `Lib.rbxm` Roblox library asset.

## 0.6.1

- Fixed the Wally package entrypoint while preserving the public library API.

## 0.6.0

- Removed the deprecated `install-package` command.
- Published the Roblox test library as a Wally package.
- Added explicit configuration and discovery diagnostics, including syntax errors and missing roots.
- Added stable, versioned Roblox progress lines for CI output.

For the complete change history, see the upstream [CHANGELOG.md](https://github.com/lutest-dev/lutest/blob/main/CHANGELOG.md).
