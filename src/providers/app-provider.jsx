import {
  SliderModalProvider
} from '../hooks'

export function AppProvider({ children }) {
  return [SliderModalProvider].reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  )
}
