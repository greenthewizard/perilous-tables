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
    if (isTableRef(rolled)) {
        const {path, key} = parseTableRef(rolled);
        return newTable(path, key).then(tableObj => tableObj.roll());
    } else {
        this.result = rolled;
        return this;
    }
}

tableProto.getOptions = function() {
    return this.options;
}

const newTable = (path, key) => {
    const tableObj = Object.create(tableProto);
    tableObj.result = null;

    if (!tableData[path]) {
        return fetch(dir + path + '.json')
        .then(res => res.json())
        .then(res => {
            tableData[path] = res;
            tableObj.options = getWeightedList(
                tableData[path][key].options
            );
            return tableObj;
        });
    } else {
        return new Promise((resolve, reject) => {
            tableObj.options = getWeightedList(
                tableData[path][key].options
            );
            return tableObj;
        });
    }
}

const table = (ref) => {
    const {path, key} = parseTableRef(ref);
    return newTable(path, key);
} 

export default {
    table
}