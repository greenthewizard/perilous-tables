import loadTable from './loadTable.js';
import newTable from './newTable.js';

const parseTableRef = (ref) => {
    const refMatch = ref.match(/tbl:(.+)\[(.+)\]/);
    const [, path, table] = refMatch;

    return {
        path,
        table
    }
}

const rollTable = (name, ref) => {
    const {path, table} = parseTableRef(ref);
    loadTable(path)
    .then(data => newTable(name, data[table].options))
    .then(tbl => console.log(tbl.getRandomResult()));
}

export default rollTable