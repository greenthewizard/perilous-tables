const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

export default function newTable(tableName, data) {
    //Build new table by repeating weighted values.
    let options = data.reduce((acc, option) => {
        if (option.weight) {
            for (let i = 0; i < option.weight; i++) {
                acc.push(option.result);
            }
        } else {
            acc.push(option);
        }
        
        return acc;
    }, []);
    
    const getRandomResult = (table) => {
        let randOption = options[randInt(options.length - 1)];
        if (typeof randOption === 'string') {
            return {
                tableName,
                result: randOption
            }
        } else {
            return randOption.getRandomResult();
        }
    };

    return {
        getRandomResult
    }
}