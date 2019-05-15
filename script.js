let currentQuote = {};
let quotes;

const COLORS = [
  "rgb(255, 51, 0)",
  "rgb(255, 153, 0)",
  "rgb(153, 102, 51)",
  "rgb(179, 0, 89)",
  "rgb(230, 184, 0)",
  "rgb(204, 204, 0)",
  "rgb(153, 204, 0)",
  "rgb(255, 102, 102)",
  "rgb(0, 51, 102)",
  "rgb(51, 51, 255)",
  "rgb(102, 153, 153)",
  "rgb(51, 153, 102)",
  "rgb(153, 153, 255)",
  "rgb(153, 0, 204)",
  "rgb(0, 51, 0)"
];
const newColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

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

  // Change the colors
  const color = newColor();
  $("body, #new-quote").css("background-color", color);
  $("#quote-box, #tweet-quote i").css("color", color);

  // Add event listeners
  newQuote();
  tweetQuote();
};

// Event Listeners
const newQuote = () =>
  $("#new-quote").on("click", () => {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
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

  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  updateUI(currentQuote);
})();
