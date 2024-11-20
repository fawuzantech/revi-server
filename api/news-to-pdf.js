import { fetchTrendingNews } from '../utils/fetchNews';
import { summarizeWithAnthropic } from './utils/anthropicClient';
import { generatePDF } from '../utils/pdfGenerator';

export default async function handler(req, res) {
  try {
    // Fetch trending news
    const news = await fetchTrendingNews();

    // Summarize each news article using Claude (Anthropic API)
    const summaries = await Promise.all(
      news.map(article => summarizeWithAnthropic(article))
    );

    // Generate a PDF containing the summaries
    const pdfBuffer = await generatePDF(summaries);

    // Send the generated PDF to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=news-summary.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}
