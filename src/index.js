import './js/styles.js';
import perilous from './js/perilous.js'

perilous.table('tbl:creature/beast[earthbound]')
.then(res => res.roll(-1))
.then(res => {
    const $p = document.createElement('p');
    $p.textContent = res.result;

    document.querySelector('#roll-div')
    .appendChild($p);
});