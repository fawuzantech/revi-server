import axios from 'axios';

const anthropicApiKey = process.env.ANTHROPIC_API_KEY; // Set this in your .env file on Vercel

export async function summarizeWithAnthropic(article) {
  const prompt = `You are a helpful assistant. Summarize the following news article in a concise paragraph:\n\nTitle: ${article.title}\n\nDescription: ${article.description}\n\nSummary:`;

  const response = await axios.post(
    'https://api.anthropic.com/v1/complete',
    {
      model: 'claude-v1', // Specify the version of Claude you want to use
      prompt,
      max_tokens_to_sample: 150,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${anthropicApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.data || !response.data.completion) {
    throw new Error('Anthropic API did not return a completion.');
  }

  return response.data.completion.trim();
}
