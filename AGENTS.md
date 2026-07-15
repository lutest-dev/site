# Lutest documentation source

The `lutest/` directory is a Git submodule tracking the upstream Lutest repository (`https://github.com/lutest-dev/lutest.git`).

When documentation needs to be refreshed, update the submodule deliberately and commit its new reference:

```sh
git submodule update --remote lutest
git add lutest
git commit -m "chore: update lutest submodule"
```
