// Netlify sets URL to the site's primary production URL at build time.
// https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
const siteUrl = process.env.URL

const title = 'MIDI Remapper — Free Online Drum MIDI Converter'
const description =
  'Remap drum MIDI files between General MIDI, GetGood Drums Modern & Massive, and One Kit Wonder note mappings. Free, runs entirely in your browser — files never leave your machine.'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title,

      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          name: 'theme-color',
          content: '#1E2126',
        },
        {
          name: 'google-site-verification',
          content: 'CZUVt9lZVrvrRQtotNlynFOmTvvrasfVi8FEKgYPb_s',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'MIDI Remapper' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        ...(siteUrl ? [{ property: 'og:url', content: siteUrl }] : []),
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],

      link: [
        ...(siteUrl ? [{ rel: 'canonical', href: siteUrl }] : []),
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
        },
      ],

      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'MIDI Remapper',
            ...(siteUrl ? { url: siteUrl } : {}),
            description,
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-umami',
    'nuxt-clarity-analytics',
  ],
  compatibilityDate: '2025-02-10',
})