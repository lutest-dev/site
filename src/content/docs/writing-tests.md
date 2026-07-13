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

Inside the test body, stay with plain Luau:

```luau
t.test("returns a user", function()
	local user = makeUser()
	assert(user.name == "Ada")
	assert(user.id ~= nil)
end)
```

That is an important part of the model. Lutest does not ask you to learn a second assertion DSL before you can be productive.

Keep tests next to the modules they cover. That is the intended shape. You do not need a mandatory `*.spec.luau` layout to make the system work.
