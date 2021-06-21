import createGlobalState from 'react-create-global-state'

const DEFAULT_CONFIG = {
  isActive: false,
  content: null,
  onClose: () => {}
}

const [useGlobalSliderModal, SliderModalProvider] =
  createGlobalState(DEFAULT_CONFIG)

function useSliderModal() {
  const [config, setConfig] = useGlobalSliderModal()

  function showSliderModal({ content, onClose = DEFAULT_CONFIG.onClose }) {
    const configUpdate = {
      isActive: true,
      content,
      onClose
    }

    setConfig(prevState => ({ ...prevState, ...configUpdate }))
  }

  function hideSliderModal() {
    setConfig(prevState => ({ ...prevState, isActive: false }))
  }

  return {
    showSliderModal,
    hideSliderModal,
    config
  }
}

export { useSliderModal, SliderModalProvider }
