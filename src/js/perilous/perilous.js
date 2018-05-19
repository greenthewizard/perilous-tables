import * as tableFactory from './tableFactory.js';

const re = /tbl:.+?\[.+?\]/g

const parseTableResult = (str) => {
    const newTables = [];
    let match = [];
    re.lastIndex = 0;
    while (match = re.exec(str)) {
        newTables.push(tableFactory.newTable(match[0]))
    }
    
    return Promise.all(newTables)
    .then(tables => {
        return tables.map(tbl => tbl.roll());
    })
    .then(tables => {
        return str.replace(re, match => {
            return tables.shift().result;
        });
    });
}

const resolveString = (str) => {
    return parseTableResult(str)
    .then(newStr => {
        if(re.test(newStr)) {
            return resolveString(newStr);
        }
        return newStr;
    });
}

//Public API
const table = (str) => {
    return resolveString(str);
} 

export default {
    table
}
