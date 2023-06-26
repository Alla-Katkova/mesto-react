import { useEffect, useState } from "react"
import api from "../../utils/api.js"
import Card from "../Card/Card.jsx"
import editButtonSvg from "../../images/edit-button.svg"
import addButtonSvg from "../../images/img-plus.svg"
export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    api
      .getDataForInitialPageRendering()
      .then(response => {
        // console.log(response)
        setUserName(response[0].name)
        setUserDescription(response[0].about)
        setUserAvatar(response[0].avatar)
        setCards(response[1])
      })
      .catch((err) => {
        console.log(err);
      })
  }, []
  )

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__intro-container">
          <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}>
            <img src={userAvatar} className="profile__avatar" alt="аватарка профиля" />
          </button>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                aria-label="edit"
                className="profile__button-edit"
                onClick={onEditProfile}
              >
                <img
                  src={editButtonSvg}
                  className="profile__img-edit"
                  alt="кнопка редактирования профиля"
                />
              </button>
            </div>
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button type="button" aria-label="add" className="profile__button-add" onClick={onAddPlace}>
          <img
            src={addButtonSvg}
            className="profile__img-add"
            alt="кнопка добавления"
          />
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <article className="element" key={card._id}>
              <Card cardData={card} onCardClick={onCardClick} />
            </article>
          )
        }

        )}
      </section>
    </main>
  )
}