---
title: Discovery
---

Discovery answers one question: how does Lutest decide that a file is a test module?

The short answer is that Lutest looks for a dependency on the configured package path.

This matters:

```luau
local t = require("@lib")
```

This does not:

```text
user_service.spec.luau
```

That is the heart of the rule.

The `require(...)` call matters. The filename does not.

You can still keep filename conventions in your own project if you like them. They just are not the main contract.

If you are coming from `lute`'s built-in test runner, this is the biggest difference to keep in mind. `lute` discovers `.test.luau` and `.spec.luau` files. Lutest instead discovers ordinary modules that depend on the configured Lutest package path.
