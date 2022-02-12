//Variables

var colors = ['#81bd4d','#d4cc59','#d4553f','#72bdd4','#ed77c8'] ;
var blocks ;

//Select game level
var active = document.querySelectorAll('.active') ;

active.forEach(item => item.addEventListener('click',changeActive));

function changeActive(e) {
    active.forEach(item => item.classList.remove('play')) ;
    let element = e.target.classList;
    let clasname = ''
    element.forEach(item => clasname += '.'+item)
    element = clasname
    if (document.querySelector(`${element}`).length > 0) {
        document.querySelector(`${element}`).removeChild(document.querySelector(`${element}>.fas.fa-lock`)) ;
    } ;
    document.querySelector(`${element}`).classList.add('play') ;
} ;

//Start variables

function start() {
    blocks = 100
    setBlocks(blocks) ;
} ;

//Setting the blocks

function setBlocks(hmblocks) {
    let built = 0 ;
    let blockdiv = document.querySelector('#blocks') ;
    while (true){
        let block = document.createElement('div') ;
        block.style.width = '10%' ;
        block.style.height = '10%' ;
        let color = colors[Math.round(Math.random() * 6)] ;
        block.style.background = `${color}` ;
        block.style.border = '1px solid black' ;
        if (built >= 100) {
            break
        } ;
        blockdiv.appendChild(block)
        built += 1 ;
    }
} ;

setBlocks()