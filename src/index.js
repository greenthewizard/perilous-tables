import './js/styles.js';
import perilous from './js/perilous.js'

document.addEventListener("DOMContentLoaded", function() {
    const $btn = document.querySelector('#btn--gen');
    $btn.addEventListener('click', (e) => {
        perilous.table('tbl:creature/creature[base]')
        .then(res => {
            document.querySelector('#creature .table')
            .textContent = res;
        });
        perilous.table('tbl:detail[activity]')
        .then(res => {
            document.querySelector('#activity .table')
            .textContent = res;
        });
        perilous.table('tbl:detail[alignment]')
        .then(res => {
            document.querySelector('#alignment .table')
            .textContent = res;
        });
        perilous.table('tbl:detail[disposition]')
        .then(res => {
            document.querySelector('#disposition .table')
            .textContent = res;
        });
        perilous.table('tbl:detail[no. appearing]')
        .then(res => {
            document.querySelector('#no-appearing .table')
            .textContent = res;
        });
        perilous.table('tbl:detail[size]')
        .then(res => {
            document.querySelector('#size .table')
            .textContent = res;
        });
    });
});