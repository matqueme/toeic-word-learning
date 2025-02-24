# Nuxt Minimal Starter

This is an minimal starter template for [Nuxt 3](https://nuxt.com).

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

> Vite5 Vue3 JavaScript Starter Template requires Node >= 18.00

## Features

- 📦 [Nuxt 3](https://github.com/nuxt/nuxt) - Intuitive Vue Framework
- ⚡️ [Vite 5](https://github.com/vitejs/vite) - Born with fastness
- 🖖 [Vue 3](https://github.com/vuejs/core) - Composition API and `<script setup>`
- 🚦 [Vue Router](https://github.com/vuejs/router) - The official router for Vue.js
- 🔥 [TypeScript](https://github.com/microsoft/TypeScript) - Strongly typed programming language that builds on JavaScript
- 🔍 [@nuxt/image](https://github.com/nuxt/image) - Optimized images for Nuxt
- 🤖 [@nuxtjs/robots](https://github.com/nuxt-modules/robots) - Robots.txt module for Nuxt
- 🗺️ [@nuxtjs/sitemap](https://github.com/nuxt-modules/sitemap) - Sitemap module for Nuxt
- 📈 [nuxt-gtag](https://github.com/johannschopplich/nuxt-gtag) - Google Analytics module for Nuxt
- 📚 [nuxt-schema-org](https://github.com/harlan-zw/nuxt-schema-org) - Schema.org integration for Nuxt
- 🖼️ [nuxt-svgo](https://github.com/cpsoinos/nuxt-svgo) - SVGO module for Nuxt
- 🎨 [nuxt-phosphor-icons](https://github.com/oyedejioyewole/nuxt-phosphor-icons) - Phosphor icons for Nuxt
- 🌈 [tailwindcss](https://github.com/tailwindlabs/tailwindcss) - Utility-first CSS framework
- 🌍 [@nuxtjs/i18n](https://github.com/nuxt-modules/i18n) - Internationalization module for Nuxt
- 🛠️ [@pinia/nuxt](https://github.com/posva/pinia) - The intuitive store for Vue.js
- 📄 [Vercel](https://vercel.com) - Server déployement easy

## Coding Style

- Use Composition API with [`<script setup lang="ts">` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## Development Tools

- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [Visual Stuido Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Find and fix problems in your JavaScript code
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - An opinionated code formatter

### Start the development server

```bash
#Install dependencies
pnpm install

# Start the development server
pnpm dev

# Start the development server for all devices
pnpm dev:host
```

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Checklist

- [ ] Update `package.json` with your project details
- [ ] Remove the example content from `README.md`
- [ ] Create a .env file with the environment variables (BASE_URL)
- [ ] Update the `LICENSE` file with your project license
- [ ] Set up Google Analytics id in `nuxt.config.ts`
- [ ] Add SEO metadata in `nuxt.config.ts`
- [ ] Update the `schema.org` object in `nuxt.config.ts` with your site information
- [ ] Add the favicon in the `public` directory
- [ ] Add the vercel secrets in github repository settings
- [ ] Uncomment the `vercel-prod.yml` file in the `.github/workflows` directory
