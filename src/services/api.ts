import type {
  CreateAccountRequest,
  LoginRequest,
  CreateBusinessProfileRequest,
  BusinessProfileResponse,
  AccountLoginResource,
  ApiResponse,
  EInvoiceActionRecord,
  ActionType,
  TaxpayerAuthRecord,
  InvoiceSigningRecord,
  ApiKeyResponse
} from '../types/api'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://l80913jvgc.execute-api.eu-west-3.amazonaws.com/dev'

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const token = localStorage.getItem('auth_token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers as Record<string, string>),
  }

  const res = await fetch(url, { ...options, headers })
  
  // Try to parse as JSON, handle non-JSON responses
  let data;
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message = (data as any)?.message || `API Error: ${res.status}`;
    throw new Error(message);
  }

  // The API wraps responses in an ApiResponse structure { code, message, data }
  if (data && typeof data === 'object' && 'code' in data && 'data' in data) {
    return (data as ApiResponse<T>).data;
  }

  return data as T;
}

export const authApi = {
  // Register a new account after email verification
  register(payload: CreateAccountRequest) {
    return apiCall<AccountLoginResource>('/open/api/user', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Login
  login(payload: LoginRequest) {
    return apiCall<AccountLoginResource>('/open/api/user/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Initiate account setup (send OTP)
  initiateSetup(email: string) {
    return apiCall<void>('/open/api/email-verifications', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Logout
  logout() {
    return apiCall<void>('/api/v1/user/logout', { method: 'POST' })
      .finally(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_profile');
      });
  },

  // Verify TIN
  verifyTin(tin: string) {
    return apiCall<any>('/api/v1/tin-verifications', {
      method: 'POST',
      body: JSON.stringify({ tin }),
    });
  },

  // Create Business Profile
  createProfile(payload: CreateBusinessProfileRequest) {
    return apiCall<BusinessProfileResponse>('/api/v1/business-profile', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Get API Keys
  getApiKeys(businessId: string) {
    return apiCall<ApiKeyResponse>(`/api/v1/business-profile/${businessId}/api-keys`);
  },

  // Mocked for UI flow consistency
  async requestPasswordReset(email: string) {
    console.log('Password reset requested for:', email);
    return { message: 'If an account exists, a reset link has been sent.' };
  },

  async resetPassword(token: string, newPassword: string) {
    console.log('Password reset with token:', token, newPassword);
    return { message: 'Password has been reset successfully.' };
  }
}

export const einvoiceApi = {
  // List all actions (This is our main "invoices" list)
  getActions(type?: ActionType) {
    const query = type ? `?type=${type}` : '';
    return apiCall<EInvoiceActionRecord[]>(`/api/einvoice/actions${query}`);
  },

  // Validate an invoice
  validate(invoice: any) {
    return apiCall<EInvoiceActionRecord>('/api/einvoice/validate', {
      method: 'POST',
      body: JSON.stringify({ invoice }),
    });
  },

  // Report an invoice
  report(payload: any) {
    return apiCall<EInvoiceActionRecord>('/api/einvoice/report', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Sign an invoice
  sign(payload: any) {
    return apiCall<InvoiceSigningRecord>('/api/einvoice/sign', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Get taxpayer logins
  getTaxpayerLogins() {
    return apiCall<TaxpayerAuthRecord[]>('/api/einvoice/taxpayer-logins');
  },

  // Taxpayer authentication
  taxpayerAuth(payload: any) {
    return apiCall<TaxpayerAuthRecord>('/api/einvoice/taxpayer-auth', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Download invoice
  download(irn: string) {
    return apiCall<EInvoiceActionRecord>(`/api/einvoice/download/${irn}`);
  }
}
