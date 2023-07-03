export default function Card({ cardData, onCardClick, onDelete }) {
  return (
    <div>
      {/* <article className="element"> */}

      <img className="element__photo"
        src={cardData.link}
        alt={`Фотография ${cardData.name}`}
        onClick={() => onCardClick(cardData)}
      />
      {/* {cardData.myid === cardData.owner._id && <button type="button" className="element__delete-button" onClick={onDelete}/>} условие для урны на мои фото*/ }
      <button type="button" className="element__delete-button" onClick={onDelete}/>
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