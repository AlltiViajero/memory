function shuffle(array) 
{
  array.sort(() => Math.random() - 0.55);
}
var cards =["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg"];
shuffle(cards);
var ile = cards.length;
var c = [];
for (let i = 0; i < ile; i++) 
{
    c[i] = document.getElementById('c' + i);
    c[i].addEventListener("click", () => revealCard(i));
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = ile/2;

function revealCard(nr)
{
	var opacityValue = $('#c'+nr).css('opacity'); //odczytuje wartość w css i ją zapisuje w zmiennej
	
		if(opacityValue != 0 && lock == false && visible_nr != nr)
		{
			lock = true;
			var obraz  = "url(img/" + cards[nr] + ")";
			$('#c'+nr).css('background-image', obraz); 		//metoda css('jaki atrybut ma zostać zmieniony', na jaką warość)
			$('#c'+nr).addClass('cardA'); 		//dopisuje nową klasę ale jej nie zastępuje, a pierszeństwo ma pierwsza klasa zapisana w css
			$('#c'+nr).removeClass('card'); 		//usuwa klasę z obiektu czyli odpina jąod elementu
		
		if(oneVisible == false)
		{
			//first card
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			if(cards[visible_nr] == cards[nr])//sprawdzanie czy pierwsza karta = drugiej 
			{
				setTimeout(function(){hide2Cards(nr, visible_nr)}, 750); //para
			}
			else
			{
				setTimeout(function(){restore2Cards(nr, visible_nr)}, 1000); //pudło
			}
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);
			oneVisible = false;
		}
	}
	
}
function hide2Cards(nr1, nr2) 	//para - widoczność kart zmieniamy na 0 aby już ich nie brać pod uwagę
{
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	pairsLeft--;
	if(pairsLeft == 0)
	{
		$('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns</h1><br/><br/> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>');
	}
	lock = false;
}
function restore2Cards(nr1, nr2)	//pudło - zakrywamy obie karty (dokonujemy podmiany)
{
	$('#c'+nr1).css('background-image', 'url(img/rewers.jpg)'); 		
	$('#c'+nr1).addClass('card'); 		
	$('#c'+nr1).removeClass('cardA');
	
	$('#c'+nr2).css('background-image', 'url(img/rewers.jpg)'); 		
	$('#c'+nr2).addClass('card'); 		
	$('#c'+nr2).removeClass('cardA');
	lock = false;
}











