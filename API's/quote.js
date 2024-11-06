const quote = document.getElementById("mySmall");
const author = document.getElementById("mySmall2");

async function updateQuote() {
    const maxQuoteLength = 150;
    let quoteText = "";
    let authorText = "";

    while (!quoteText || quoteText.length > maxQuoteLength) {
        // Fetch a random quote from the Quotable API
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (response.ok) {
            quoteText = data.content;
            authorText = data.author;
        } else {
            quote.textContent = "An error occurred";
            console.log(data);
            break; 
        }
    }

    // Display the quote if it meets the length requirement
    quote.textContent = quoteText;
    author.textContent = "-" + authorText;
}

updateQuote();
