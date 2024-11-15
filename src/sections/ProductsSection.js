
import React,{ useState} from 'react';
import PlanCard from '../components/PlanCard';
import planData from '../utils/planData';

const ProductsSection = () => {
  return (
    <section className="products-section">
      {planData.map((plan, index) => (
        <PlanCard
          key={index}
          title={plan.title}
          description={plan.description}
          price={plan.price}
          onAcquire={plan.onAcquire}
        />
      ))}
    </section>
  );
};

//Seccion tarjetas//

const CardSection = () => {
  const cardsData = new Array (20).fill(null).map((_, index) =>({
    id:index,
    image: `https://via.placeholder.com/150?text=Imagen+${index + 1}`,
    description: `Descripción de la tarjeta ${index + 1}`,
    price: `$${(index + 1) * 10}`,
    liked: false,
  }));

  const handleLike = (id) => {
    setCardsData(prevState =>
      prevState.map(card =>
        card.id === id ? {...card, liked: !card.liked}: card
      )
    );
  };

  const [cardsDataState, setCardsData] = useState(cardsData);

  return (
    <section className='card-section'>
      <div className='card-grid'>
        {cardsDataState.map(card => (
          <div className='card' key={card.id}>
            <div className='card-image-container'>
              <img src={card.image} alt={`Card ${card.id}`} className="card-image" />
              <button
                className={`like-button ${card.liked ? 'liked' : ''}`}
                onClick={() => handleLike(card.id)}
              >
                ❤️
              </button>
            </div>
            <div className='card-details'>
              <p className='card-description'>{card.description}</p>
              <p className='card-price'>{card.price}</p>
            </div>
            </div>
        ))}
      </div>
    </section>
  );
};

export {ProductsSection, CardSection};
