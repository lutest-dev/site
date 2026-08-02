---
title: Releases e novidades
---

As releases do Lutest são publicadas no [GitHub Releases](https://github.com/lutest-dev/lutest/releases). Fixe a CLI e a biblioteca Roblox na mesma tag e leia as notas abaixo antes de atualizar.

## 0.7.1

Release de correção posterior à `0.7.0`:

- Suites Roblox colocadas junto do código ficam isoladas de consumidores que as exigem primeiro.
- Links simbólicos legíveis para arquivos entram no discovery e nos bundles Roblox.
- Mapeamentos opcionais de projetos Rojo são aceitos por `roblox.rojo_project`.

## 0.7.0

Esta release trouxe os principais recursos de inspeção e segurança do runtime:

- `lutest debug bundle` imprime a árvore de instâncias Roblox gerada sem enviar nem executar testes.
- `t.is_running()` informa se o código está em uma sessão ativa do Lutest.
- Declarações de teste ficam inertes fora da coleta, então exigir um módulo de testes pelo código da aplicação não registra testes.
- Suites descobertas vazias geram um aviso em vez de parecerem silenciosamente bem-sucedidas.
- O discovery de suites Roblox usa a sintaxe Luau e preserva erros de carregamento e tracebacks.
- A ajuda da CLI é agrupada por execução, projeto e opções compartilhadas.
- GitHub Releases agora incluem o asset de biblioteca Roblox `Lib.rbxm`.

## 0.6.1

- Corrigido o entrypoint do package Wally, preservando a API pública da biblioteca.

## 0.6.0

- Removido o comando obsoleto `install-package`.
- A biblioteca de testes Roblox passou a ser publicada como package Wally.
- Adicionados diagnósticos explícitos de configuração e discovery, incluindo erros de sintaxe e raízes ausentes.
- Adicionadas linhas de progresso Roblox estáveis e versionadas para logs de CI.

Para o histórico completo, consulte o [CHANGELOG.md upstream](https://github.com/lutest-dev/lutest/blob/main/CHANGELOG.md).
