export async function fetchNews(response, data) {
  try {
    if (data.status === "ok" && data.articles) {
      displayNews(data.articles);
    } else {
      console.error("Error fetching news:", data);
      document.getElementById("news-info").textContent = "Error loading news.";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("news-info").textContent = "Error loading news.";
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById("news-info");
  newsContainer.innerHTML = "";

  articles.slice(0, 2).forEach((article) => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const title = document.createElement("h3");
    title.classList.add("news-title");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.classList.add("news-description");
    description.textContent =
      article.description || "No description available.";

    const link = document.createElement("a");
    link.classList.add("news-link");
    link.href = article.url;
    link.target = "_blank";
    link.textContent = "Read more";

    newsItem.appendChild(title);
    newsItem.appendChild(description);
    newsItem.appendChild(link);

    newsContainer.appendChild(newsItem);
  });

  newsContainer.scrollTop = 0;
}
