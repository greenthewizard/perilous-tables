import './js/styles.js';
import perilous from './js/perilous/perilous.js';
import * as mustache from 'mustache';

let nextBoxId = 0;

document.addEventListener('DOMContentLoaded', () => {

    //Select Button
    const $optList = document.querySelector('#opt-list');
    $optList.addEventListener('click', e => {
        $optList.childNodes.forEach($el => {
            $el.querySelector('.btn').classList.remove('btn--selected');
        });
        e.target.classList.add('btn--selected');
    });

    //Generate Tables
    const $rollBtn = document.querySelector('#roll-btn');
    $rollBtn.addEventListener('click', e => {
        const selected = document.querySelector('.btn--selected').getAttribute('id');
        switch (selected) {
            case 'gen-dun':
                appendNewBox(
                    'Builder',
                    "Who or what is beleived to have built this place?",
                    'tbl:dungeon/origin[builder]');
                appendNewBox(
                    'Function',
                    "For what purpose was it built?",
                    'tbl:dungeon/origin[function]');
                appendNewBox(
                    'Ruination',
                    "How did it come to ruin?",
                    'tbl:dungeon/origin[ruination]');
                appendNewBox(
                    'Theme',
                    "What's it all about?",
                    'tbl:dungeon/theme[base]');
            break;
            case 'gen-npc':
                
                break;
            case 'gen-unk':
                appendNewBox(
                    'Dungeon Exploration',
                    'What did they find?',
                    'tbl:dungeon/intotheunknown[base]',
                    true
                )
                break;
            case 'gen-cre':
                appendNewBox(
                    'Creature',
                    'Give every monster life!',
                    'tbl:creature/creature[base]'
                )
                break;
            default:
                break;
        }
    });
});

const appendNewBox = (title, subTitle, tableRef) => {
    const newBoxId = nextBoxId;
    const html = genBoxHtml(title, subTitle, tableRef);
    const $dungeonDiv = document.querySelector('#dungeon-div');
    $dungeonDiv.insertAdjacentHTML('afterend', html);

    const $newBoxBtn = document.querySelector('#btn-' + newBoxId);
    const $newBox = document.querySelector('#box-' + newBoxId);
    const $result = $newBox.querySelector('.box__result');

    $newBoxBtn.addEventListener('click', e => {
        const tableRef = e.target.dataset.tblref;
        const tbl = perilous.table(tableRef);
        const $p = $result.querySelector('p') || document.createElement('p');
        $p.textContent = '...';
        
        tbl
            .then(tblObj => tblObj.roll())
            .then(tblObj => perilous.resolveStringWithNames(tblObj.result))
            .then(str => {
                $p.textContent = str;
                $result.appendChild($p);
            });
    });
}

const genBoxHtml = (title, subTitle, tableRef) => {
    
    const template = 
    `<div class="box" id="box-{{boxId}}">
        <header class="box__header">
            <div class="box__title-card">
                <div class="l-flexbox">
                    <div class="l-flexitem">
                        <h2 class="box__title">
                        {{title}}
                        </h2>
                        <h3 class="box__sub-title">
                        {{subTitle}}
                        </h3>
                    </div>
                    <div class="l-flexitem l-flexitem--end-cap">
                        <input 
                        class="icon", 
                        type="image", 
                        alt="dice", 
                        src="svg/dice.svg", 
                        id="btn-{{boxId}}", 
                        data-tblref="{{tableRef}}"
                        />
                    </div>
                </div>
            </div>
        </header>
        <div class="box__content">
            <div class="box__result">
                {{#result}}
                <p>{{result}}</p>
                {{/result}}
            </div>
        </div>
    </div>`;
    
    const view = {
        title,
        subTitle,
        tableRef,
        boxId: nextBoxId++
        // result: 'A Freaking Dragon'
    }
    return mustache.render(template, view);
}
