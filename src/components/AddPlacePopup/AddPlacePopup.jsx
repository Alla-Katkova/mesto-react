import useValidationForForm from "../../utils/useValidationForForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  //доработать сброс формы и красную линию при ошибке isInputValid reset
  const { values, errors, isValid, handleChange } = useValidationForForm()

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ namePlace: values.namePlace, link: values.link })
  }

  return (
    <PopupWithForm
      name="popupFormAdd"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        className="popup__input popup__input_type_place-name"
        name="namePlace"
        id="place-name-card"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={values.namePlace ? values.namePlace : ''}
        onChange={handleChange}
      />
      <span id="place-name-card-error" className="popup__error-visible">{errors.namePlace}</span>
      <input
        type="url"
        className="popup__input popup__input_type_photo-link"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required=""
        value={values.link ? values.link : ''}
        onChange={handleChange}
      />
      <span id="link-error" className="popup__error-visible">{errors.link}</span>
    </PopupWithForm>
  )
}