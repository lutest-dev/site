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

Você também pode passar mais de um path:

```powershell
lutest test src packages
```

Esse é o formato atual do comando de teste. Você passa os paths, e o Lutest roda os módulos de teste que encontrar ali.

Se o discovery não encontrar nada, o Lutest sai com status de falha e imprime:

```text
no test modules found
```

Quando os testes rodam, a saída é agrupada pelo path do módulo. Você vai ver totais de testes passados, falhos, pulados e `todo`, além das mensagens de erro por teste quando algo falhar.
