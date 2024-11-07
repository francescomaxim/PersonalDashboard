const quote = document.getElementById("mySmall");
const author = document.getElementById("mySmall2");
const myButton = document.getElementById("quote-button");

myButton.addEventListener("click", () => updateQuote());

async function updateQuote() {
  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (response.ok) {
    quote.textContent = data.content;
    author.textContent = data.author;
  } else {
    quote.textContent = "An error occured";
  }
}

updateQuote();
