---
title: Instalação
---

Você pode instalar o Lutest com um toolchain manager.

## mise

Adicione o Lutest no seu `mise.toml` local:

```toml
[tools]
"github:lutest-dev/lutest" = "latest"
```

Depois instale a tool:

```sh
mise install
```

Em seguida, você já pode rodar:

```sh
lutest help
```

## Rokit

Se você usa Rokit, adicione o Lutest com:

```sh
rokit add lutest-dev/lutest
```

Depois confirme a instalação:

```sh
lutest help
```

## Observações

Hoje o Lutest é distribuído por GitHub Releases.

Se você quiser um setup reproduzível, fixe uma versão específica na configuração da sua toolchain em vez de usar a latest release.

## Loom

Hoje, se você quiser usar o Lutest dentro de um projeto `lute`, o caminho prático é o Loom.

Essa parte não é opcional.

Instalar a CLI do Lutest por um toolchain manager te dá a ferramenta de linha de comando, mas o projeto ainda precisa da dependency do package do Lutest.

É esse package que a CLI usa para identificar módulos de teste durante o discovery.

Use o Loom para instalar o package usado pelo runtime Lute local.

Crie um `loom.config.luau` na raiz do projeto:

```luau
return {
	package = {
		name = "my-project",
		version = "0.4.0",
		dependencies = {
			lutest = {
				name = "lutest",
				rev = "v0.6.0",
				sourceKind = "github",
				source = "https://github.com/lutest-dev/lutest",
			},
		},
	},
}
```

Depois instale com:

```sh
lute pkg install
```

Isso gera `loom.lock.luau` e instala a dependency em `Packages/`.

Sem essa dependency do package dentro do projeto, o Lutest não tem o path configurado da test library para procurar, então seus módulos de teste não vão ser descobertos da forma pretendida.

Quando você quiser ir para uma release mais nova, troque `rev` para a nova tag e rode `lute pkg install` de novo.

## Roblox com Wally

Para projetos Roblox, instale a biblioteca de testes pelo Wally. Adicione-a ao seu `wally.toml`:

```toml
[dependencies]
Lutest = "cayasde/lutest@0.6.0"
```

Depois instale as dependências:

```sh
wally install
```

Coloque o package gerado em uma localização que seu projeto Roblox sincronize para o jogo e defina `discovery.roblox.require` com o caminho dele relativo a `game`.
