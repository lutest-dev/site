---
title: Philosophy
---

This page explains the choices, architecture, stability, and direction behind the current model.

Lutest is closer to how tests are commonly written in [Rust](https://rust-lang.org/) projects than to a separate-file test model. Co-located tests are the recommended shape, not a file-layout restriction: you can keep tests in separate modules when that better fits your project.

## Why co-located tests

When tests live next to the code they cover, they are easier to keep in sync with that code.

## Why avoid artificial public APIs

Internal helpers and non-exported behavior should stay testable without adding public APIs only for tests.

## Why use `assert`

Normal Luau `assert` already solves a large part of the problem, but it is not the only valid choice.

Lutest does not couple the runner to a second assertion DSL or a prescribed error-handling API. That is an extension point, not a limitation: use plain `assert`, bring an assertion library, or use the error-handling mechanism that best fits your project. Lutest only needs a test to succeed or fail so it can report the result.

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

## Architecture

Lutest separates the test authoring surface from the runtime that discovers and executes tests. At a high level, discovery finds modules that require the configured Lutest package; the selected runtime loads each module; tests registered during that load become an implicit suite named after the module path; and the core runner executes that suite.

That is why discovered modules can stay normal Luau modules instead of returning explicit suite objects.

## Stability

Lutest is ready for production use, but its public API and configuration are still evolving. Pin releases in reproducible toolchains and review release notes before upgrading, because upgrades can include breaking changes.

The core authoring API, co-located test model, `lutest.toml`, local Lute runtime, Roblox runtime, and reporter are all supported surfaces. Expect the CLI, configuration depth, and runtime coverage to continue evolving.

## Direction

The current focus is on making local and Roblox test runs reliable, clear, and useful in development and CI. The Roblox runtime already uses Open Cloud Luau Execution session tasks; future work can broaden Luau-oriented runtime support without changing the core authoring model.
