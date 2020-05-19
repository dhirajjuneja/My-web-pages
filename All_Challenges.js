function ageIndays(){
    var age =prompt("Whats year you were born?");
    var agess = (2020-age);
    var h1= document.createElement('h1');
    var Text = document.createTextNode("You are "+ agess+ " year old");
     h1.setAttribute("id","agesIndays");
     h1.appendChild(Text);
     document.getElementById("flex-box_results").appendChild(h1);
     }
       
       
       
     function reset(){
     document.getElementById("flex-box_results").remove();
        }
        
    
    function catgenerator(){
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat");
    image.src = "http://www.catgifpage.com/gifs/325.gif";
    div.appendChild(image);
    }
    function rpsGame(yourchoice){
        let humanchoice,botchoice;
        humanchoice = yourchoice.id;
        console.log("Human choice:",humanchoice);
        botchoice   = ToNumber(bot());
        console.log("Computer choice:",botchoice);
        results = decideWinner(humanchoice, botchoice);
        console.log(results);
        printbox = finalmessage(results);
        console.log([printbox]);
        frontend(yourchoice.id, botchoice, printbox);
    
    }
    function bot(){
        return Math.floor(Math.random() * 3); 
    }
    function ToNumber(Number){
        return ["rock", "paper", "scissors"] [Number];
    }
    function decideWinner(yourchoice, computerChoice){
        var database = {
            "rock"     : {"rock": 0.5,"paper":0,"scissors":1},
            "paper"    : {"rock": 1,"paper":0.5,"scissors":0},
            "scissors" : {"rock": 0,"paper":1,"scissors":0.5},
        };
        var yourScore =     database[yourchoice][computerChoice];
        var computerScore = database[computerChoice][yourchoice];
        return [yourScore, computerScore];
    }
    function finalmessage([yourScore, computerScore]){
        if(yourScore == 0){
            return {"message": "You Lost!", "color": "red"};
        }
        else if(yourScore == 0.5)
        {
            return {"message": "You Draw!", "color": "yellow"};
        }
        else{
        return {"message": "You Win!", "color":"green"};
        }
    }
    function frontend(humanImage,botImage, finalmessage){
        var fxdata = {
        "rock" : document.getElementById("rock").src,
        "paper" :document.getElementById("paper").src,
        "scissors" :document.getElementById("scissors").src,
        };
        document.getElementById("rock").remove();
        document.getElementById("paper").remove();
        document.getElementById("scissors").remove();
    
        var humandiv   = document.createElement("div");
        var botdiv     = document.createElement("div");
        var messagediv = document.createElement("div");
    
        humandiv.innerHTML  = "<img src='" + fxdata[humanImage] + "'height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1)'>"
        messagediv.innerHTML= "<h1 style='color:" + finalmessage['color'] + ";font-size:60px; padding:30px; '>" + finalmessage['message'] + "</h1>"
        botdiv.innerHTML = "<img src='" + fxdata[botImage] + "'height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1)' >"
    
        document.getElementById("flex_div_3").appendChild(humandiv);
        document.getElementById("flex_div_3").appendChild(messagediv);
        document.getElementById("flex_div_3").appendChild(botdiv);
    
    }

    var all_buttons = document.getElementsByTagName("button");
    console.log(all_buttons);

    let copy_all_buttons = [];
    for (let i=0;i < all_buttons.length;i++) 
    {
        copy_all_buttons.push(all_buttons[i].classList[1]);
    }

    console.log(copy_all_buttons);
   
    function buttonColorchange(button_Thingy){
        console.log(button_Thingy.value);
        
        if (button_Thingy.value === "random")
        {
            Button_colorChange();
        }
        else if (button_Thingy.value === "red")
        {
            color_red();
        }
        else if (button_Thingy.value === "green")
        {
            color_green();
        }
        else if (button_Thingy.value === "reset")
        {
            color_reset();
        }
        
        
    function color_red(){
        for (let i=0;i < all_buttons.length;i++) 
        {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-danger');
        }
    }
    function color_green()
    {
        for (let i=0;i < all_buttons.length;i++) 
        {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-success');
        }
    }
    function color_reset()
    {
        for (let i=0;i < all_buttons.length;i++) 
        {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copy_all_buttons[i]);
  
        }
    }
    function Button_colorChange()
    {
        let Choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
        for (let i=0; i < all_buttons.length;i++)
        {
            let randomNumber = Math.floor(Math.random() * 4);
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(Choices[randomNumber]);
        }

    }
}    
let blackjacKGame = {
    "you" : {'scoreSpan':'#your-blackjack-result','div':'#your-box', 'score':0},
    "dealer": {'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box', 'score':0},
    "cards":['2',"3", '4', '5', '6', '7', '8','9', '10', "K" ,'J', 'Q', 'A'],
    "cardsMap":{'2':2,"3":3, '4':4, '5':5 , '6': 6, '7': 7, '8': 8,'9':9, '10': 10, "K" :10,'J': 10, 'Q':10 , 'A':[1,11]},
    "wins" : 0,
    "losses" : 0,
    "draws" : 0,
    "isStand": false,
    "turnOver":false,
};
const YOU = blackjacKGame['you']
const DEALER = blackjacKGame['dealer']
let hitSound = new Audio('R:/Challenges/sounds/swish.mp3.m4a');
let winSound = new Audio('R:/Challenges/sounds/cash.mp3');
let lostSound = new Audio('R:/Challenges/sounds/aww.mp3');


