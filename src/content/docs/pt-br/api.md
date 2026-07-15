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
t.suite(name, register)
t.before_all(fn)
t.before_each(fn)
t.after_each(fn)
t.after_all(fn)
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

## `suite(name, register)`

Registra sob uma suite nomeada os testes declarados em `register`. Um módulo pode conter testes comuns e várias suites, mas suites não podem ser aninhadas.

```luau
t.suite("User service", function()
	t.test("creates a user", function()
		-- ...
	end)
end)
```

## Hooks de ciclo de vida

Hooks devem ser declarados dentro de um callback de `suite`:

```luau
t.suite("User service", function()
	t.before_all(function()
		-- Roda uma vez antes dos testes executáveis desta suite.
	end)

	t.before_each(function()
		-- Roda antes de cada teste executável.
	end)

	t.after_each(function()
		-- Roda depois de cada teste executável, mesmo se ele falhar.
	end)

	t.after_all(function()
		-- Roda uma vez depois dos testes executáveis desta suite.
	end)
end)
```

Uma falha em `before_all` pula os testes executáveis da suite e é reportada como falha de hook. Uma falha em `before_each`, no corpo do teste ou em `after_each` falha aquele teste. Falhas em `after_all` são reportadas separadamente como falhas de hook.

## Assertions

Use o `assert` normal do Luau.

Assertions e tratamento de erros são preocupações opinativas e fragmentadas. O Lutest deliberadamente não acopla uma biblioteca de assertions ao runner nem oferece uma API própria para lidar com isso.

Mantenha essas escolhas no seu projeto: use `assert` puro ou adote as ferramentas de assertions e tratamento de erros que combinarem com seu código. A responsabilidade do Lutest é descobrir testes, executá-los e reportar falhas.
