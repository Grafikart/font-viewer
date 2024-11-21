import { render } from 'preact'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { App } from './app.tsx'

render(<App />, document.getElementById('app')!)
