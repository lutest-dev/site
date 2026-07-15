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

## Agrupe testes relacionados com uma suite

Use `suite` para dar um nome a um grupo de testes relacionados e usar hooks de ciclo de vida:

```luau
t.suite("Inventory", function()
	local inventory

	t.before_each(function()
		inventory = newInventory()
	end)

	t.test("adds an item", function()
		inventory:add("potion")
		assert(inventory:has("potion"))
	end)
end)
```

Os testes de uma suite aparecem como `Inventory > adds an item`. Suites não podem ser aninhadas, e hooks só podem ser registrados dentro do callback de `suite`.

Use `before_all` e `after_all` para setup e cleanup compartilhados pela suite. Use `before_each` e `after_each` ao redor de cada teste executável. Vários hooks rodam na ordem de registro para `before_*` e na ordem inversa para `after_*`.

## Foco e registro

Se um módulo carregado contiver `t.only`, o Lutest executa somente os testes focados desse módulo. Use-o temporariamente enquanto trabalha em um teste e remova-o antes de fazer o commit.

Os testes são coletados enquanto um módulo descoberto está carregando. Chamar o package configurado do Lutest fora desse carregamento é seguro, mas não registra um teste.

Dentro da função de teste, fique com Luau normal:

```luau
t.test("returns a user", function()
	local user = makeUser()
	assert(user.name == "Ada")
	assert(user.id ~= nil)
end)
```

Esse é um ponto importante do modelo. O Lutest não exige uma segunda DSL de assertions, mas também não impede uma: use `assert` puro ou traga a abordagem de assertions e tratamento de erros que fizer sentido para o seu projeto.

Mantenha os testes perto dos módulos que eles cobrem. Essa é a forma pretendida. Você não precisa de um layout obrigatório com `*.spec.luau` para fazer o sistema funcionar.
