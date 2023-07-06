import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from '../context/CurrentUserContext.js'
import api from '../utils/api.js'
import { isLiked } from "../utils/utils.js";

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
  //стейты для карточек, которыq мы перенесли из main
  const [cards, setCards] = useState([])

  // //стейты для лайка
  // const [isLike, setIsLike] = useState
  // const [count, setCount] = useState(likes.length)

  // useEffect(() => {
  //   setIsLike(likes.some())
  // })

  const setAllaStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    // setIsImagePopup(false)
    setSelectedCard(null)
    setIsDeletePopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback((event) => {
    if (event.key === 'Escape') {
      setAllaStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllaStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllaStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllaStatesForClosePopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.removeEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
    //setIsImagePopup(true)
    setEventListenerForDocument()
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true)
    setEventListenerForDocument()
  }

  // function closeAllPopupsByOverlayAndButton(event) {
  //   if (event.target === event.currentTarget) {
  //     closeAllPopups()
  //     document.removeEventListener('keydown', closePopupByEsc)
  //   }
  // }

  useEffect(() => {
    api
      .getDataForInitialPageRendering()
      .then(response => {
        // console.log(response)
        // setUserName(response[0].name)
        // setUserDescription(response[0].about)
        // setUserAvatar(response[0].avatar)
        setCurrentUser(response[0])
        setCards(response[1])
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  )

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (isLiked(card, currentUser)) {
      api.putDislike(card._id)
        .then(newCard => {
          //console.log(response)
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards);
          // setIsLike(false)
          // setCount(response.likes.length)
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.putLike(card._id)
        .then(newCard => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards);
          // setIsLike(true)
          // setCount(response.likes.length)
          // console.log(response)
        })
        .catch((error) => console.error(`Ошибка при добалении лайка ${error}`))
    }
  }





return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page__content">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onDelete={handleDeleteClick}
        cards={cards}
        onCardLike={handleCardLike}
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
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
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
