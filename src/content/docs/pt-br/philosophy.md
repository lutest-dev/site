---
title: Filosofia
---

Esta página explica as escolhas, a arquitetura, a estabilidade e a direção por trás do modelo atual.

O Lutest fica mais próximo de como testes costumam ser escritos em projetos [Rust](https://rust-lang.org/) do que de um modelo baseado em arquivos de teste separados. Testes co-located são o formato recomendado, não uma restrição de layout: você pode manter testes em módulos separados quando isso combinar melhor com seu projeto.

## Por que testes co-located

Quando os testes vivem ao lado do código que cobrem, fica mais fácil mantê-los em sincronia com esse código.

## Por que evitar APIs públicas artificiais

Helpers internos e comportamento não exportado devem continuar testáveis sem exigir APIs públicas criadas só para teste.

## Por que usar `assert`

O `assert` normal do Luau já resolve uma parte grande do problema, mas não é a única escolha válida.

O Lutest não acopla o runner a uma segunda DSL de assertions nem a uma API prescrita de tratamento de erros. Isso é um ponto de extensão, não uma limitação: use `assert` puro, traga uma biblioteca de assertions ou use o mecanismo de tratamento de erros que melhor servir ao seu projeto. O Lutest só precisa que um teste passe ou falhe para reportar o resultado.

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

## Arquitetura

O Lutest separa a superfície de escrita de testes do runtime que descobre e executa os testes. Em alto nível, o discovery encontra módulos que exigem o package configurado do Lutest; o runtime selecionado carrega cada módulo; os testes registrados durante esse carregamento se tornam uma suite implícita nomeada pelo caminho do módulo; e o runner central executa essa suite.

É por isso que módulos descobertos podem continuar sendo módulos Luau normais, em vez de retornar objetos de suite explícitos.

## Estabilidade

O Lutest está pronto para uso em produção, mas sua API pública e configuração ainda evoluem. Fixe releases em toolchains reproduzíveis e revise as notas da release antes de atualizar, porque upgrades podem incluir mudanças incompatíveis.

A API central de escrita, o modelo co-located, `lutest.toml`, o runtime local Lute, o runtime Roblox e o reporter são superfícies suportadas. Espere evolução na CLI, na profundidade da configuração e na cobertura de runtimes.

## Direção

O foco atual é tornar execuções locais e Roblox confiáveis, claras e úteis no desenvolvimento e em CI. O runtime Roblox já usa tarefas de sessão do Open Cloud Luau Execution; trabalhos futuros podem ampliar o suporte a runtimes voltados a Luau sem mudar o modelo central de escrita.
