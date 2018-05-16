export default function loadTable(path) {
    const tableData = {};
    const dir = 'tables/'
    return new Promise((resolve, reject) => {
        if (tableData[path]) {
            resolve(tableData[path]);
        } else {
            return fetch(dir + path + '.json')
                .then(res => res.json())
                .then(res => {
                    tableData[path] = res;
                    resolve(tableData[path]);
                });
        }
    });
}