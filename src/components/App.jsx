import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState, useEffect } from "react";
import CurrentUserContext from '../context/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { isLiked } from "../utils/utils.js";


function App() {
  // стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)

  // стейты для context
  const [currentUser, setCurrentUser] = useState({})
  // стейт для карточек
  const [cards, setCards] = useState([])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
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
    setIsImagePopup(true)
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
  useEffect(() => {
    api
      .getInitialCards()
      .then(response => {
        // console.log(response)
        // setUserName(response[0].name)
        // setUserDescription(response[0].about)
        // setUserAvatar(response[0].avatar)
        setCards(response)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  )


  function handleCardLike(card) {
    if (isLiked(card, currentUser)) {
      api.putDislike(card._id)
        // Обновляем стейт
        .then(newCard => {
          setCards((cardsOld) => cardsOld.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.putLike(card._id)
        .then(newCard => {
          // Обновляем стейт
          setCards((cardsOld) => cardsOld.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => console.error(`Ошибка при добалении лайка ${error}`))
    }
  }
  function handleCardDelete(card) {
    api.deleteCardFromDB(card._id)
      .then(newCard => {
        const newCards = cards.filter((c) => c._id !== card._id && c)
        // Обновляем стейт
        setCards(newCards);
      })

      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
  }

  //api для данных юзера на главной странице
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
  //api для данных юзера в попапе
  function handleUpdateUser(dataUser) {
    //console.log(profilename, profilestatus)
    api.editUserInfoInDb(dataUser.profilename, dataUser.profilestatus)
      .then(response => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
  }

  //api для обновления аватарки в попапе
  function handleUpdateAvatar(linkToAvatar) {
    // console.log(linkToAvatar)
    api.editAvaratInDB(linkToAvatar.avatar)
      .then(response => {
        setCurrentUser(response)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при редактировании аватара ${error}`))
  }

  function handleAddPlaceSubmit(dataCard) {
    //console.log(dataCard)
    api.addNewCardToServer(dataCard.namePlace, dataCard.link)
      .then(response => {
        setCards([response, ...cards])
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при добавлении карточки ${error}`))
  }

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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}

        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
          isOpen={isImagePopup}
          // isOpen={handleCardClick}
          //selectedcard = true !setselectedcard false = null
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
