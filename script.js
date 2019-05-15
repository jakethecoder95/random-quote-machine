let currentQuote = {};
let quotes;

const updateUI = ({ quote, author }) => {
  const newHTML = `
    <p id="text">${quote}</p>
    <p id="author">- ${author}</p>
    <button id="tweet-quote" class="btn">
      <i class="fa fa-twitter"></i>
    </button>
    <button id="new-quote" class="btn">New Quote</button>
  `;
  $("#quote-box").html(newHTML);

  // Add event listeners
  newQuote();
  tweetQuote();
};

// Event Listeners
const newQuote = () =>
  $("#new-quote").on("click", () => {
    currentQuote = quotes[Math.floor(Math.random() * 102)];
    updateUI(currentQuote);
  });

const tweetQuote = () =>
  $("#tweet-quote").on("click", "*", () => {
    window.open(
      `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${
        currentQuote.quote
      }" ${currentQuote.author}`,
      "Share",
      "width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0"
    );
  });

// Initialize application
(async () => {
  quotes = JSON.parse(
    await $.ajax({
      headers: {
        Accept: "application/json"
      },
      url:
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    })
  ).quotes;

  currentQuote = quotes[Math.floor(Math.random() * 102)];
  updateUI(currentQuote);
})();
