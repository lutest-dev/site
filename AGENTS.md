# Lutest documentation source

The `lutest/` directory is a Git submodule tracking the upstream Lutest repository (`https://github.com/lutest-dev/lutest.git`).

When documentation needs to be refreshed, update the submodule deliberately and commit its new reference:

```sh
git submodule update --remote lutest
git add lutest
git commit -m "chore: update lutest submodule"
```

## Localized documentation

Whenever an English documentation page changes, apply the equivalent change to every available locale in `src/content/docs/` during the same task. Keep translated pages aligned in structure, code examples, CLI behavior, and current feature coverage.
