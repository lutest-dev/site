---
title: Runtime Roblox
---

O runtime Roblox executa suites do Lutest em uma tarefa de sessão do [Roblox Open Cloud Luau Execution](https://create.roblox.com/docs/cloud/reference/features/luau-execution). Ele prepara um bundle RBXM para o lote selecionado, envia-o, executa uma tarefa remota e reporta o resultado agregado localmente.

## Pré-requisitos

- Instale a CLI do Lutest.
- Instale [Lune](https://lune-org.github.io/docs) e deixe `lune` disponível no `PATH`. O Lutest o usa para criar o bundle RBXM temporário.
- Crie ou escolha uma place Roblox para testes remotos. Uma place de testes dedicada é recomendada.
- Crie uma chave Open Cloud com acesso de leitura e escrita às sessões de execução Luau dessa place.
- Instale a biblioteca do Lutest no jogo pelo fluxo de packages do projeto, no mesmo caminho que os módulos de teste exigem.

## Configure o projeto

Adicione uma seção de discovery Roblox e a universe e place alvo ao `lutest.toml`:

```toml
[discovery]
ignore = ["vendor", "luau_packages", ".git"]
gitignore = true

[discovery.roblox]
require = "ReplicatedStorage.Packages.lutest"
roots = ["game"]

[roblox]
universe_id = 123456
place_id = 123456
version_id = 123456 # opcional
poll_interval_seconds = 2 # opcional; padrão 2
timeout_seconds = 300 # opcional; padrão e máximo 300
rojo_project = "default.project.json" # opcional
```

`discovery.roblox.require` é relativo a `game` e precisa corresponder ao caminho usado pelos módulos de teste. O harness sobrepõe esse módulo e as dependências do Lutest com a cópia embutida pela CLI durante a tarefa de sessão; ele não altera a place publicada nem substitui o fluxo normal de packages.

`roots` controla o discovery e o conteúdo do bundle. Mantenha-o focado na árvore de fontes Roblox para não enviar arquivos não relacionados.

### Preserve os caminhos de instância do Rojo

Defina `roblox.rojo_project` quando os caminhos do filesystem não corresponderem às instâncias produzidas pelo Rojo. O Lutest gera um sourcemap absoluto do Rojo, mapeia os arquivos descobertos para seus caminhos de instância e inclui fontes Luau mapeadas necessárias ao bundle. O caminho do projeto é relativo ao arquivo de configuração.

Essa opção exige o comando `rojo` no `PATH`. Defina `LUTEST_ROJO_BIN` somente quando o executável tiver outro nome ou localização. Um projeto inválido ou uma falha ao gerar o sourcemap é reportado como erro de configuração.

Inspecione o resultado antes de uma execução remota:

```powershell
lutest debug bundle game
```

A árvore impressa identifica instâncias `ModuleScript`, `Script` e `LocalScript` e marca as suites descobertas. Nada é enviado.

## Defina a chave de API

Defina `ROBLOX_OPEN_CLOUD_API_KEY` para a sessão atual do PowerShell:

```powershell
$env:ROBLOX_OPEN_CLOUD_API_KEY = "your-open-cloud-api-key"
lutest test game --runtime roblox
```

Como alternativa, crie um `.env` na raiz do projeto:

```dotenv
ROBLOX_OPEN_CLOUD_API_KEY=your-open-cloud-api-key
```

O ambiente do processo tem precedência sobre `.env`. Não coloque a chave em `lutest.toml` nem faça commit do `.env`. Em CI, guarde-a como segredo e exponha-a como `ROBLOX_OPEN_CLOUD_API_KEY`.

## Escreva e rode uma suite

Use o caminho configurado da biblioteca em um módulo dentro de `discovery.roblox.roots`:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.Packages.lutest)

local function add(left: number, right: number): number
	return left + right
end

t.test('should add numbers', function()
	assert(add(2, 3) == 5)
end)
```

Rode todas as suites Roblox descobertas:

```powershell
lutest test --runtime roblox
```

Ou restrinja o discovery a um caminho:

```powershell
lutest test game/shared --runtime roblox
```

Use o mesmo runtime para reportar todos:

```powershell
lutest todo game --runtime roblox
```

O discovery reconhece `game.ReplicatedStorage...` e aliases locais criados com `game:GetService`. Um caminho selecionado restringe o discovery, mas o arquivo ainda precisa de um require estático de `discovery.roblox.require` para ser uma suite.

O discovery interpreta a sintaxe Luau em vez de procurar texto bruto no código, então requires dentro de comentários ou strings não são tratados como suites. Links simbólicos legíveis para arquivos dentro de uma raiz configurada são seguidos e também podem ser mapeados por um sourcemap do Rojo.

## Modelo de execução remota

O runtime é do lado do servidor. Um módulo orientado ao cliente pode ser testado quando contém apenas lógica unitária compatível com o ambiente, mas código que exige APIs exclusivas de cliente, como `LocalPlayer`, falha ao carregar ou ao testar remotamente.

O Lutest continua depois que uma suite individual falha ao carregar e retorna essa falha junto dos resultados das demais suites. Se a tarefa Open Cloud falhar, for cancelada ou expirar, a CLI reporta os logs da tarefa como erro de runtime e sai com status `1`.
