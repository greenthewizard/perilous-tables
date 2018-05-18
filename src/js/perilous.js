const tableData = {};
const dir = 'tables/'
const re = /tbl:.+?\[.+?\]/g

const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

const parseTableRef = (ref) => {
    const refMatch = ref.match(/tbl:(.+)\[(.+)\]/);
    const [, path, key] = refMatch;

    return {
        path,
        key
    }
}

const parseTableResult = (str) => {
    const newTables = [];
    let match = [];
    re.lastIndex = 0;
    while (match = re.exec(str)) {
        newTables.push(newTable(match[0]))
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

const isTableRef = (str) => {
    return /^tbl:.+\[.+\]$/.test(str);
}

const getWeightedList = (options) => {
    //Build table options array by repeating weighted values.
    return options.reduce((acc, option) => {
        if (option.weight) {
            for (let i = 0; i < option.weight; i++) {
                acc.push(option.result);
            }
        } else {
            acc.push(option);
        }
        
        return acc;
    }, []);
}

const tableProto = {};
let i = 0;

tableProto.roll = function() {
    const rolled = this.options[randInt(this.options.length - 1)];
    this.result = rolled;
    return this;
}

tableProto.getOptions = function() {
    return this.options;
}

const newTable = (ref) => {
    const {path, key} = parseTableRef(ref);
    const tableObj = Object.create(tableProto);
    tableObj.result = null;
    
    if (tableData[path]) {
        return new Promise((resolve) => {
            tableObj.options = getWeightedList(
                tableData[path][key].options
            );
            resolve(tableObj);
        });
    } else {
        return fetch(dir + path + '.json')
        .then(res => res.json())
        .then(res => {
            tableData[path] = res;
            tableObj.options = getWeightedList(
                tableData[path][key].options
            );
            return tableObj;
        });
    }
}

const table = (str) => {
    return resolveString(str);
} 

export default {
    table
}
