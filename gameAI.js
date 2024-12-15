
//game array
var ground = [0,0,0,0,0,0,0,0,0];
var playerTurn = true;

var elements = document.getElementsByTagName("h3");
console.log(elements);

let winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
//console.log(winArray);

var inputValue;

function getInputValue() {
    inputValue = document.getElementById("test").value;
    //console.log(inputValue);
    let input = parseInt(inputValue);
    ground[input] = 1;
    elements[input].textContent = 1;
    playerTurn = false;
}

for(let i = 0;i < 9;i++) {
    if(playerTurn) {
        //while(playerTurn);
        let input = parseInt(window.prompt());
        elements[input].textContent = 1;
        ground[input] = 1;
        playerTurn = false;
        waitForPlayer();
    } else {
        //computer's turn, changing turn to player as next
        playerTurn = true;
        //1 checking any winnable cell
        let input = checkWinnable(2);
        if(input != -1) {
            ground[input] = 2;
            elements[input].textContent = 2;
            continue;
        }
       
        //block any winnable by user (player)
        input = checkWinnable(1);
        if(input != -1) {
            ground[input] = 2;
            elements[input].textContent = 2;
            continue;
        }

        //check whether the center cell is available
        if(ground[4] == 0) {
            ground[4] = 2;
            elements[4].textContent = 2;
        }

        //check any corner available 
        let tempArr = [0, 2, 6, 8];
        for(let j = 0;j < tempArr;j++) {
            if(ground[tempArr[j]] == 0) {
                ground[tempArr[j]] = 2;
                elements[tempArr[j]].textContent = 2;
                continue;
            }
        }

        //if none of them is available then find an empty cell and mark it
        for(let j = 0;j < ground.length;j++) {
            if(ground[j] == 0) {
                ground[j] = 2;
                elements[j].textContent = 2;
                break;
            }
        }
    } 
}


async function waitForPlayer() {
    await wait(2000);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function checkWinnable(player) {

    for(let i = 0;i < winArray.length;i++) {
        let count = 0;
        for(let j = 0;j < winArray[i].length;j++) {
            if(ground[winArray[i][j]] == player) count++;
        }
        if(count == 2) {
            for(let j = 0;j < winArray[i].length;j++) {
                if(ground[winArray[i][j]] == 0) return winArray[i][j];
            }
        }
    }  
    return -1;

}

