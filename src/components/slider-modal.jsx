import { useSliderModal } from '../hooks'

import './slider-modal.css'

export function SliderModal() {
  const {
    config: { isActive, content, onClose },
    hideSliderModal
  } = useSliderModal()

  function closeSliderModal() {
    hideSliderModal()
    onClose()
  }

  if (!content || !isActive) return null

  return (
    <div className="slider-modal">
      <div className="slider-modal__container">
        <button
          className="slider-modal__close-button"
          onClick={closeSliderModal}
        />
        <div className="slider-modal__content">{content}</div>
      </div>
    </div>
  )
}
