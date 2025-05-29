import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {},
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            borderRadius: '{borderRadius.sm}',
            shadow: '{shadow.sm}',
          },
        },
        dark: {
          root: {
            background: '{surface.800}',
          },
        },
      },
    },
    breadcrumb: {
      colorScheme: {
        light: {
          root: {
            background: '{transparent}',
            padding: '{space.0}',
          },
          item: {
            color: '{gray.900}',

            icon: {
              color: '{gray.700}',
            },
          },
          separator: {
            color: '{gray.500}',
          },
        },
        dark: {
          item: {
            color: '{gray.300}',
            icon: {
              color: '{gray.300}',
            },
          },
          separator: {
            color: '{gray.500}',
          },
        },
      },
    },
  },
})

const themeConfig = {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
}

export default themeConfig
