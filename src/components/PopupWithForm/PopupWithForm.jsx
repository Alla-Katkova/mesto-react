export default function PopupWithForm({name, title, buttonTitle, children, isOpen, onClose, onSubmit}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}  >
      <div className="popup__container" onClick={(event) => event.stopPropagation}>
        <button type="button" aria-label="close" className="popup__close-button" onClick={onClose} />
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" name="popupFormEdit" noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" aria-label="save" className="popup__save-button popup__save-button_invalid" disabled="" >
            {buttonTitle || "Сохранить"} </button>
        </form>
      </div>
    </section>
  )
}
