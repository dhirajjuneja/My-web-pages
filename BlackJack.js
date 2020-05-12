let blackjackGame = {
	'you':{'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score': 0},
	'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
	'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
	'cardsMap':{'2':2, '3':3, '4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

//hit button
function blackjackHit(){
	if(blackjackGame['isStand']=== false){
	  let card = randomCard(); 
	  //console.log(card);
	  showCard(card,YOU);
	  updateScore(card, YOU);
	  showScore(YOU);
	}
}

//logic for selecting random cards

function randomCard(){
	let randomIndex = Math.floor(Math.random() * 13);
	return blackjackGame['cards'][randomIndex];
}

// logic to display card on our front end
 function showCard(card, activePlayer){
 	if (activePlayer['score'] <= 21){
 	  let cardImage = document.createElement('img');
 	  cardImage.src = `static/images/${card}.PNG`;
 	  document.querySelector(activePlayer['div']).appendChild(cardImage);
 	  hitSound.play();
 	}
}

// deal button
function blackjackDeal(){
	//showResult(computeWinner());
	if (blackjackGame['turnsOver'] === true){
		blackjackGame['isStand'] = false;
		let yourImages = document.querySelector('#your-box').querySelectorAll('img');
		let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

		for(i=0; i < yourImages.length; i++){
			yourImages[i].remove();
		}

		for(i=0; i < dealerImages.length; i++){
			dealerImages[i].remove();
		}
		

		YOU['score'] = 0;
		DEALER['score'] = 0;

		document.querySelector('#your-blackjack-result').textContent = 0;
		document.querySelector('#dealer-blackjack-result').textContent = 0;

		document.querySelector('#your-blackjack-result').style.color = '#fff';
		document.querySelector('#dealer-blackjack-result').style.color = '#fff';

		document.querySelector('#blackjack-result').textContent = "Let's Deal";
		document.querySelector('#blackjack-result').style.color = 'black';
        
        blackjackGame['turnsOver'] = true;
    }
}


//logic to update scores by adding the value of the cards
function updateScore(card, activePlayer){
	if (card === 'A'){

		if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
			activePlayer['score'] += blackjackGame['cardsMap'][card][1];
		}else{
			activePlayer['score'] += blackjackGame['cardsMap'][card][0];
		}
    }else{
    	activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
//logic for displaying scores
function showScore(activePlayer){
	 if (activePlayer['score'] > 21){
	 	document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
	 	document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

	 }else{
     document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } 
 }  
 
 // timer for bot
 function sleep(ms){
 	return new Promise(resolve => setTimeout(resolve, ms));
 }

 // logic for dealer (manual play)// which works through the stand button
/*
function dealerLogic(){
	blackjackGame['isStand'] = true;
	let card = randomCard();
	showCard(card,DEALER);
	updateScore(card, DEALER);
	showScore(DEALER);
	
	if(DEALER['score'] > 15){
        blackjackGame['turnsOver'] = true;
		let winner = computeWinner();
		showResult(winner);
	}
}
 */

 // logic for stand button automated play
 async function dealerLogic(){
 	blackjackGame['isStand'] = true;

 	while (DEALER['score'] < 16 && blackjackGame['isStand'] === true){
 		let card = randomCard();
 		showCard(card, DEALER);
 		updateScore(card, DEALER);
 		showScore(DEALER);
 		await sleep(1000);
 	}

 	blackjackGame['turnsOver'] = true;
 	let winner = computeWinner();
 	showResult(winner);
 }

// logic to compute winner and return the winner

function computeWinner(){
	let winner;

	if (YOU['score'] <=21){
		//condition: higher score than dealer or when dealer busts but you score below 21
		if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
			//console.log('You won!');
			blackjackGame['wins']++;
			winner = YOU;

		}else if (YOU['score'] < DEALER['score']){
			//console.log('You lost!');
			blackjackGame['losses']++;
			winner = DEALER;

		}else if(YOU['score'] === DEALER['score'] ){
			//console.log('You drew!');
			blackjackGame['draws']++;

		}
	//condition: when user busts but dealer doesn't

	}else if(YOU['score'] > 21 && DEALER['score'] <= 21){
		//console.log('You lost!');
		blackjackGame['losses']++;
		winner = DEALER;
	//condition: when you and the dealer busts

	}else if (YOU['score'] > 21 && DEALER['score'] > 21){
		//console.log('You drew!');
		blackjackGame['draws']++;
	}

	console.log(blackjackGame);
	return winner;

}

// logic to show results of the game
function showResult(winner){
	let message, messageColor;

	if (blackjackGame['turnsOver'] === true){

		if(winner === YOU){
			document.querySelector('#wins').textContent = blackjackGame['wins'];
			message = 'You Won!';
			messageColor = 'green';
			winSound.play();

		}else if(winner === DEALER){
			document.querySelector('#losses').textContent = blackjackGame['losses'];
			message = 'You Lost!';
			messageColor = 'red';
			loseSound.play();

		}else{
			document.querySelector('#draws').textContent = blackjackGame['draws'];
			message = 'You Drew!';
			messageColor = 'black';
		}

		document.querySelector('#blackjack-result').textContent = message;
		document.querySelector('#blackjack-result').style.color = messageColor;
    }
}