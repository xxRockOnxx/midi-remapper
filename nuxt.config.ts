// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Free Online MIDI Remapper',

      meta: [
        {
          name: 'description',
          content: 'A free online tool to remap MIDI notes.',
        },
        {
          name: 'google-site-verification',
          content: 'CZUVt9lZVrvrRQtotNlynFOmTvvrasfVi8FEKgYPb_s',
        }
      ]
    },
  },

  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', 'nuxt-umami'],
  compatibilityDate: '2025-02-10',
})
