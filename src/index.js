// packages/ui-library/src/index.js

import { h, init } from 'snabbdom'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { attributesModule } from 'snabbdom/modules/attributes'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { styleModule } from 'snabbdom/modules/style'

// Initialize Snabbdom
const patch = init([
  classModule,
  propsModule,
  attributesModule,
  eventListenersModule,
  styleModule,
])

// State
let state = {
  count: 0,
}

// Lifecycle hooks
let onMountCallback = null
let onUpdateCallback = null

function onMount(callback) {
  onMountCallback = callback
}

function onUpdate(callback) {
  onUpdateCallback = callback
}

function updateState(newState) {
  state = { ...state, ...newState }
  if (onUpdateCallback) onUpdateCallback(state)
  render()
}

// Template function
function view() {
  return h('div', { class: { container: true } }, [
    h('h1', state.count),
    h('button', { on: { click: increment } }, 'Add'),
  ])
}

function increment() {
  updateState({ count: state.count + 1 })
}

function render() {
  const newVNode = view()
  patch(document.getElementById('app'), newVNode)
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  render()
  if (onMountCallback) onMountCallback(state)
})

export { updateState, onMount, onUpdate }
