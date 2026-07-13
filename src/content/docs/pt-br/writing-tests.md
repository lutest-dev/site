---
title: Escrevendo Testes
---

Escreva testes pelo package do Lutest. Nos exemplos daqui, o import path dele é `@lib`.

Comece pela superfície inteira:

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

Cada chamada faz um trabalho:

- `test` registra um teste normal
- `skip` registra um teste reportado, mas não executado
- `only` foca a execução quando aparece
- `todo` registra cobertura planejada sem código

Dentro da função de teste, fique com Luau normal:

```luau
t.test("returns a user", function()
	local user = makeUser()
	assert(user.name == "Ada")
	assert(user.id ~= nil)
end)
```

Esse é um ponto importante do modelo. O Lutest não te obriga a aprender uma segunda DSL de assertions antes de ficar produtivo.

Mantenha os testes perto dos módulos que eles cobrem. Essa é a forma pretendida. Você não precisa de um layout obrigatório com `*.spec.luau` para fazer o sistema funcionar.
