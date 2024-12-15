

var playerChance = true;
var ground = [0,0,0,0,0,0,0,0,0];
var winArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

var inputButtons = $(".ground > button");






//inputButtons.text("O");
// $('.footer').append(`<div class="outer"><div class= "inner animation"></div></div>`);
// setTimeout(() => {
//     $('.outer').remove();
//     playerChance = false;
//     computerMove();
//     playerChance = true;
// },3000);

$('.footer > h1').remove();


inputButtons.click(function() {
    if(playerChance) {
        if($(this).children('h1').text() != 'O' && $(this).children('h1').text() != 'X') {
            playerChance = false;
            $(this).children('h1').text('O');
            $(this).children('h1').addClass('temp1');
            let id = $(this).attr('id');
            //$('.outer').remove();
            //console.log(id);
            ground[parseInt(id)] = 1;
            //check the win
            if(checkWin(1)) {
                //user won
                //console.log('user won');
                won(1);
                return;
            }
            let flag = 0;
            for(let i = 0;i < ground.length;i++) {
                if(ground[i] != 0) {
                    flag++;
                    break;
                }
            }
            // flag = 0 draw
            if(flag == 0) {
                won(3);
            }
            computerMove();
            if(checkWin(2)) {
                //console.log('computer won');
                won(2);
            }
            playerChance = true;
        }
        console.log(ground);
    } 
});


// simple ai section
function computerMove() {
     //computer's turn, changing turn to player as next
     //1 checking any winnable cell
     let input = checkWinnable(2);
     if(input != -1 && ground[input] != 1) {
        ground[input] = 2;
        $(`#${input}`).children('h1').text('X');
        $(`#${input}`).children('h1').addClass('temp1');
        return;
     }
    
     //block any winnable by user (player)
     input = checkWinnable(1);
     if(input != -1 && ground[input] != 1) {
        ground[input] = 2;
        $(`#${input}`).children('h1').text('X');
        $(`#${input}`).children('h1').addClass('temp1');
        return;
     }

     //check whether the center cell is available
     if(ground[4] == 0) {
        ground[4] = 2;
        $(`#4`).children('h1').text('X');
        $(`#4`).children('h1').addClass('temp1');
        return;
    }

     //check any corner available 
     let tempArr = [0, 2, 6, 8];
     for(let j = 0;j < tempArr;j++) {
        if(ground[tempArr[j]] == 0) {
            ground[tempArr[j]] = 2;
            $(`#${tempArr[j]}`).children('h1').text('X');
            $(`#${tempArr[j]}`).children('h1').addClass('temp1');
            return;
        }
     }

     //if none of them is available then find an empty cell and mark it
     for(let j = 0;j < ground.length;j++) {
        if(ground[j] == 0) {
            ground[j] = 2;
            $(`#${j}`).children('h1').text('X');
            $(`#${j}`).children('h1').addClass('temp1');
            return;
        }
     }
}

var winIndex = -1;
function checkWin(id) {

    for(let i = 0;i < winArray.length;i++) {
        let count = 0;
        for(let j = 0;j < 3;j++) {
            if(ground[winArray[i][j]] == id) {
                count++;
            }
        }
        if(count == 3) {
            winIndex = i;
            return true;
        }
    }

    return false;
}

function checkWinnable(player) {

    for(let i = 0;i < winArray.length;i++) {
        let count = 0;
        for(let j = 0;j < 3;j++) {
            if(ground[winArray[i][j]] == player) count++;
        }
        if(count == 2) {
            for(let j = 0;j < 3;j++) {
                if(ground[winArray[i][j]] == 0) return  winArray[i][j];
            }
        }
    }

    return -1;
}

var userScore = 0;
var computerScore = 0;
function won(player) {
    $(`.line${winIndex}`).css('opacity', '1');
    if(player === 1) {
        userScore++;
       $('.user > .score').text(`${userScore}`);   
    } else if(player === 2) {
        playerChance = false;
        computerScore++;
        $('.computer > .score').text(`${computerScore}`);
    } else {
        //draw
    }
    playerChance = false;
    setTimeout(() => {
        for(let i = 0;i < ground.length;i++) ground[i] = 0;
        $('.ground > button').children('h1').text('');
        playerChance = true;
        $('.line').css('opacity', '0');
    },3000);
}