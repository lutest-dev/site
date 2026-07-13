---
title: Lutest
description: Um test runner para projetos Luau, construído em torno de testes co-located.
---

Lutest é um test runner para projetos Luau.

O trabalho dele é simples: deixar os testes perto do código que cobrem sem obrigar cada módulo a virar uma forma especial só para teste.

Este é o menor exemplo útil:

```luau
local t = require("@lib")

local function sum(a, b)
	return a + b
end

t.test("should sum two numbers", function()
	assert(sum(1, 2) == 3)
end)

return {
	sum = sum,
}
```

E uma execução desse módulo pode parecer assim:

```text
$ lutest test .

OK  1 total  1 pass  0 fail  0 skip  0 todo
```

Quando você roda o Lutest, esse módulo é descoberto, carregado e tratado como uma suite.

Isso leva a três diferenças práticas:

- testes podem viver ao lado de módulos normais
- módulos não precisam retornar objetos de suite
- helpers internos podem continuar testáveis sem APIs públicas artificiais

Se você já usou o test runner embutido do `lute`, a maior mudança está no discovery. O Lutest não gira em torno de `*.test.luau` ou `*.spec.luau` como contrato principal.

## Comece aqui

1. Vá para [Instalação](./installation/).
2. Siga [Primeiro Teste](./first-test/).
3. Continue em [Rodando Testes](./running-tests/).
