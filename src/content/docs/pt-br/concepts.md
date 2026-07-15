---
title: Conceitos
---

Até aqui você já viu a maior parte do modelo em ação.

Esta página só dá nome às peças que importam no uso do Lutest.

## Test module

Um módulo de teste é um módulo Luau normal que registra testes pelo package configurado do Lutest.

## Suite implícita

Cada módulo descoberto vira uma suite implícita.

O nome da suite vem do path do módulo. Você não precisa repetir isso no código.

## Suite explícita

`t.suite(name, function() ... end)` agrupa testes relacionados dentro de um módulo. Ela dá à saída um escopo legível como `Inventory > adds an item` e é o único lugar onde hooks de ciclo de vida podem ser declarados. Suites explícitas não podem ser aninhadas.

## Hooks de ciclo de vida

`before_all` e `after_all` rodam uma vez ao redor dos testes executáveis de uma suite. `before_each` e `after_each` rodam ao redor de cada teste executável. Hooks oferecem setup e cleanup compartilhados para testes relacionados sem tornar o estado no nível do módulo parte do contrato de teste.

## Execução focada

Se qualquer módulo carregado tiver um teste `only`, só os testes focados rodam.

Esse foco vale para todo o conjunto carregado, não só para um arquivo.

## Registro fora do runtime

Se o package configurado do Lutest for chamado fora de um load ativo do runtime, ele não explode. O registro vira no-op.
