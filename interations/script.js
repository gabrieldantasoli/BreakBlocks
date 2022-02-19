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
var blockdiv = document.querySelector('#blocks') ;
var checked ;
var revertdir ;
var listblocks = [] ;
var levels = 0;

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
    //if (playing) {
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
    //} ;
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
        document.getElementById('mobilestart').style.display = 'block' ;
        replacebol() ;
        replacebar() ;
        replacelifes() ;
        playing = false ;
    } ;

    //Breaking blocks
    if (posboly+heightbol >= 50) {
        let divs = document.querySelectorAll('#blocks div') ;
        for (var i = 0;i<blocks;i++) {
            if (posboly+heightbol >= 100-parseInt(divs[i].style.top.replace('%','')/2+5) && posboly <= 100-parseInt(divs[i].style.top.replace('%','')/2)) {
                if (Math.floor(posbolx+widthbol/2) == parseInt(divs[i].style.left.replace('%',''))) {
                    blockdiv.removeChild(divs[i])
                    dirbolx *= -1
                    blocks -= 1
                    break
                }
                else if (Math.floor(posbolx-widthbol/2) == parseInt(divs[i].style.left.replace('%',''))+10) {
                    blockdiv.removeChild(divs[i])
                    dirbolx *= -1
                    blocks -= 1
                    break
                }else if (posbolx+widthbol/2 >= parseInt(divs[i].style.left.replace('%','')) && posbolx-widthbol/2 <= parseInt(divs[i].style.left.replace('%',''))+10) {
                    blockdiv.removeChild(divs[i])
                    dirboly *= -1
                    blocks -= 1
                    break
                }
            } ;
        }
    } ;


 
    // bar colisions
    if ((posbolx+(widthbol/2) >= posbarx-(barWidth/2) && posboly <= 3) && (posbolx-(widthbol/2) <= posbarx+(barWidth/2))) {
        dirboly *= -1 ;
        checked = false ;
        dirbolx = (posbolx-posbarx)/6 ;
    } ;

    bol.style.left = posbolx+'%' ;
    bol.style.bottom = posboly+'%' ;
} ;


function game() {
    controlbar();
    if (playing) {
        if (!withbol) {
            controlbol() ;
        }
    } ;
    if (blocks > 0) {
        frames = requestAnimationFrame(game) ;
    }else{
        levels += 1 ;
    }
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
    blocks = 100 ;
    for (var i = 0;i<blocks;i++) {
        listblocks.push(1) ;
    } ;
    setBlocks(blocks) ;
    lifes = 5 ;
    revertdir = 1
    colorbol = 'var(--white)' ;
    document.addEventListener('keyup',function() {
        dirbar = 0 ;
    }) ;

    //setting dificuty
    if (levels > 0) {
        setdificuty() ;
    } ;


    //temporary touch events
    document.getElementById('left').addEventListener('touchend',function() {
        dirbar = 0 ;
    }) ;
    document.getElementById('right').addEventListener('touchend',function() {
        dirbar = 0 ;
    }) ;

    document.getElementById('tempory').addEventListener('touchstart',function(e) {
        key = e.target.id;
        if (key == 'left') {
            dirbar = -1 ;
        }else if (key == 'right') {
            dirbar = 1 ;
        } ;
        if (key == 'start') {
            document.getElementById('mobilestart').style.display = 'none' ;
            startGame()
        }
    }) ;
    //temporary touch events



    document.addEventListener('keydown',function(e) {
        key = e.keyCode;
        if (key == 37) {
            dirbar = -1 ;
        }else if (key == 39) {
            dirbar = 1 ;
        } ;
        if (key == 13) {
            document.getElementById('mobilestart').style.display = 'none' ;
            startGame()
        }
    }) ;
    replacebol() ;
    replacebar() ;
    playing = true ;
    game() ;
} ;

function setdificuty() {
    switch (levels) {
        case 1:

            break
        case 2:

            break
        case 3:

            break
        case 4:

            break
        case 5:

            break
        case 6:

            break
        case 7:

            break
        case 8:

            break
        default:
            alert('Error ! Please reload the site .')
    }
}

function startGame() {
    if (lifes > 0 && withbol) {
        dirboly = 1 ;
        withbol = false ;
        playing = true ;
    }else if (withbol) {
        alert('voce perdeu!')
    } ;
    
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
document.getElementById('startlevels').addEventListener('click', function() {
    document.querySelector('#gamelevels').style.display = 'none' ;
    document.querySelector('#gamesection').style.display = 'flex' ;
    start() ;
}) ;
