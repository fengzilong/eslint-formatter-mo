import { createFormatter } from './formatter.js'

const theme = process.env.MO_THEME ?? 'one-dark-pro'

export default createFormatter(theme)