import './js/styles.js';
import perilous from './js/perilous.js'

const table = perilous.table('tbl:beast[base]');

table.load().then(res => {
    // console.log(res.getName());
    res.getOptions().forEach((option, i) => {
        console.log((i+1) + '. ' + option);
    });
    return res.roll(-1);
}).then(res => {
    console.log('Result: ' + res.result);
});