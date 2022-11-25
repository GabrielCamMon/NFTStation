import Card from '../../common/Card'
import dataCard from '../../../pages/Home/dataCards'
const Explore = () => {
  return (
    <section className="section-explore ">
      <div id="section-explore">
        <div className="u-center-text  u-margin-bottom-big">
          <h2 className="heading-secondary">Explore Beatiful NFTs</h2>
        </div>

        <div className="row">
          {dataCard.map((e, i) => (
            <div key={i} className="col-1-of-3">
              <Card
                title={e.title}
                urlImage={e.urlImage}
                price={e.price}
                details={e.details}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Explore
