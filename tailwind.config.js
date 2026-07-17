/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Faceplate palette (white & blue)
        faceplate: '#FFFFFF', // page background — white
        panel: '#FFFFFF', // raised panel surfaces
        'panel-2': '#F6F8FB', // controls on panels
        line: '#DCE1EA', // hairlines / borders
        silk: '#1E2530', // ink text
        muted: '#5E6B80', // secondary text — slate blue
        led: '#2258D6', // blue indicator — actions and status
        signal: '#B3363B', // signal red — problems only
        bone: '#F8FAFC', // white piano key chips
        keyblack: '#101828', // black piano key chips
      },
      fontFamily: {
        display: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
};
