// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://lutest-dev.github.io',
	base: '/site',
	integrations: [
		starlight({
			title: 'Lutest',
			logo: {
				src: './assets/logo.png',
				alt: 'Lutest',
			},
			favicon: '/logo.png?v=2',
			customCss: ['./src/styles/lutest.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/lutest-dev/lutest' }],
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
					label: 'Documentation',
					translations: {
						'pt-BR': 'Documentação',
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
						{
							label: 'Writing Tests',
							translations: {
								'pt-BR': 'Escrevendo Testes',
							},
							slug: 'writing-tests',
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
							label: 'Project Model',
							translations: {
								'pt-BR': 'Modelo do Projeto',
							},
							slug: 'philosophy',
						},
					],
				},
			],
		}),
	],
});
