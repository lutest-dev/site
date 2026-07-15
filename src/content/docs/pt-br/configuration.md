---
title: Configuração
---

O Lutest lê `lutest.toml` na raiz do projeto.

Passe `--config <path>` para `lutest test`, `lutest todo` ou `lutest doctor` quando quiser carregar outro arquivo de configuração. O arquivo explícito precisa existir; nesse caso o Lutest não recorre à configuração padrão. As raízes de discovery dele são resolvidas em relação ao diretório do arquivo de configuração explícito.

O discovery específico por runtime mantém separadas as árvores de testes locais e Roblox:

```toml
[discovery]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true

[discovery.lute]
require = "@lib"
roots = ["."]

[discovery.roblox]
require = "ReplicatedStorage.Packages.lutest"
roots = ["src"]

[roblox]
universe_id = 123456
place_id = 123456
version_id = 123456 # opcional, recomendado em CI
```

Na maioria dos projetos, só três chaves importam de verdade.

`discovery.lute.require` diz ao runtime local qual package path marca um módulo como portador de testes.

`discovery.roblox.require` é o caminho pontilhado relativo a `game` que os módulos de teste usam para exigir o Lutest. Projetos Roblox normalmente instalam essa biblioteca na place pelo próprio fluxo de packages, para que o código do jogo e o editor consigam resolvê-la. Durante uma execução remota, o harness sobrepõe a biblioteca embutida pela CLI nesse caminho durante a sessão.

`roots` diz ao Lutest por onde começar quando você roda `lutest test` sem paths explícitos.

`ignore` poda paths que você nunca quer que o discovery escaneie.

`gitignore` é a chave que decide se `.gitignore` também deve ser respeitado.

Quando não existe arquivo de configuração, o runtime Lute local usa `require = "@lib"`, `roots = ["."]`, uma lista `ignore` vazia e `gitignore = true`. Configure `[discovery.lute]` explicitamente quando seu projeto precisar de outro package path ou raiz de busca.

A forma prática de pensar nessas opções é esta:

- mude `require` quando seu projeto usar outro import path para o package do Lutest
- mude `roots` quando você não quiser que a execução padrão escaneie o repositório inteiro
- mude `ignore` quando houver código gerado, vendor ou diretórios grandes que sempre deveriam ser pulados

Em execuções Roblox, defina `ROBLOX_OPEN_CLOUD_API_KEY` no ambiente do processo ou no `.env` do projeto. O ambiente do processo tem precedência. Não coloque a chave em `lutest.toml`.

A chave precisa dos escopos de leitura e escrita de sessões de execução Luau para a place configurada. Use uma place de testes dedicada e prefira `version_id` em CI.
