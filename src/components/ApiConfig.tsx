'use server';

export async function collectApiConfig() {
  return {
    apiUrl: process.env.API_BASE_URL,
    apiKey: process.env.API_KEY
  };
}