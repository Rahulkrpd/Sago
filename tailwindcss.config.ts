// tailwind.config.ts
import type { Config } from 'tailwindcss'
// import { defineConfig } from 'tailwindcss'  // optional helper for type inference

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            // custom colors, fonts, etc.
        },
    },
    plugins: [],
    darkMode: 'class', // or 'media'
}

export default (config)  // or: export default config
