---
title: First Test
---

This page gets a single test running.

Start with a minimal `lutest.toml`:

```toml
[discovery]
require = "@lib"
roots = ["."]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true
```

Now create a module that registers one test:

```luau
local t = require("@lib")

t.test("adds numbers", function()
	assert(1 + 2 == 3)
end)
```

That is already a valid test module.

It can export anything, or nothing at all. Lutest does not require a module to return a suite object.

Run it like this:

```powershell
lutest test
```

If you want to limit the run to specific locations, pass them explicitly:

```powershell
lutest test src
```

At this point, the important idea is small: Lutest looks for modules that depend on the configured package path, loads them, and turns each discovered module into one implicit suite.
