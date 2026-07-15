---
title: Referência da CLI
---

A CLI atual é compacta.

## Uso

```powershell
lutest install-package [--output <parent-directory>]
```

```powershell
lutest setup
```

```powershell
lutest test [paths...] [--runtime lute|roblox] [--config <path>] [--dry-run]
```

```powershell
lutest todo [paths...] [--runtime lute|roblox] [--config <path>] [--dry-run]
```

```powershell
lutest doctor [--config <path>]
```

## Versão

```powershell
lutest version
```

## Ajuda

```powershell
lutest help
```

## Paths

Quando você passa paths para `lutest test` ou `lutest todo`, o Lutest usa esses paths como entrada de discovery. Sem `--runtime`, a CLI usa `lute` quando ele está configurado; ela usa `roblox` apenas quando Roblox é o único runtime configurado.

Quando você não passa paths para `lutest test` ou `lutest todo`, o Lutest usa os `roots` do runtime selecionado em `lutest.toml`, ou `.` para o runtime local quando não existe configuração.

## Caminho da configuração

Passe `--config <path>` para `test`, `todo` ou `doctor` quando a configuração não for o `lutest.toml` do diretório atual:

```powershell
lutest test --config configs/roblox.toml --runtime roblox
```

A opção também aceita `--config=<path>`. Um caminho explícito precisa existir; caso contrário o comando falha em vez de recorrer aos padrões.

## Planos dry-run

Passe `--dry-run` para `test` ou `todo` para inspecionar os arquivos que o discovery selecionaria sem carregar módulos, executar testes ou iniciar uma sessão Roblox:

```powershell
lutest test game --runtime roblox --dry-run
```

O plano imprime o runtime resolvido, o caminho opcional da configuração e todos os arquivos descobertos. Ele sai com `0` quando encontra pelo menos um arquivo e com `1` quando o discovery está vazio.

## Doctor

`lutest doctor` verifica se o ambiente local está pronto sem rodar testes. Ele mostra a configuração carregada e valida os runtimes configurados.

Para Lute, ele verifica se `[discovery.lute]` tem `require` e `roots`. Para Roblox, ele também verifica `universe_id`, `place_id`, a chave Open Cloud e se o Lutest consegue preparar seu bundle Roblox. O comando só sai com `0` quando todos os runtimes configurados estão prontos.

## Setup

`lutest setup` cria interativamente um `lutest.toml` inicial. Ele nunca sobrescreve uma configuração existente, não cria um `.env` e não grava chaves de API.

## Instalar o package Roblox

`lutest install-package` cria um diretório-fonte `lutest/` pronto para Roblox, com `init.luau` e módulos internos. Mova o diretório para a árvore de fontes do jogo; os imports internos usam caminhos `script` do Roblox para que o Luau LSP consiga seguir o package.

Use `--output <parent-directory>` para escolher onde o comando cria `lutest/`. O diretório pai pode existir, mas o comando nunca sobrescreve um diretório `lutest/` existente.

```powershell
lutest install-package --output src/ReplicatedStorage
```

Depois que o diretório estiver representado no jogo em `ReplicatedStorage`, exija-o normalmente:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.lutest)
```

## Comportamento de saída

- sai com `0` quando todos os testes descobertos passam
- sai com `1` quando o discovery não encontra nada
- sai com `1` quando qualquer teste falha
- sai com `1` quando uma execução remota Roblox não consegue ser concluída
