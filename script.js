'use strict';
document.body.classList.add('js');
const menu=document.querySelector('.menu-toggle');
menu.hidden=false;
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('#nav').classList.toggle('is-open',open)});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('#nav').classList.remove('is-open')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus()}});
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const search=document.querySelector('#search');let filter='Todos';
const topics=[...document.querySelectorAll('.topic')];
function filterTopics(){const query=normalize(search.value.trim());let count=0;topics.forEach(card=>{const match=(filter==='Todos'||card.dataset.category===filter)&&normalize(card.textContent).includes(query);card.hidden=!match;if(match)count++});document.querySelector('#results').textContent=`${count} de ${topics.length} temas encontrados`;document.querySelector('#empty').hidden=count>0;}
document.querySelector('.search-area').hidden=false;
search.addEventListener('input',filterTopics);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterTopics()}));
document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';filter='Todos';document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.filter==='Todos')));filterTopics();search.focus()});filterTopics();
function setupSwitcher(group,attribute,prefix,panels){document.querySelector(group).hidden=false;const buttons=[...document.querySelectorAll(`[data-${attribute}]`)];function select(button){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll(panels).forEach(panel=>panel.hidden=panel.id!==prefix+button.dataset[attribute]);}buttons.forEach(b=>b.addEventListener('click',()=>select(b)));select(buttons[0]);}
setupSwitcher('.map-selector','map','map-','.map-panel');
setupSwitcher('.profile-nav','profile','perfil-','.profile-panel');
const printButton=document.querySelector('.print-button');printButton.hidden=false;printButton.addEventListener('click',()=>window.print());
let openedBeforePrint=[];
window.addEventListener('beforeprint',()=>{openedBeforePrint=[...document.querySelectorAll('details')].filter(d=>d.open);document.querySelectorAll('details').forEach(d=>d.open=true)});
window.addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(d=>d.open=openedBeforePrint.includes(d))});
