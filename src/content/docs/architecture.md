---
title: Architecture
---

You do not need this page to start using Lutest.

It exists to explain why the user-facing model looks the way it does.

Lutest separates the test authoring surface from the runtime that discovers and executes tests.

Today, the active runtime is `lute`.

At a high level, the flow is:

1. discovery finds ordinary modules that depend on the configured Lutest package path
2. the runtime loads one module
3. tests registered during that load are collected for that module
4. the runtime builds one implicit suite from the module path and the collected tests
5. that suite runs through the core runner

That is why discovered modules can stay normal modules instead of returning explicit suite objects.
