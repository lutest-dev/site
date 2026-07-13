// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://lutest-dev.github.io',
	base: '/site',
	integrations: [
		starlight({
			title: 'Lutest',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cayasde/lutest' }],
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				'pt-br': {
					label: 'Português (Brasil)',
					lang: 'pt-BR',
				},
			},
			sidebar: [
				{
					label: 'Getting Started',
					translations: {
						'pt-BR': 'Primeiros Passos',
					},
					items: [
						{
							label: 'Installation',
							translations: {
								'pt-BR': 'Instalação',
							},
							slug: 'installation',
						},
						{
							label: 'First Test',
							translations: {
								'pt-BR': 'Primeiro Teste',
							},
							slug: 'first-test',
						},
						{
							label: 'Running Tests',
							translations: {
								'pt-BR': 'Rodando Testes',
							},
							slug: 'running-tests',
						},
					],
				},
				{
					label: 'Guides',
					translations: {
						'pt-BR': 'Guias',
					},
					items: [
						{
							label: 'Writing Tests',
							translations: {
								'pt-BR': 'Escrevendo Testes',
							},
							slug: 'writing-tests',
						},
						{
							label: 'Discovery',
							translations: {
								'pt-BR': 'Discovery',
							},
							slug: 'discovery',
						},
						{
							label: 'Configuration',
							translations: {
								'pt-BR': 'Configuração',
							},
							slug: 'configuration',
						},
						{
							label: 'Roblox Runtime',
							slug: 'roblox-runtime',
						},
						{
							label: 'Concepts',
							translations: {
								'pt-BR': 'Conceitos',
							},
							slug: 'concepts',
						},
					],
				},
				{
					label: 'Reference',
					translations: {
						'pt-BR': 'Referência',
					},
					items: [
						{
							label: 'API Reference',
							translations: {
								'pt-BR': 'Referência da API',
							},
							slug: 'api',
						},
						{
							label: 'CLI Reference',
							translations: {
								'pt-BR': 'Referência da CLI',
							},
							slug: 'cli-reference',
						},
					],
				},
				{
					label: 'Project',
					translations: {
						'pt-BR': 'Projeto',
					},
					items: [
						{
							label: 'Architecture',
							translations: {
								'pt-BR': 'Arquitetura',
							},
							slug: 'architecture',
						},
						{
							label: 'Philosophy',
							translations: {
								'pt-BR': 'Filosofia',
							},
							slug: 'philosophy',
						},
						{
							label: 'Roadmap',
							translations: {
								'pt-BR': 'Roadmap',
							},
							slug: 'roadmap',
						},
						{
							label: 'Stability',
							translations: {
								'pt-BR': 'Estabilidade',
							},
							slug: 'stability',
						},
					],
				},
			],
		}),
	],
});
