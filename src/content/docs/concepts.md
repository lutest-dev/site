---
title: Concepts
---

By this point you have already seen most of the model in action.

This page just gives names to the parts that matter while you use Lutest.

## Test module

A test module is an ordinary Luau module that registers tests through the configured Lutest package.

## Implicit suite

Each discovered module becomes one implicit suite.

The suite name comes from the module path. You do not need to repeat it in code.

## Explicit suite

`t.suite(name, function() ... end)` groups related tests within a module. It gives their output a readable scope such as `Inventory > adds an item` and is the only place lifecycle hooks can be declared. Explicit suites cannot be nested.

## Lifecycle hooks

`before_all` and `after_all` run once around a suite's runnable tests. `before_each` and `after_each` run around every runnable test. Hooks give related tests shared setup and cleanup without making module-level state part of the test contract.

## Focused run

If any loaded module contains an `only` test, only focused tests run.

That focus applies to the whole loaded set, not just to one file.

## Registration outside the runtime

If the configured Lutest package is called outside an active runtime load, it does not crash. Registration becomes a no-op instead.
