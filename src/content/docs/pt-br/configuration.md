---
title: Configuração
---

O Lutest lê `lutest.toml` na raiz do projeto.

A forma atual é:

```toml
[discovery]
require = "@lib"
roots = ["."]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true
```

Na maioria dos projetos, só três chaves importam de verdade.

`require` diz ao Lutest qual package path marca um módulo como portador de testes.

`roots` diz ao Lutest por onde começar quando você roda `lutest test` sem paths explícitos.

`ignore` poda paths que você nunca quer que o discovery escaneie.

`gitignore` é a chave que decide se `.gitignore` também deve ser respeitado.

A forma prática de pensar nessas opções é esta:

- mude `require` quando seu projeto usar outro import path para o package do Lutest
- mude `roots` quando você não quiser que a execução padrão escaneie o repositório inteiro
- mude `ignore` quando houver código gerado, vendor ou diretórios grandes que sempre deveriam ser pulados
