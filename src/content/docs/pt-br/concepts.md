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

## Execução focada

Se qualquer módulo carregado tiver um teste `only`, só os testes focados rodam.

Esse foco vale para todo o conjunto carregado, não só para um arquivo.

## Registro fora do runtime

Se o package configurado do Lutest for chamado fora de um load ativo do runtime, ele não explode. O registro vira no-op.
