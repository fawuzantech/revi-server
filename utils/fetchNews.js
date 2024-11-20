import axios from 'axios';

export async function fetchTrendingNews() {
  const apiKey = process.env.NEWS_API_KEY; // Add this to your .env file
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  
  const { data } = await axios.get(url);

  if (!data.articles || data.articles.length === 0) {
    throw new Error('No news articles found.');
  }

  // Extract relevant fields for summarization
  return data.articles.map(article => ({
    title: article.title,
    description: article.description,
    url: article.url
  }));
}
