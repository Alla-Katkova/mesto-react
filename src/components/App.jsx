import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
    setIsImagePopup(true)

  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setSelectedCard(null)

  }

  return (
    <div className="page__content">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="popupFormEdit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          id="profilename"
          name="profilename"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span id="profilename-error" className="popup__error-visible" />
        <input
          type="text"
          className="popup__input popup__input_type_status"
          placeholder="О себе"
          id="profilestatus"
          name="profilestatus"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span id="profilestatus-error" className="popup__error-visible" />
      </PopupWithForm>

      <PopupWithForm
        name="popupFormAdd"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        />
        <span id="place-name-card-error" className="popup__error-visible" />
        <input
          type="url"
          className="popup__input popup__input_type_photo-link"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span id="link-error" className="popup__error-visible" />
      </PopupWithForm>

      <PopupWithForm
        name="popupAvatarEdit"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >

        <input
          type="url"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span id="avatar-error" className="popup__error-visible" />
      </PopupWithForm>

      <PopupWithForm
        name="popupConfirmationDelete"
        title="Вы уверены?"
        buttonTitle="Да"
      >
      </PopupWithForm>

      <ImagePopup
        cardData={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      />
    </div>

  );
}

export default App;
