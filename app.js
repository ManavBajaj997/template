//getting quotes

const quotes = document.querySelector('#quote');
const quoteContainer = document.querySelector('#quote-container');
const author = document.querySelector('#author');
const newQuote = document.querySelector('#new-quote');
const postTweet = document.querySelector('#twitter');
const loader = document.querySelector('#load');

function loading() {
  //   loader.hidden = false;
  //   quoteContainer.hidden = true;
  loader.style.display = 'block';
  quoteContainer.style.display = 'none';
}

function loadingIsComplete() {
  //   quoteContainer.hidden = false;
  //   loader.hidden = true;
  loader.style.display = 'none';
  quoteContainer.style.display = 'block';
}

async function getQuote() {
  loading();
  const proxiServer = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxiServer + apiUrl);
    const data = await response.json();

    //in case if there is no author
    if (data.quoteAuthor === '') {
      author.textContent = 'Unknown';
    } else {
      author.textContent = `${data.quoteAuthor}`;
    }

    //lowering the font sizr

    if (data.quoteText.length > 120) {
      quotes.classList.add('long-quote');
    } else {
      quotes.classList.remove('long-quote');
    }
    quotes.textContent = `${data.quoteText}`;
  } catch (err) {
    console.log(`This is not working ${err}`);
  }
  loadingIsComplete();
}

function twitter() {
  const quote = quotes.innerText;
  const authors = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authors}`;
  window.open(twitterUrl, '_blank');
}
newQuote.addEventListener('click', getQuote);
postTweet.addEventListener('click', twitter);

getQuote();
//loading();
