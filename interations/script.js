// Starts Variables

var colors = ['#81bd4d','#d4cc59','#d4553f','#72bdd4','#ed77c8'] ;
var blocks ;
var column , row ;
var playing = false ;
var frames ;
var bol = document.querySelector('#bol') ;
var bar = document.querySelector('#ping') ;
var withbol ;
var lifes ;

// Blocks
var blockdiv = document.querySelector('#blocks') ;

//velocity
var velbar ,dirbar ;

// bar 
var barWidth , posbarx ;

// boll
var posboly , posbolx , widthbol , heightbol , colorbol , velbol , dirbolx , dirboly ;

// Ends variables

// Starts Select game level
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

// Ends select game level

// game starts
function controlbar() {
    if (playing) {
        posbarx += velbar * dirbar ;
        if (withbol) {
            posbolx = posbarx
        } ;
        if (posbarx <= barWidth/2) {
            posbarx = barWidth/2 ;
            if (withbol) {
                posbolx = barWidth/2 ;
            } ;
        }else if (posbarx > 100-(barWidth/2)) {
            posbarx = 100-(barWidth/2) ;
            if (withbol) {
                posbolx = 100-(barWidth/2) ;
            } ;
        } ;
        bar.style.left = posbarx+'%' ;
        if (withbol) {
            bol.style.left = posbolx+'%' ;
        } ;
    } ;
} ;

function controlbol() {
    posbolx += velbol * dirbolx ;
    posboly += velbol * dirboly ;
    // left and right wall colisions
    if (posbolx >= 100-(withbol/2)) {
        dirbolx *= -1 ;
    }else if (posbolx <= 0+(withbol/2)) {
        dirbolx *= -1 ;
    }

    // top and bottom wall colisions
    if (posboly >= 100-(heightbol/2)) {
        dirboly *= -1 ;
    }else if (posboly <= 0 && playing) {
        lifes -= 1 ;
        replacebol() ;
        replacebar() ;
        replacelifes() ;
        playing = false ;
    } ;

    // bar colisions
    if ((posbolx+(widthbol/2) >= posbarx-(barWidth/2) && posboly <= 3) && (posbolx-(widthbol/2) <= posbarx+(barWidth/2))) {
        dirboly *= -1 ;
        dirbolx = (posbolx-posbarx)/6
    } ;

    bol.style.left = posbolx+'%' ;
    bol.style.bottom = posboly+'%' ;
} ;

function game() {
    if (playing) {
        controlbar() ;
        if (!withbol) {
            controlbol() ;
        }
    } ;
    frames = requestAnimationFrame(game) ;
} ;

function replacebol() {
    posbolx = 50 ;
    posboly = 3 ;
    velbol = 1 ;
    dirbolx = 0 ;
    dirboly = 0 ;
    widthbol = 3 ;
    heightbol = 3 ;
    withbol = true ;
    bol.style.left = posbolx+'%' ;
    bol.style.bottom = posboly+'%' ;
    bol.style.height = heightbol+'%' ;
    bol.style.width = widthbol+'%' ;
    bol.style.background = colorbol ;
} ;

function replacebar() {
    barWidth = 20 ;
    posbarx = 50 ;
    velbar = 1 ;
    dirbar = 0 ;
    document.getElementById('ping').style.left = posbarx+'%' ;
} ;

function replacelifes() {
    document.querySelectorAll('.hearts i')[lifes].style.color = 'black' ;
} ;

//game ends

//Start variables

function start() {
    dirboly = 0 ;
    dirbolx = 0 ;
    withbol = true ;
    blocks = 100
    setBlocks(blocks) ;
    lifes = 5 ;
    colorbol = 'var(--white)' ;
    document.addEventListener('keyup',function() {
        dirbar = 0 ;
    }) ;
    document.addEventListener('keydown',function(e) {
        key = e.keyCode;
        if (key == 37) {
            dirbar = -1 ;
        }else if (key == 39) {
            dirbar = 1 ;
        } ;
        if (key == 13) {
            startGame()
        }
    }) ;
    replacebol() ;
    replacebar() ;
    playing = true ;
    game() ;
} ;

function startGame() {
    if (lifes > 0) {
        dirboly = 1 ;
        withbol = false ;
        playing = true ;
    }else {
        alert('voce perdeu!')
    }
} ;

// Starts Setting the blocks

function setBlocks() {
    let built = 0 ;
    column = 0 ;
    row = 0 ;
    while (true){
        let block = document.createElement('div') ;
        block.style.width = '10%' ;
        block.style.height = '10%' ;
        let top = 10 * column ;
        let left = 10 * row ;
        let color = colors[Math.round(Math.random() * 4)] ;
        block.style.background = `${color}` ;
        block.style.outline = '1px solid black' ;
        block.style.top = top+'%' ;
        block.style.left = left+'%' ;
        if (built >= 100) {
            break
        } ;
        blockdiv.appendChild(block)
        built += 1 ;
        row += 1 ;
        if (row == 10) {
            row = 0 ;
            column += 1 ;
        } ;
    }
} ;

// ends setting the blocks
start()