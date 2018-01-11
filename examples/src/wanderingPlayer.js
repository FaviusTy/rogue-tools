import { fromEvent } from 'most'

const keyup = fromEvent('keyup', document).observe(e => console.log('keyup', e))
