const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const facebookButton = document.getElementById('facebook');
const loader = document.getElementById('loader');
const element = document.querySelector('.quote-text');
const element2 = document.querySelector('.quote-author')

//Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    loading();
    try {
        const response = await  fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    }catch (error){
        getQuote();
    }

}

function openFacebook(){
    const facebookUrl = `https://www.facebook.com`;
    window.open(facebookUrl, '_blank');;
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
    newQuoteButton.addEventListener("click", getQuote);
    twitterButton.addEventListener("click", tweetQuote);
    facebookButton.addEventListener("click", openFacebook)
//On Load
    getQuote();

//Animations
    //Quote animation
element.classList.add('animate__animated', 'animate__lightSpeedInRight');
element.style.setProperty('--animate-duration', '2s');
    //Author animation
element2.classList.add('animate__animated', 'animate__fadeInLeftBig');
element2.style.setProperty('--animate-duration', '2s');