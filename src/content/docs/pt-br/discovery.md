---
title: Discovery
---

Discovery responde uma pergunta: como o Lutest decide que um arquivo é um módulo de teste?

A resposta curta é que o Lutest procura uma dependência no package path configurado.

Isto importa:

```luau
local t = require("@lib")
```

Isto não:

```text
user_service.spec.luau
```

Esse é o centro da regra.

O que importa é a chamada `require(...)`. O nome do arquivo não importa.

Você ainda pode manter convenções de nome dentro do seu projeto, se quiser. Elas só não são o contrato principal.

Se você vem do test runner embutido do `lute`, essa é a principal diferença. O `lute` descobre arquivos `.test.luau` e `.spec.luau`. O Lutest, em vez disso, descobre módulos normais que dependem do package path configurado do Lutest.
