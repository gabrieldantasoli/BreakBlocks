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
var bar1 = document.querySelector('#bar1') ;
var bar2 = document.querySelector('#bar2') ;
var vellevelbars1 , vellevelbars2 ;
var poslevelbars1 , poslevelbars2;
var defeatblocks1 , defeatblocks2;

//velocity
var velbar ,dirbar ;

// bar 
var barWidth , posbarx ;

// boll
var posboly , posbolx , widthbol , heightbol , colorbol , velbol , dirbolx , dirboly ,difvelbol;

// Ends variables

// Starts Select game level
var active = document.querySelectorAll('.active') ;

active.forEach(item => item.addEventListener('click',changeActive)) ;    

function changeActive(e) {
    active.forEach(item => item.classList.remove('play')) ;
    let clas = '' ; 
    e.target.classList.forEach(item => clas += `.${item}`)
    document.querySelector(`${clas}`).classList.add('play') ;
} ;

// Ends select game level

// game starts
function controlbar() {
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
    // Bar level 1 --> colisions and movimentation
    if (document.querySelector('.play').getAttribute('data-level') >= 1) {
      if (poslevelbars1 < 0) {
        vellevelbars1 *= -1 ;
      }else if (poslevelbars1 >= 85) {
        vellevelbars1 *= -1 ;
      }
      if (posboly >= 30 && posboly <= 33 && posbolx+widthbol/2 >= poslevelbars1 && posbolx+widthbol/2 <= poslevelbars1+1){
        if (dirbolx == 0) {
          dirbolx = -1 ;
        }else {
          dirbolx *= -1 ;
        }
      }else if (posboly >= 30 && posboly <= 33 && posbolx-widthbol/2 <= poslevelbars1+15 && posbolx-widthbol/2 >= poslevelbars1+14){
        if (dirbolx == 0) {
          dirbolx = 1 ;
        }else {
          dirbolx *= -1 ;
        }
      }else if (posboly >= 30 && posboly <= 35 && posbolx+widthbol/2 >= poslevelbars1 && posbolx-widthbol/2 <= poslevelbars1+15) {
        dirboly *= -1 ;
      }
    
      poslevelbars1 += vellevelbars1 ;
      bar1.style.left = poslevelbars1+'%' ;
    } ;
    if (document.querySelector('.play').getAttribute('data-level') >= 2) {
      if (poslevelbars2 < 0) {
        vellevelbars2 *= -1 ;
      }else if (poslevelbars2 > 85) {
        vellevelbars2 *= -1 ;
      }
      if (posboly >= 20  && posboly <= 23 && posbolx+widthbol/2 >= poslevelbars2 && posbolx+widthbol/2 <= poslevelbars2+1){
        if (dirbolx == 0) {
          dirbolx = -1 ;
        }else {
          dirbolx *= -1 ;
        }
      }else if (posboly >= 20 && posboly <= 23 && posbolx-widthbol/2 <= poslevelbars2+15 && posbolx-widthbol/2 >= poslevelbars2+14){
        if (dirbolx == 0) {
          dirbolx = 1 ;
        }else {
          dirbolx *= -1 ;
        }
      }else if (posboly >= 20 && posboly <= 25 && posbolx+widthbol/2 >= poslevelbars2 && posbolx-widthbol/2 <= poslevelbars2+15) {
        dirboly *= -1 ;
      }
    
      poslevelbars2 -= vellevelbars2 ;
      bar2.style.left = poslevelbars2+'%' ;
    } ;
    if (document.querySelector('.play').getAttribute('data-level') >= 3) {
        let divs = document.querySelectorAll('#defeatblocks1 div') ;
        for (var i = 0 ; i < defeatblocks1 ; i++) {
            if ((posboly+heightbol >= 48 && posboly <= 50) && (posbolx+widthbol/2 >= parseInt(divs[i].style.left.replace('%','')) && posbolx-widthbol/2 <= parseInt(divs[i].style.left.replace('%',''))+10)) {
                dirboly*=-1
                document.querySelector('#defeatblocks1').removeChild(divs[i]) ;
                defeatblocks1 -= 1 ;
                break ;
            } ;
        } ;
    } ;
    if (document.querySelector('.play').getAttribute('data-level') >= 4) {
        let divs = document.querySelectorAll('#defeatblocks2 div') ;
        for (var i = 0 ; i < defeatblocks2 ; i++) {
            if ((posboly+heightbol >= 28 && posboly <= 30) && (posbolx+widthbol/2 >= parseInt(divs[i].style.left.replace('%','')) && posbolx-widthbol/2 <= parseInt(divs[i].style.left.replace('%',''))+10)) {
                dirboly*=-1
                document.querySelector('#defeatblocks2').removeChild(divs[i]) ;
                defeatblocks2 -= 1 ;
                break ;
            } ;
        } ;

    } ;

    //Breaking blocks
    if (posboly+heightbol >= 50) {
        let divs = document.querySelectorAll('#blocks div') ;
        for (var i = 0;i<blocks;i++) {
            if (posboly+heightbol >= 100-parseInt(divs[i].style.top.replace('%','')/2+5) && posboly <= 100-parseInt(divs[i].style.top.replace('%','')/2)) {
                  if (Math.floor(posbolx-widthbol/2) == parseInt(divs[i].style.left.replace('%',''))+10) {
                    blockdiv.removeChild(divs[i])
                    dirbolx *= -1
                    blocks -= 1
                    break
                }else if (Math.floor(posbolx+widthbol/2) == parseInt(divs[i].style.left.replace('%',''))) {
                    blockdiv.removeChild(divs[i])
                    dirbolx *= -1
                    blocks -= 1
                    break
                }else if (posbolx+widthbol/2 >= parseInt(divs[i].style.left.replace('%','')) &&  posbolx-widthbol/2 <= parseInt(divs[i].style.left.replace('%',''))+10) {
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
      if (parseInt(document.querySelector('.play').getAttribute('data-level'))+1 == document.querySelectorAll('.active').length) {
        levels += 1 ;
        let divs = document.querySelectorAll('#levels div') ;
        divs[levels].classList.add('active') ;
        active = document.querySelectorAll('.active') ;
        active.forEach(item => item.addEventListener('click',changeActive)) ;
      } ;
        document.querySelector('#visuallevel').textContent = levels + 1 ;
        document.querySelector('#gamesection').style.display = 'none' ;
        document.querySelector('.ps p:nth-child(1)').textContent = 'Congratulations , you won .' ;
        document.querySelector('#popup').style.top = '0' ;
    }                         
} ;

function replacebol() {
    posbolx = 50 ;
    posboly = 3 ;
    velbol = difvelbol ;
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
    document.querySelectorAll('.hearts .fa-heart').forEach(item => item.style.color = 'red') ;         
    document.querySelector('#mobilestart').style.display = 'flex' ;
    poslevelbars1 = 0 ;
    poslevelbars2 = 85 ;
    
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

    //touch events
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
        if (key ==  'start') {
            document.getElementById('mobilestart').style.display = 'none' ;
            startGame()
        }
    }) ;
    //touch events ends

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
    setdificuty() ;
    game() ;
} ;

function setdificuty() {
    switch (levels) {
        case 0:
            velbol = 0.8 ;
            difvelbol = 0.8 ;
            break
        case 1:
            document.getElementById('bar1').style.display = 'block' ;
            vellevelbars1 = .2
            difvelbol = 0.8 ;
            velbol = 0.8 ;
            break
        case 2:
            document.getElementById('bar2').style.display = 'block' ;
            vellevelbars2 = .2
            difvelbol = 0.8 ;
            velbol = 0.8 ;
            break
        case 3:
            defeatblocks1 = 10 ;
            vellevelbars2 = .2
            difvelbol = 0.8 ;
            velbol = 0.8 ;
            setdefeatblocks(1) ;
            break
        case 4:
            defeatblocks1 = 10 ;
            defeatblocks2 = 10 ;
            vellevelbars2 = .2
            difvelbol = 0.8 ;
            velbol = 0.8 ;
            setdefeatblocks(1) ;
            setdefeatblocks(2) ;
            break
        case 5:
            
            break
        case 6:

            break
        case 7:

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

    } ;
    
} ;

// Starts Setting the blocks

function setdefeatblocks(whatblocks) {
    let defeatblocks ;
    if (whatblocks == 1) {
        defeatblocks = document.querySelector('#defeatblocks1') ;
    }else if (whatblocks == 2) {
        defeatblocks = document.querySelector('#defeatblocks2') ;
    }
    for (var i =0 ; i < 10 ; i++) {
        let newDiv = document.createElement('div') ;
        newDiv.style.left = 10 * i+'%';
        defeatblocks.appendChild(newDiv) ;      
    }
} ;

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
document.querySelector('#closepopup').addEventListener('click',function() {
    document.querySelector('#popup').style.top = '-100vh' ;
    document.querySelector('#gamelevels').style.display='flex' ;
}) ;
