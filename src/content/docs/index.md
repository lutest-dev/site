---
title: Lutest
description: A test runner for Luau projects, built around co-located test authoring.
---

Lutest is a test runner for Luau projects.

Its job is simple: let you keep tests close to the code they cover without turning every module into a special testing shape.

Here is the smallest useful example:

```luau
local t = require("@lib")

local function sum(a, b)
	return a + b
end

t.test("should sum two numbers", function()
	assert(sum(1, 2) == 3)
end)

return {
	sum = sum,
}
```

And a run for that module can look like this:

```text
$ lutest test .

OK  1 total  1 pass  0 fail  0 skip  0 todo
```

When you run Lutest, that module is discovered, loaded, and treated as one suite.

That leads to three practical differences:

- tests can live next to normal modules
- modules do not need to return suite objects
- internal helpers can stay testable without artificial public APIs

If you have used `lute`'s built-in test runner before, the biggest shift is discovery. Lutest is not built around `*.test.luau` or `*.spec.luau` as the main contract.

## Start here

1. Go to [Installation](./installation/).
2. Follow [First Test](./first-test/).
3. Continue to [Running Tests](./running-tests/).
