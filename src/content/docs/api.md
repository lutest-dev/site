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
t.suite(name, register)
t.before_all(fn)
t.before_each(fn)
t.after_each(fn)
t.after_all(fn)
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

## `suite(name, register)`

Registers the tests declared in `register` under a named suite. A module can contain ordinary tests and multiple suites, but suites cannot be nested.

```luau
t.suite("User service", function()
	t.test("creates a user", function()
		-- ...
	end)
end)
```

## Lifecycle hooks

Hooks must be declared inside a `suite` callback:

```luau
t.suite("User service", function()
	t.before_all(function()
		-- Runs once before this suite's runnable tests.
	end)

	t.before_each(function()
		-- Runs before every runnable test.
	end)

	t.after_each(function()
		-- Runs after every runnable test, even when it fails.
	end)

	t.after_all(function()
		-- Runs once after this suite's runnable tests.
	end)
end)
```

`before_all` failure skips the suite's runnable tests and is reported as a hook failure. A `before_each`, test body, or `after_each` failure fails that test. `after_all` failures are reported separately as hook failures.

## Assertions

Use normal Luau `assert`.

Assertions and error handling are opinionated and fragmented concerns. Lutest deliberately does not couple an assertion library to the runner or offer its own API for handling them.

Keep those choices in your project: use plain `assert`, or adopt the assertion and error-handling tools that fit your codebase. Lutest's responsibility is to discover tests, run them, and report failures.
