---
title: Filosofia
---

Esta página explica as escolhas por trás do modelo atual.

O Lutest fica mais próximo de como testes costumam ser escritos em projetos [Rust](https://rust-lang.org/) do que de um modelo baseado em arquivos de teste separados.

## Por que testes co-located

Quando os testes vivem ao lado do código que cobrem, fica mais fácil mantê-los em sincronia com esse código.

## Por que evitar APIs públicas artificiais

Helpers internos e comportamento não exportado devem continuar testáveis sem exigir APIs públicas criadas só para teste.

## Por que usar `assert`

O `assert` normal do Luau já resolve uma parte grande do problema.

O Lutest não tenta substituí-lo cedo por uma segunda DSL de assertions.

## Por que `.spec.luau` não é o contrato principal

Discovery por nome de arquivo tende a empurrar testes para arquivos separados e a moldar o código em torno dessa limitação.

O Lutest, em vez disso, trata um módulo como interessante porque ele depende do package path configurado do Lutest.

## Escopo e non-goals

O Lutest é voltado principalmente a testes unitários.

Ele tenta reduzir o atrito para testar código Luau normal, especialmente quando você quer testes perto da implementação e não quer expor APIs públicas extras só para acesso em teste.

Isso não quer dizer que o Lutest tente virar um framework completo de end-to-end para comportamento guiado pela engine.

Se um trecho de código depende só de um contrato pequeno, muitas vezes um stub já basta. Você não precisa simular a engine inteira só para fornecer um campo como `Player.UserId`.

Mas quando um teste depende fortemente de lifecycle real da engine, eventos, hierarquia ou timing, o custo muda. Nesse ponto você precisa de um runtime real ou de uma simulação próxima o bastante disso.

Manter esse tipo de simulação rapidamente vira manter uma mini engine. Esse não é o objetivo do Lutest.

A opção de runtime Roblox existe para deixar você usar APIs que falhariam sob `lute`, não para prometer cobertura end-to-end completa de gameplay ou de comportamento da engine.

Hoje o suporte de runtime do lado do Roblox é baseado em [Luau Execution Session Tasks](https://create.roblox.com/docs/cloud/reference/features/luau-execution).

Isso significa rodar um script de forma headless dentro do contexto da place, não iniciar uma sessão completa de play.

Então, mesmo quando o Lutest usar execução do lado do Roblox, isso deve ser entendido como "rodar código contra o contexto da place e as APIs da engine disponíveis ali", e não como "simular o jogo inteiro como se o Play tivesse começado".
