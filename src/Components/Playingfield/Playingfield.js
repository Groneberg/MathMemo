import './Playingfield.css';

import Clock from '../Clock/Clock';
import Card from '../Card/Card';

import Equation from '../../Model/Equation.js'

import { useState, useEffect } from 'react';
import {getRandomNumber, getRandomOperator, countSpecificValue, shuffleArray} from '../../Tool/functions.js'

function Playingfield() {

    const [activeLimit, setActiveLimit] = useState(0);
    const [matchCounter, setMatchCounter] = useState(0);
    const [checkEquationSet, setCheckEquationSet] = useState(new Set());
    const [checkResultSet, setCheckResultSet] = useState(new Set());
    const [listItems, setListItems] = useState([]);
    
    const [randomeList, setRandomeList] = useState(() => {
        return shuffleArray([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    });

    const [cards, setCards] = useState(() => {
        const array = [];
        let j = 0;
        for (let i = 0; i < 16; i++) {
            array.push({
                cardIndex: i,
                matchNumber: j,
                isActive: false,
                isMatched: false
            });
            if (i % 2 !== 0) {
                j++;
            }
        }    
        return array;
    });

    const [equationList, setEquationList] = useState(()=>{
        const newEquationList = [];
        for (let i = 0; i < 8; i++) {
            let term1 = getRandomNumber(0,20);
            let term2 = getRandomNumber(0,20);
            const operator = getRandomOperator();
            if (operator === '/') {
                term1 = getRandomNumber(0,10);
                term2 = getRandomNumber(1,10);
                term1 =  term1 * term2;
            }
            if (operator === '*') {
                term1 = getRandomNumber(0,10);
                term2 = getRandomNumber(0,10);
            }
            const equation = new Equation(
                term1,
                term2,
                operator,
                i+1
            );
            
            checkResultSet.add(equation.result);
            checkEquationSet.add(equation.toString());
            if (checkEquationSet.size > newEquationList.length && checkResultSet.size > newEquationList.length) {
                newEquationList.push(equation);
            } else {
                i--;
            }
        }

        return newEquationList;
    });
    
    const handleActiveState = (returnData) => {
        cards[returnData.index].isActive = returnData.isActive;
        // console.log(returnData.matchNumber);
        // console.log(cards);
        setActiveLimit(() => {
            const newActiveLimit = countSpecificValue(cards, 'isActive', true)
            // console.log('Active Cards: ', newActiveLimit);
            return newActiveLimit;
        });
        // for (let i = 0; i < cards.length; i++) {
        //     console.log(cards[i]);                
        // }
    }

    const checkIfCardMatched = () => {
        const matchArray = [];
        const matchindex = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].isActive) {
                matchArray.push(cards[i].matchNumber);
                matchindex.push(i);
            }
            
            if (matchArray.length === 2) {
                console.log(matchArray);
                console.log(matchindex);
                if (matchArray[0] === matchArray[1]) {
                    // console.log(cards);

                    setMatchCounter((prevMatchCounter) => {
                        console.log(prevMatchCounter + 1);
                        
                        return prevMatchCounter + 1;
                    });

                    cards[matchindex[0]].isActive = false;
                    cards[matchindex[0]].isMatched = true;
                    cards[matchindex[1]].isActive = false;
                    cards[matchindex[1]].isMatched = true;

                    console.log('cards ', cards);

                }
                return;
            }
        }
    }

    const createListItems = () => {
        const newListItems = [];
        let j = 0;
        for (let i = 0; i < 16; i++) {
            if (i % 2 === 0) {
                newListItems.push(
                    <li key={i}>
                        <Card 
                            index={i}
                            isMatched={cards[i].isMatched}
                            activeLimit={activeLimit}
                            number={equationList[j].result}
                            onCardClick={handleActiveState}
                            />
                    </li>);                
            } else {
                let equationString = `${equationList[j].term1} ${equationList[j].operator} ${equationList[j].term2}`;
                if (equationList[j].operator === '-' && equationList[j].term1 < equationList[j].term2) {
                    equationString = `${equationList[j].term2} ${equationList[j].operator} ${equationList[j].term1}`;
                } 
                newListItems.push(
                    <li key={i}>
                        <Card 
                            index={i}
                            isMatched={cards[i].isMatched}
                            activeLimit={activeLimit}
                            number={equationString}
                            onCardClick={handleActiveState}
                        />
                    </li>);
                j++;
            }
        }

        const randomResultList = [];
        for (let i = 0; i < randomeList.length; i++) {
            randomResultList.push(newListItems[randomeList[i]]);           
        }
        return randomResultList;
    }
    
    useEffect(() => {
        checkIfCardMatched();
        
        setListItems(createListItems);  

        console.log('matchCounter ', matchCounter);
        

    }, [activeLimit, matchCounter]);
    
    return(
        <div className='playingfield'>
            <header className='playingfieldHeader'>
                <Clock/>
            </header>
            <main>
                <ul>
                    {listItems}
                </ul>
            </main>

        </div>
    );
}

export default Playingfield;