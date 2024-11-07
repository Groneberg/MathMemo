import './Card.css'

import { useState, useEffect } from 'react';

function Card({number, isMatched, activeLimit, index, onCardClick}) {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        // console.log('Active Cards: ', activeLimit);
        
        if (!isActive && activeLimit >= 2 || isMatched) {
            return;
        }
        if (isActive && !isMatched) {
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

    let cardClass = 'card';
    if (isMatched) {
        cardClass = 'card matched';
    } 
    if (isActive) {
        cardClass = 'card activ';
    } 

    useEffect(() => {
        if (isMatched && isActive) {
            setIsActive(false);
            const returnData = {
                isActive: false,
                index: index,
            };
            onCardClick(returnData);
        }

        if (isActive && !isMatched && activeLimit === 2) {
            
            const timer = setTimeout(() => {
                const timer = setTimeout(() => {
                    setIsActive(false);
                    const returnData = {
                        isActive: false,
                        index: index,
                    };
                    onCardClick(returnData);
                }, 3000);
            });
            return () => clearTimeout(timer);
        }
        
    }, [isActive, isMatched, activeLimit]);

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