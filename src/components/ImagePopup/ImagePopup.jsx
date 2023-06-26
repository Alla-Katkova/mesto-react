export default function ImagePopup({ cardData, isOpen, onClose }) {

  return (
    <>
      {
        cardData && 
        <section className={`popup popup-zoom ${isOpen && 'popup_opened'}`} >
          <div className="popup__container-zoom">
            <button
              type="button"
              aria-label="close"
              className="popup__close-button popup__close-button-zoom"
              onClick={onClose}
            />
            <img src={cardData.link} className="popup__images-zoom" alt="большая картинка" />
            <h3 className="popup__caption-zoom">{cardData.name}</h3>
          </div>
        </section>
      }
    </>
  )
}