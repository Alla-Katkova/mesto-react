export default function Card({ cardData, onCardClick }) {
  return (
    <div>
      {/* <article className="element"> */}

      <img className="element__photo"
        src={cardData.link}
        alt={`Фотография ${cardData.name}`}
        onClick={() => onCardClick({ link: cardData.link, name: cardData.name })}
      />
      <button type="button" className="element__delete-button" />
      <div className="element__description">
        {/*  <pre>{JSON.stringify(cardData, null, 2)}</pre> */}
        <h2 className="element__caption">{cardData.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like-button" />
          <span className="element__counter">{cardData.likes.length}</span>
        </div>
      </div>
      {/* </article> */}
    </div>
  )
}