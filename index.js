const accesskey ="4a72e5f6eeb943a8b000dc8f67ea6c2f";

const blogsContainer = document.getElementById("container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function getNews() {
    try {
    
        const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${accesskey}`;

        const response = await fetch(url);
        const data = await response.json();
        return data.articles;

    
    } catch (error) {
        console.error(error);
        return [];
    }
}


searchButton.addEventListener("click", async () => {

    const query = searchInput.value;

    if (query !== "")  {
        try {
            const news = await fetchNewsQuery(query);
            displayNews(news);

        } catch (error) {
            console.error(error);
            
        }
    }

})


async function fetchNewsQuery(query) {
    try {
    
        const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${accesskey}`;

        const response = await fetch(url);
        const data = await response.json();
        return data.articles;

    
    } catch (error) {
        console.error(error);
        return [];
    }
}

function displayNews(news) {

   
        blogsContainer.innerHTML = "";

        news.forEach(newsItem => {
            const newscard = document.createElement("div");
            newscard.classList.add("blog-card");

            const image = document.createElement("img");
            image.src = newsItem.urlToImage;
            image.alt = newsItem.title;

            const title = document.createElement("h2");
            const trunkcartedTittle = newsItem.title.length > 50 ? newsItem.title.slice(0, 50) + "..." : newsItem.title;
            title.textContent = trunkcartedTittle;
            
            const description = document.createElement("p");
            const trunkcarteddes = (newsItem && newsItem.description) ? 
            (newsItem.description.length > 100 ? newsItem.description.slice(0, 100) + "..." : newsItem.description) :
            "No description available";
           
            description.textContent = trunkcarteddes;

            newscard.appendChild(image);
            newscard.appendChild(title);
            newscard.appendChild(description);
            newscard.addEventListener("click", () => {
                window.open(newsItem.url, "_blank");
            })
            blogsContainer.appendChild(newscard);
        });
    }




(async () => {
    try {
        const news = await getNews();
        displayNews(news);
    } catch (error) {
        console.error(error);
    }
})();
