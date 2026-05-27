/**
 * AI Service
 * Handles AI/ML agent interactions and backend calls
 */

/**
 * Send message to AI agent
 */
export const sendAIMessage = async (message, context = {}) => {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    })

    if (!response.ok) throw new Error('AI Service Error')
    return await response.json()
  } catch (error) {
    console.error('AI Service Error:', error)
    throw error
  }
}

/**
 * Get AI recommendations for leads
 */
export const getLeadRecommendations = async (leadId) => {
  try {
    const response = await fetch(`/api/ai/recommendations/leads/${leadId}`)
    if (!response.ok) throw new Error('Failed to get recommendations')
    return await response.json()
  } catch (error) {
    console.error('Recommendation Error:', error)
    throw error
  }
}

/**
 * Analyze campaign performance with AI
 */
export const analyzeCampaign = async (campaignData) => {
  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData),
    })

    if (!response.ok) throw new Error('Analysis Error')
    return await response.json()
  } catch (error) {
    console.error('Analysis Error:', error)
    throw error
  }
}

/**
 * Get AI insights
 */
export const getInsights = async () => {
  try {
    const response = await fetch('/api/ai/insights')
    if (!response.ok) throw new Error('Failed to get insights')
    return await response.json()
  } catch (error) {
    console.error('Insights Error:', error)
    throw error
  }
}

export default {
  sendAIMessage,
  getLeadRecommendations,
  analyzeCampaign,
  getInsights,
}
