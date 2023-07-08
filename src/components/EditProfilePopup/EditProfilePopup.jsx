import { useContext, useEffect } from "react";
import useValidationForForm from "../../utils/useValidationForForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";


export default function EditProfilePopup({ isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext)
  //доработать сброс формы и красную линию при ошибке isInputValid reset
  const {values, errors, isValid, handleChange, setValue } = useValidationForForm()

  useEffect(() => {
    setValue("profilename", currentUser.name)
    setValue("profilestatus", currentUser.about)
  },[currentUser, setValue])

  return (
    <PopupWithForm
      name="popupFormEdit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      isValid = {isValid}
    >
      <input
        name="profilename"
        type="text"
        // className={`popup__input popup__input_type_name ${isInputValid.profilename === undefined || isInputValid.profilename ? '' : 'popup__input_type_error:invalid'}`}
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        id="profilename"
        minLength={2}
        maxLength={40}
        required=""
        onChange={handleChange}
        // values.profilename не катит тк прилетает undefaind
        value = {values.profilename ? values.profilename : ''}
      />
      <span id="profilename-error" className="popup__error-visible">{errors.profilename}</span> 
      <input
        name="profilestatus"
        type="text"
        className="popup__input popup__input_type_status"
        // className={`popup__input popup__input_type_status ${isInputValid.profilestatus === undefined || isInputValid.profilestatus ? '' : 'popup__input_type_error:invalid'}`}
        placeholder="О себе"
        id="profilestatus"
        minLength={2}
        maxLength={200} 
        required=""
        onChange={handleChange}
        value = {values.profilestatus ? values.profilestatus : ''}
      />
      <span id="profilestatus-error" className="popup__error-visible" >{errors.profilestatus}</span> 
    </PopupWithForm>
  )
}