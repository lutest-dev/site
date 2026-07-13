---
title: Philosophy
---

This page explains the choices behind the current model.

Lutest is closer to how tests are commonly written in [Rust](https://rust-lang.org/) projects than to a separate-file test model.

## Why co-located tests

When tests live next to the code they cover, they are easier to keep in sync with that code.

## Why avoid artificial public APIs

Internal helpers and non-exported behavior should stay testable without adding public APIs only for tests.

## Why use `assert`

Normal Luau `assert` already solves a large part of the problem.

Lutest does not try to replace it with a second assertion DSL right away.

## Why not make `.spec.luau` the main contract

Filename-based discovery tends to push tests into separate files and shape the code around that limitation.

Lutest instead treats a module as interesting because it depends on the configured Lutest package path.

## Scope and non-goals

Lutest is aimed primarily at unit tests.

It tries to reduce friction around testing normal Luau code, especially when you want tests close to the implementation and do not want to expose extra public APIs only for test access.

That does not mean Lutest tries to become a full end-to-end framework for engine-driven behavior.

If a piece of code only depends on a small contract, a stub is often enough. You do not need to simulate the entire engine just to provide one field such as `Player.UserId`.

But once a test depends heavily on real engine lifecycle, events, hierarchy, or timing, the cost changes. At that point you either need a real runtime or a simulation close enough to one.

Maintaining that kind of simulation quickly turns into maintaining a mini engine. That is not the goal of Lutest.

The Roblox runtime option exists to let you use APIs that would fail under `lute`, not to promise complete gameplay or engine-level end-to-end coverage.

Today Roblox-side runtime support is based on [Luau Execution Session Tasks](https://create.roblox.com/docs/cloud/reference/features/luau-execution).

That means running a script headlessly inside the place context, not starting a full play session.

So even when Lutest uses Roblox-side execution, that should be understood as "run code against place context and engine APIs that are available there", not as "simulate the whole game as if Play had started".
