import './js/styles.js';

const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

const newTable = (tableName, optionsData) => {
    
    //Build new table by repeating weighted values.
    let options = optionsData.reduce((acc, option) => {
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

let creatureTable = newTable('Creature', [
    {
        result: 'Beast',
        weight: 4
    },
    {
        result: 'Human',
        weight: 2
    },
    {
        result: 'Humanoid',
        weight: 2
    },
    {
        result: 'Monster',
        weight: 4
    }
]);

let earthboundTable = newTable('Earthbound', [
    'termite/tick/louse',
    'snail/slug/worm',
    'ant/centipede/scorpion',
    'snake/lizard',
    'vole/rat/weasel',
    'boar/pig',
    'dog/fox/wolf',
    'cat/lion/panther',
    'deer/horse/camel',
    'ox/rhino',
    'bear/ape/gorilla',
    'mammoth/dinosaur'
]);

let airBorneTable = newTable('Airborne', [
    'mosquito/firefly',
    'locust/dragonfly/moth',
    'bee/wasp',
    'chicken/duck/goose',
    'songbird/parrot',
    'gull/waterbird',
    'heron/crane/stork',
    'crow/raven',
    'hawk/falcon',
    'eagle/owl',
    'condor',
    'pteranodon'
]);

let waterGoingTable = newTable('Water-going', [
    'insect',
    'jelly/anemone',
    'clam/oyster/snail',
    'eel/snake',
    'frog/toad',
    'fish',
    'crab/lobster',
    'turtle',
    'alligator/crocodile',
    'dolphin/shark',
    'squid/octopus',
    'whale'
])

let beastTable = newTable('Beast', [
    {
        result: earthboundTable,
        weight: 7
    },
    {
        result: airBorneTable,
        weight: 3
    },
    {
        result: waterGoingTable,
        weight: 2
    }
])

Array(5).fill().forEach(i => {
    let res = beastTable.getRandomResult();
    console.log(`${res.tableName}: ${res.result}`);
})