document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackhit);
document.querySelector("#blackjack-stand-button").addEventListener('click',dealerlogic);
document.querySelector("#blackjack-deal-button").addEventListener('click',blackjackDeal);




function blackjackhit(){
    if (blackjacKGame['isStand'] === false){    
        let card = randomCards();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerlogic(){
    blackjacKGame['isStand'] = true;

        
    while(DEALER['score'] < 16 && blackjacKGame['isStand'] === true){
        let card = randomCards();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
        blackjacKGame['turnOver'] = true;
        let winner = computewinner();
        showResult(winner);
}    

function randomCards()
{
    let randomIndex = Math.floor(Math.random()*13);
    return blackjacKGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `R:/Challenges/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
        
    }
}


function blackjackDeal(){    
    if(blackjacKGame['turnOver'] === true){
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    
    for (i=0; i < yourImages.length;i++)
    {
        yourImages[i].remove('img');

    }
    for (i=0; i < dealerImages.length;i++)
    {
        dealerImages[i].remove('img');
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    
    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';
    
    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color = 'black';
    
    blackjacKGame['isStand'] = false;
    blackjacKGame['turnOver'] = false;
}

}
function updateScore(card, activePlayer){
    if (card === "A") {
     if (activePlayer['score'] + blackjacKGame['cardsMap'][card][1] <= 21){
         activePlayer['score'] += blackjacKGame['cardsMap'][card][1];
     } else {
         activePlayer['score'] += blackjacKGame['cardsMap'][card][0];
        }
    } else{
        activePlayer['score'] += blackjacKGame['cardsMap'][card];
    }    
}
function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }

}

function computewinner(){
    let winner;
    if (YOU['score'] <= 21){

        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjacKGame['wins']++;
            winner = YOU;
        }
        else if (DEALER['score'] > YOU['score'] || YOU['score'] > 21){
            blackjacKGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            console.log("You Draw!");
            blackjacKGame['draws']++;
        }
        }else if  (YOU['score'] > 21 && DEALER['score'] <= 21){
            blackjacKGame['losses']++;
            winner = DEALER;
        }else if (YOU['score'] > 21 && DEALER['score'] > 21){
            blackjacKGame['draws']++;
        }
        return winner;        
    }
function showResult(winner){
    let message, messageColor;
    if (blackjacKGame['turnOver'] === true){

        if (winner === YOU){
        document.querySelector('#wins').textContent = blackjacKGame['wins'];
        message = "You Win!";
        messageColor = "green";
        winSound.play();
        
        }else if(winner === DEALER){
        document.querySelector('#losses').textContent = blackjacKGame['losses'];
        message = "You Lost!";
        messageColor = "red";
        lostSound.play();        
        
        }else{
        document.querySelector('#draws').textContent = blackjacKGame['draws'];
        message = "You Drew!";
        messageColor = 'darkblue';

        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}



