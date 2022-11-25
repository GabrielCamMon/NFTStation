const Card = ({ urlImage, title = false, details, price, action = false }) => {
  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div
          className="card__picture card__picture--1"
          style={{ backgroundImage: `url(${urlImage})` }}
        >
          &nbsp;
        </div>
        {title && (
          <h4 className="card__heading">
            <span className="card__heading-span card__heading-span--1">
              {title}
            </span>
          </h4>
        )}
        <div className="card__details">
          <ul>
            {details.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card__side card__side--back card__side--back-1">
        <div className="card__cta">
          <div className="card__price-box">
            <p className="card__price-only">Only</p>
            <p className="card__price-value">ETH {price}</p>
          </div>
          {console.log(action)}
          {action && (
            <a href="#" className="btn btn--white" onClick={action}>
              Bid Now!
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
