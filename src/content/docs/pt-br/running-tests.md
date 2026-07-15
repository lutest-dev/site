---
title: Rodando Testes
---

Depois que existe um módulo de teste, rodar fica simples.

Com `test` e sem paths, o Lutest usa os `roots` de `lutest.toml`:

```powershell
lutest test
```

Se você quiser rodar só um path, passe esse path:

```powershell
lutest test src
```

## Runtime Roblox

Rode suites que dependem de Roblox contra a place configurada:

```powershell
lutest test game --runtime roblox
```

O discovery Roblox seleciona apenas arquivos com um require estático de `discovery.roblox.require`. Tanto um caminho direto quanto um alias criado com `game:GetService` são aceitos:

```luau
local ReplicatedStorage = game:GetService 'ReplicatedStorage'
local t = require(ReplicatedStorage.Packages.lutest)
```

Um path na linha de comando restringe o discovery, mas não ignora esse requisito. Veja [Runtime Roblox](./roblox-runtime/) para o setup completo.

O Lutest reúne todos os arquivos `.luau` abaixo de `discovery.roblox.roots` com a cópia da biblioteca de testes embutida pela CLI, envia uma entrada binária RBXM e executa uma tarefa de sessão Luau por comando. Projetos normalmente mantêm o Lutest instalado na place para desenvolvimento e suporte do editor. Dentro da tarefa, o harness sobrepõe temporariamente essa biblioteca em `discovery.roblox.require` com a versão embutida pela CLI. O código embutido pode exigir módulos que já existem na place, mas o Lutest não reescreve imports de usuários.

Defina `ROBLOX_OPEN_CLOUD_API_KEY` no ambiente ou no `.env` antes de rodar o comando. Em CI, use um segredo de chave de API e um `roblox.version_id` fixo.

Você também pode passar mais de um path:

```powershell
lutest test src packages
```

Esse é o formato atual do comando de teste. Você passa os paths, e o Lutest roda os módulos de teste que encontrar ali.

## Inspecione o discovery primeiro

Use `--dry-run` para imprimir o plano de testes sem carregar módulos nem executar testes:

```powershell
lutest test src --dry-run
```

Isso é útil ao alterar `roots`, `ignore` ou um package path. O comando imprime os arquivos descobertos e falha quando o plano está vazio.

Você pode usar a mesma opção com `todo` e com o runtime Roblox:

```powershell
lutest todo game --runtime roblox --dry-run
```

## Valide o ambiente

Rode `doctor` antes de uma execução local ou de CI quando houver dúvida sobre o setup:

```powershell
lutest doctor
```

Ele valida a configuração de todos os runtimes configurados. Para Roblox, também verifica a chave de API e o pré-requisito do bundle gerado sem contatar o serviço de execução remota.

## Leia o resultado

O reporter mantém a saída de sucesso em uma única linha resumida:

<div class="terminal-output" aria-label="Execução bem-sucedida do Lutest"><span class="terminal-success">+ 3 tests passed</span></div>

Quando há testes pulados ou todo, esses estados continuam visíveis:

<div class="terminal-output" aria-label="Execução do Lutest com testes pulados e todo"><span class="terminal-success">+ 2 tests passed</span>  <span class="terminal-warning">! 1 skipped</span>  <span class="terminal-todo">1 todo</span></div>

Falhas mostram o resumo primeiro e, depois, o teste que falhou e seu caminho de módulo:

<div class="terminal-output" aria-label="Execução com falha do Lutest"><span class="terminal-failure">x 1 of 3 tests failed</span>

<span class="terminal-accent">&gt; adds an item</span>
  <span class="terminal-muted">src/inventory.luau:14</span>
  expected inventory to contain potion</div>

Se o discovery não encontrar nada, o Lutest sai com status de falha e imprime:

<div class="terminal-output" aria-label="Nenhum arquivo de teste encontrado"><span class="terminal-failure">x No test files found</span>

<span class="terminal-warning">! Add a test file or update discovery.roots in lutest.toml.</span></div>

O reporter não mostra detalhes por arquivo em uma execução bem-sucedida. Quando um teste ou hook de ciclo de vida falha, ele adiciona abaixo do resumo o nome, o caminho do módulo e os detalhes do erro.
