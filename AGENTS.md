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

## Documentation discoverability

Every user-facing documentation page that is created or materially updated must be reachable from the configured sidebar or through an explicit link from a page that is reachable from the sidebar. Do not add or update orphan pages that users cannot discover through the site navigation.

Before completing a documentation task, compare the pages in `src/content/docs/` with the sidebar configuration and internal documentation links. Add useful pages to the navigation, link them from an appropriate navigable page, or remove them when they are obsolete or duplicate current content. Keep a page unlisted only when the product explicitly requires it, and document that reason in the page or site configuration.
