---
title: Arquitetura
---

Você não precisa desta página para começar a usar o Lutest.

Ela existe para explicar por que o modelo visível para o usuário tem essa forma.

O Lutest separa a API de testes do runtime que descobre e executa esses testes.

Hoje, o runtime ativo é `lute`.

Em alto nível, o fluxo é este:

1. o discovery encontra módulos normais que dependem do package path configurado do Lutest
2. o runtime carrega um módulo
3. os testes registrados durante esse load são coletados para aquele módulo
4. o runtime monta uma suite implícita a partir do path do módulo e dos testes coletados
5. essa suite roda pelo core runner

É por isso que módulos descobertos podem continuar normais em vez de retornar suites explícitas.
