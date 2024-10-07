
export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomOperator() {
    const operators = ['+','-','*','/'];
    return operators[getRandomNumber(0,3)];
}

export function leadingZero(number) {
    number = (number < 10 ? '0' : '') + number;  
    return number;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

export function countOccurrences(array, key) {
    return array.reduce((acc, obj) => {
        const value = obj[key];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
};

export function countSpecificValue(array, key, value) {
    return array.filter(obj => obj[key] === value).length;
};

 

