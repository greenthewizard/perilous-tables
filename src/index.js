import './js/styles.js';
import perilous from './js/perilous/perilous.js'

const tblRefs = [
    'tbl:creature/creature[base]',
    'tbl:detail[activity]',
    'tbl:detail[disposition]',
    'tbl:detail[no. appearing]',
    'tbl:detail[size]'
]

document.addEventListener("DOMContentLoaded", function() {
    const $monsterGen = document.querySelector('#monster-gen');
    const $btn = document.querySelector('#btn--gen');
    $btn.addEventListener('click', (e) => {
        const tblList = tblRefs.map(ref => perilous.table(ref));
        while ($monsterGen.firstChild) {
            $monsterGen.removeChild($monsterGen.firstChild);
        }
        Promise.all(tblList)
        .then(tblList => tblList.map(tbl => tbl.roll()))
        .then(tblList => {
            tblList.forEach(tbl => {
                const $p = document.createElement('p');
                const $tblName = document.createElement('span');
                const $result = document.createElement('span');

                $tblName.textContent = tbl.tableName + ': ';
                perilous.resolveString(tbl.result)
                .then(res => $result.textContent = res); 

                $p.appendChild($tblName);
                $p.appendChild($result);

                $monsterGen.appendChild($p);
            });
        });
    });
});