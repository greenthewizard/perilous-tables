import './js/styles.js';
import perilous from './js/perilous.js'

const appendTable = () => {
    perilous.table('tbl:creature/creature[base]')
    .then(res => {
        const $p = document.createElement('p');
        $p.textContent = res;
    
        document.querySelector('#roll-div')
        .appendChild($p);
    });
}

setInterval(appendTable, 100);