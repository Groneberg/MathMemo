import './Card.css'

import { useState } from 'react';

function Card({number, isMatched, activeLimit, index, onCardClick}) {

    const [isActive, setIsActive] = useState(false);
    // if (isMatched) {
    //     console.log('This card is matched ', isMatched , ' index ', index);
    // }
    
    
    const handleClick = () => {
        // console.log('Active Cards: ', activeLimit);
        
        if (!isActive && activeLimit >= 2 || isMatched) {
            return;
        }

        setIsActive((prevIsActive) => {
                const newIsActive = !prevIsActive;
                const returnData = {
                    isActive: newIsActive,
                    index: index,
                };
                onCardClick(returnData);
                return newIsActive;
            });
    };

    const cardClass = isActive ? 'card activ' : 'card';
  

    return (
        <div 
            className={cardClass}
            onClick={handleClick}    
        >
            <p>{number}</p>
        </div>
    );
    
}
export default Card;