import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState, useEffect } from "react";
import CurrentUserContext from '../context/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";



function App() {
  // стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  //const [isImagePopup, setIsImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  // стейты для context
  const [currentUser, setCurrentUser] = useState({})

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    // setIsImagePopup(false)
    setSelectedCard(null)
    setIsDeletePopupOpen(false)
  }

//доработать, чтобы работало по esc
  // const setAllaStatesForClosePopups = useCallback(() => {
  //   setIsEditProfilePopupOpen(false)
  //   setIsEditAvatarPopupOpen(false)
  //   setIsAddPlacePopupOpen(false)
  //   // setIsImagePopup(false)
  //   setSelectedCard(null)
  //   setIsDeletePopupOpen(false)
  // }, [])

  // const closePopupByEsc = useCallback((event) => {
  //   if (event.key === 'Escape') {
  //     setAllaStatesForClosePopups()
  //     document.removeEventListener('keydown', closePopupByEsc)
  //   }
  // }, [setAllaStatesForClosePopups])

  // const closeAllPopups = useCallback(() => {
  //   setAllaStatesForClosePopups()
  //   document.removeEventListener('keydown', closePopupByEsc)
  // }, [setAllaStatesForClosePopups, closePopupByEsc])

  // function setEventListenerForDocument() {
  //   document.removeEventListener('keydown', closePopupByEsc)
  // }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    //setEventListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    //setEventListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
   // setEventListenerForDocument()
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
    //setIsImagePopup(true)
    //setEventListenerForDocument()
  }

  // function handleDeleteClick(cardId) {
  //   setDeleteCardId(cardId)
  //   setIsDeletePopupOpen(true)
  //   setEventListenerForDocument()
  // }


  // function closeAllPopupsByOverlayAndButton(event) {
  //   if (event.target === event.currentTarget) {
  //     closeAllPopups()
  //     document.removeEventListener('keydown', closePopupByEsc)
  //   }
  // }

  //api для данных юзера
  useEffect(() => {
    api
      .getUserDetailsFromDataBase()
      .then(response => {
        //console.log(response)
        // setUserName(response[0].name)
        // setUserDescription(response[0].about)
        // setUserAvatar(response[0].avatar)
        setCurrentUser(response)
        //setCards(response[1])
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  )

  // function handleDeleteSubmitButtonInPopup(event) {
  //   event.preventDefault()
  //   api.deleteCardFromDB(deleteCardId)
  //   .then(response => {
  //     closeAllPopups()
  //   })
  //   .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        // onDelete={handleDeleteClick}


        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

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
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        //onSubmit={handleDeleteSubmitButtonInPopup}
        >
        </PopupWithForm>

        <ImagePopup
          cardData={selectedCard}
          //isOpen={isImagePopup}
          isOpen={handleCardClick}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
