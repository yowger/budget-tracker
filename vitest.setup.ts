import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Message from 'primevue/message'
import Form from '@primevue/forms'

config.global.plugins.push(PrimeVue)

config.global.components = {
  ...config.global.components,
  Button,
  Checkbox,
  Message,
  Form,
}
