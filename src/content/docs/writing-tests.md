---
title: Writing Tests
---

Write tests through the Lutest package. In the examples here, its import path is `@lib`.

Start with the whole surface:

```luau
local t = require("@lib")

t.test("adds values", function()
	assert(1 + 2 == 3)
end)

t.skip("not ready yet", function()
	assert(false)
end)

t.only("focused test", function()
	assert(true)
end)

t.todo("cover edge cases")
```

Each call does one job:

- `test` registers a normal test
- `skip` registers a test that is reported but not run
- `only` focuses the run when present
- `todo` records planned coverage without code

## Group related tests with a suite

Use `suite` to give a group of related tests a name and lifecycle hooks:

```luau
t.suite("Inventory", function()
	local inventory

	t.before_each(function()
		inventory = newInventory()
	end)

	t.test("adds an item", function()
		inventory:add("potion")
		assert(inventory:has("potion"))
	end)
end)
```

Tests in a suite are reported as `Inventory > adds an item`. Suites cannot be nested, and hooks can only be registered inside the `suite` callback.

Use `before_all` and `after_all` for setup and cleanup shared by the suite. Use `before_each` and `after_each` around each runnable test. Multiple hooks run in registration order for `before_*` and reverse registration order for `after_*`.

## Focus and registration

If a loaded module contains `t.only`, Lutest runs only focused tests in that module. Use it temporarily while working on a test, then remove it before committing.

Tests are collected while a discovered module is loading. Calling the configured Lutest package outside that runtime load is safe, but it does not register a test.

Inside the test body, stay with plain Luau:

```luau
t.test("returns a user", function()
	local user = makeUser()
	assert(user.name == "Ada")
	assert(user.id ~= nil)
end)
```

That is an important part of the model. Lutest does not require a second assertion DSL, but it does not prevent one either: use plain `assert` or bring the assertion and error-handling approach that fits your project.

Keep tests next to the modules they cover. That is the intended shape. You do not need a mandatory `*.spec.luau` layout to make the system work.
