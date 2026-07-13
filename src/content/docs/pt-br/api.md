---
title: Referência da API
---

A API atual do package do Lutest é intencionalmente pequena.

Aqui está a API inteira em um lugar só:

```luau
local t = require("@lib")

t.test(name, fn)
t.skip(name, fn)
t.only(name, fn)
t.todo(name)
```

## `test(name, fn)`

Registra um teste normal.

## `skip(name, fn)`

Registra um teste que aparece no resultado, mas não é executado.

## `only(name, fn)`

Registra um teste focado.

Se qualquer módulo carregado tiver um `only`, os testes normais são pulados e só os focados rodam.

## `todo(name)`

Registra cobertura planejada sem código executável.

## Assertions

Use o `assert` normal do Luau.

O Lutest não adiciona uma segunda DSL de assertions por cima do Luau agora.
