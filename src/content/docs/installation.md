---
title: Installation
---

You can install Lutest with a toolchain manager.

## mise

Add Lutest to your local `mise.toml`:

```toml
[tools]
"github:lutest-dev/lutest" = "latest"
```

Then install the tool:

```sh
mise install
```

After that, you can run:

```sh
lutest help
```

## Rokit

If you use Rokit, add Lutest with:

```sh
rokit add lutest-dev/lutest
```

Then verify the install:

```sh
lutest help
```

## Notes

Lutest is currently distributed through GitHub Releases.

If you want a reproducible setup, pin a specific version in your toolchain config instead of using the latest release.

## Loom

Today, if you want to use Lutest inside a `lute` project, the practical path is Loom.

This part is not optional.

Installing the Lutest CLI through a toolchain manager gives you the command-line tool, but your project still needs the Lutest package dependency.

That package is what the CLI uses to identify test modules during discovery.

Use Loom to install the package used by the local Lute runtime.

Create a `loom.config.luau` in your project root:

```luau
return {
	package = {
		name = "my-project",
		version = "0.4.0",
		dependencies = {
			lutest = {
				name = "lutest",
				rev = "v0.6.0",
				sourceKind = "github",
				source = "https://github.com/lutest-dev/lutest",
			},
		},
	},
}
```

Then install it with:

```sh
lute pkg install
```

That creates `loom.lock.luau` and installs the dependency into `Packages/`.

Without that package dependency in the project, Lutest has no configured test library path to look for, so your test modules will not be discovered the intended way.

When you want to move to a newer release later, update `rev` to the new tag and run `lute pkg install` again.

## Roblox with Wally

For Roblox projects, install the test library through Wally. Add it to your `wally.toml`:

```toml
[dependencies]
Lutest = "cayasde/lutest@0.6.0"
```

Then install the dependencies:

```sh
wally install
```

Place the generated package where your Roblox project can sync it into the game, and set `discovery.roblox.require` to its path relative to `game`.
