---
title: Primeiro Teste
---

Esta página faz uma coisa só: colocar um teste para rodar.

Comece com um `lutest.toml` mínimo:

```toml
[discovery]
require = "@lib"
roots = ["."]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true
```

Agora crie um módulo que registra um teste:

```luau
local t = require("@lib")

t.test("adds numbers", function()
	assert(1 + 2 == 3)
end)
```

Isso já é um módulo de teste válido.

Ele pode exportar qualquer valor, ou nada. O Lutest não exige que um módulo retorne um objeto de suite.

Rode assim:

```powershell
lutest test
```

Se você quiser limitar a execução a alguns lugares, passe os paths explicitamente:

```powershell
lutest test src
```

Até aqui, a ideia importante é simples: o Lutest procura módulos que dependem do package path configurado, carrega esses módulos e transforma cada módulo descoberto em uma suite implícita.
