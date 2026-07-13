---
title: API Reference
---

The current Lutest package API is intentionally small.

Here is the full surface in one place:

```luau
local t = require("@lib")

t.test(name, fn)
t.skip(name, fn)
t.only(name, fn)
t.todo(name)
```

## `test(name, fn)`

Registers a normal test.

## `skip(name, fn)`

Registers a test that is shown in results but not executed.

## `only(name, fn)`

Registers a focused test.

If any loaded module contains an `only`, normal tests are skipped and only focused tests run.

## `todo(name)`

Registers planned coverage without executable code.

## Assertions

Use normal Luau `assert`.

Lutest does not add a second assertion DSL on top of Luau right now.
