const quote = document.getElementById("mySmall");
const author = document.getElementById("mySmall2");
const myButton = document.getElementById("quote-button");

myButton.addEventListener("click", () => updateQuote());

export async function updateQuote(response, data) {
  if (response.ok) {
    quote.textContent = data.content;
    author.textContent = data.author;
  } else {
    quote.textContent = "An error occured";
  }
}
