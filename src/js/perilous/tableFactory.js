const tableProto = {};
const tableData = {};
const dir = 'tables/'

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
    let tableJSON = null;
    
    if (tableData[path]) {
        tableJSON = Promise.resolve(tableData[path]);
    } else {
        tableJSON = fetch(dir + path + '.json')
        .then(res => res.json())
        .then(res => {
            tableData[path] = res;
            return res;
        });
    }
    
    return tableJSON.then(tableJSON => {
        tableObj.result = null;
        tableObj.tableName = tableJSON[key].name || key;
        tableObj.options = getWeightedList(
            tableJSON[key].options
        );
        return tableObj;
    });
}

export {
    newTable
}