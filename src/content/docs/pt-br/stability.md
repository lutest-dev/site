---
title: Estabilidade
---

O Lutest ainda está cedo.

Você deve tratar a API atual como usável, mas não estável.

Esse é o principal ponto para manter em mente ao ler o resto da documentação. O modelo já existe. Algumas bordas ainda estão mudando.

## O que já parece sólido

- testes co-located
- o package do Lutest como API de testes
- `lutest.toml` como arquivo principal de configuração
- `lute` como runtime que você pode usar hoje

## O que ainda pode mudar

- formato da CLI
- saída do reporter
- profundidade de configuração
- cobertura de runtimes além de `lute`

Breaking changes ainda são aceitáveis nesta fase.
