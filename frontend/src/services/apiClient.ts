import axios, { AxiosInstance, AxiosError } from 'axios';

/**
 * Production API Client for NeuroFlow CRM
 * Handles all HTTP requests with JWT authentication
 */


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Automatically inject JWT token into headers if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class APIClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load tokens from session storage (not localStorage)
    this.loadTokens();

    // Add request interceptor for auth
    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newTokens = await this.refreshAccessToken();
            if (newTokens) {
              this.setTokens(newTokens.access_token, newTokens.refresh_token);
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // ========================================================================
  // TOKEN MANAGEMENT
  // ========================================================================

  private loadTokens(): void {
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  private async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${this.refreshToken}`,
      },
    });

    return response.data;
  }

  // ========================================================================
  // AUTH ENDPOINTS
  // ========================================================================

  async signup(email: string, username: string, password: string, fullName?: string) {
    const response = await this.client.post('/auth/signup', {
      email,
      username,
      password,
      full_name: fullName,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', {
      email,
      password,
    });
    
    if (response.data.access_token && response.data.refresh_token) {
      this.setTokens(response.data.access_token, response.data.refresh_token);
    }
    
    return response.data;
  }

  async logout() {
    this.clearTokens();
  }

  // ========================================================================
  // USER ENDPOINTS
  // ========================================================================

  async getCurrentUser() {
    const response = await this.client.get('/users/me');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.client.put('/users/me', data);
    return response.data;
  }

  // ========================================================================
  // LEADS ENDPOINTS
  // ========================================================================

  async getLeads(skip = 0, limit = 100, filters?: any) {
    const response = await this.client.get('/leads', {
      params: { skip, limit, ...filters },
    });
    return response.data;
  }

  async searchLeads(query: string) {
    const response = await this.client.get('/leads/search', {
      params: { q: query },
    });
    return response.data;
  }

  async getLead(id: number) {
    const response = await this.client.get(`/leads/${id}`);
    return response.data;
  }

  async createLead(data: any) {
    const response = await this.client.post('/leads', data);
    return response.data;
  }

  async updateLead(id: number, data: any) {
    const response = await this.client.put(`/leads/${id}`, data);
    return response.data;
  }

  async deleteLead(id: number) {
    await this.client.delete(`/leads/${id}`);
  }

  async addLeadTimelineEvent(leadId: number, event: any) {
    const response = await this.client.post(`/leads/${leadId}/timeline`, event);
    return response.data;
  }

  async getHotLeads() {
    const response = await this.client.get('/leads/status/hot');
    return response.data;
  }

  async getLeadsByPlatform(platform: string) {
    const response = await this.client.get(`/leads/platform/${platform}`);
    return response.data;
  }

  // ========================================================================
  // PROJECTS ENDPOINTS
  // ========================================================================

  async getProjects(skip = 0, limit = 100, status?: string) {
    const response = await this.client.get('/projects', {
      params: { skip, limit, status },
    });
    return response.data;
  }

  async getProject(id: number) {
    const response = await this.client.get(`/projects/${id}`);
    return response.data;
  }

  async createProject(data: any) {
    const response = await this.client.post('/projects', data);
    return response.data;
  }

  async updateProject(id: number, data: any) {
    const response = await this.client.put(`/projects/${id}`, data);
    return response.data;
  }

  async deleteProject(id: number) {
    await this.client.delete(`/projects/${id}`);
  }

  async addProjectTask(projectId: number, task: any) {
    const response = await this.client.post(`/projects/${projectId}/tasks`, task);
    return response.data;
  }

  async updateProjectTask(projectId: number, taskId: number, data: any) {
    const response = await this.client.put(`/projects/${projectId}/tasks/${taskId}`, data);
    return response.data;
  }

  async deleteProjectTask(projectId: number, taskId: number) {
    await this.client.delete(`/projects/${projectId}/tasks/${taskId}`);
  }

  // ========================================================================
  // FOLLOWUPS ENDPOINTS
  // ========================================================================

  async getFollowUps(skip = 0, limit = 100, status?: string) {
    const response = await this.client.get('/followups', {
      params: { skip, limit, status },
    });
    return response.data;
  }

  async getPendingFollowUps() {
    const response = await this.client.get('/followups/pending');
    return response.data;
  }

  async getOverdueFollowUps() {
    const response = await this.client.get('/followups/overdue');
    return response.data;
  }

  async getFollowUp(id: number) {
    const response = await this.client.get(`/followups/${id}`);
    return response.data;
  }

  async createFollowUp(data: any) {
    const response = await this.client.post('/followups', data);
    return response.data;
  }

  async updateFollowUp(id: number, data: any) {
    const response = await this.client.put(`/followups/${id}`, data);
    return response.data;
  }

  async completeFollowUp(id: number) {
    const response = await this.client.post(`/followups/${id}/complete`);
    return response.data;
  }

  async deleteFollowUp(id: number) {
    await this.client.delete(`/followups/${id}`);
  }

  // ========================================================================
  // NOTIFICATIONS ENDPOINTS
  // ========================================================================

  async getNotifications(skip = 0, limit = 100, unreadOnly = false) {
    const response = await this.client.get('/notifications', {
      params: { skip, limit, unread_only: unreadOnly },
    });
    return response.data;
  }

  async getUnreadNotificationCount() {
    const response = await this.client.get('/notifications/unread-count');
    return response.data.unread_count;
  }

  async markNotificationAsRead(id: number) {
    const response = await this.client.put(`/notifications/${id}`, {
      read: true,
    });
    return response.data;
  }

  async markAllNotificationsAsRead() {
    const response = await this.client.post('/notifications/mark-all-as-read');
    return response.data.marked_as_read;
  }

  async deleteNotification(id: number) {
    await this.client.delete(`/notifications/${id}`);
  }

  // ========================================================================
  // AI ENDPOINTS (Future)
  // ========================================================================

  async getAILeadScore(leadId: number) {
    const response = await this.client.get(`/ai/leads/${leadId}/score`);
    return response.data;
  }

  async generateAIFollowUpSuggestion(leadId: number) {
    const response = await this.client.post(`/ai/followups/suggest`, {
      lead_id: leadId,
    });
    return response.data;
  }
}

// Create singleton instance
export const apiClient = new APIClient();

// Export for use in components
export default apiClient;
