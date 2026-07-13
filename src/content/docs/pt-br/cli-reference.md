---
title: Referência da CLI
---

A CLI atual é compacta.

## Uso

```powershell
lutest test [paths...]
```

```powershell
lutest todo [paths...]
```

## Version

```powershell
lutest version
```

## Help

```powershell
lutest help
```

## Paths

Quando você passa paths para `lutest test` ou `lutest todo`, o Lutest usa esses paths como entrada de discovery.

Quando você não passa paths para `lutest test` ou `lutest todo`, o Lutest usa os `roots` de `lutest.toml`, ou `.` quando não existe config.

## Comportamento de saída

- sai com `0` quando todos os testes descobertos passam
- sai com `1` quando o discovery não encontra nada
- sai com `1` quando qualquer teste falha
