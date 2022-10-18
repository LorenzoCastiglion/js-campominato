'use strct';

// bottone play

const playBtn = document.getElementById('play');

function play(){
    
    removeFirstNotification();
    const loose = document.getElementById('error');
    const win = document.getElementById('error');
    loose.classList.add('d-none');
    const NUM_BOMB = 16;
    const bombsPosition = [];  
    let score = 1;
    let selettore;
    
    
    let scoretable = document.getElementById('punteggio');
    scoretable.innerHTML= '';
    

    // selettore della difficoltà del livello e pulitore del campo da gioco
    let numCell;
    const gameField = document.getElementById('game-field');
    gameField.innerHTML = '';
    const levelHTML = document.getElementById('livello');
    const level = levelHTML.value;
    switch(level) {
        case '1':
        default:
            numCell = 100;
            break;
        case '2':
            numCell = 81;
            break;
        case '3':
            numCell = 49;
            break;
    }


    const MAX_ATTEMPTS = numCell - NUM_BOMB;

    // funzione genera celle

    function drawCell(num){
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100%  / ${cellPerSide}) `;
        cell.style.height = `calc(100% / ${cellPerSide} ) `;
       


        // assegnazione delle mine all'aray di celle random
         while(bombsPosition.length < NUM_BOMB){
            const bomb = randomNumber(1, numCell);
            if(!bombsPosition.includes(bomb)){
                bombsPosition.push(bomb);
            }
       
        }
       
        // assegnazione variabile mine
        if(bombsPosition.includes(num)){
            cell.classList.add('mine');
        };



        //event per cambiare colore in base a bomba o meno
        cell.addEventListener('click', selettore = function noClick(){
            
            if(cell.classList.contains('mine')){
                const mineField = document.querySelectorAll('.mine');
                for (let i  = 0; i < mineField.length; i++){
                    mineField[i].classList.add('red');
                };
                cell.classList.add('red');
                this.removeEventListener('click', noClick);
                endGame();

            }else{
                this.removeEventListener('click', noClick);
                 this.classList.add('green');
                 let highscore = ' ' + score++;
                 console.log(score)
                  scoretable.innerHTML = ''  
                  scoretable.innerHTML = 'Score: ' + highscore; 
                 
                //  cell.removeEventListener('click');
            };

        }
        )

        function endGame(){
            const squares = document.getElementsByClassName('square');
            for(let i = 0; i < squares.length; i ++){
                squares[i].classList.add('green');
            }
            if(score === MAX_ATTEMPTS){
                console.log('you win');
                
                win.classList.remove('d-none');
                const divAlert = notificationError('hai vinto!');
                win.append(divAlert); 
                
                
            }else{
                console.log('you lose')
                // const loose = document.getElementById('error');
                loose.classList.remove('d-none');
                const divAlert = notificationError('hai perso!');
                loose.append(divAlert);  
            }
        }
        
        
        return cell;
    }

    


  

    console.log(bombsPosition);

    // funzione che genera il campo minato
    function drawGrid(){
        
        const grid = document.createElement('div');
        grid.className = 'grid';
        
        // for loop che genera le celle in base alla difficoltà

        for (let i = 1; i <= numCell; i++){
            const cell = drawCell(i);
            grid.appendChild(cell);
        }

        // appendo le celle alla griglia
        gameField.appendChild(grid);
    }

    // evocazione funzione
    drawGrid();
}

// event listener bottone play

playBtn.addEventListener('click', play);