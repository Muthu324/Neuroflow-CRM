/**
 * NeuroFlow CRM - Standard API client interface
 * Ready for connection to FastAPI / Express backend microservices.
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Update this to your actual API base URL

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  });

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`NeuroFlow Client API falling back to browser-simulated client layer. Route: ${endpoint}.`, error);
    throw error;
  }
}
