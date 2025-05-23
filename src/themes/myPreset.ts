import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
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

export default MyPreset
