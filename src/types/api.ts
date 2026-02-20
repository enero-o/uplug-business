export type EntityRole = 'BUSINESS' | 'SYSTEM_INTEGRATOR' | 'ADMIN';
export type IndustryClassification = 'SYSTEM_INTEGRATOR' | 'AGRICULTURE' | 'MINING' | 'MANUFACTURING' | 'ENERGY' | 'CONSTRUCTION' | 'RETAIL' | 'TRANSPORTATION' | 'INFORMATION' | 'FINANCE' | 'REAL_ESTATE' | 'SCIENTIFIC' | 'ADMINISTRATIVE' | 'EDUCATION' | 'HEALTHCARE' | 'ARTS' | 'ACCOMMODATION' | 'OTHER_SERVICES' | 'PUBLIC_ADMINISTRATION';
export type ReportingMethod = 'REAL_TIME' | 'BATCH' | 'MANUAL_ENTRY';
export type ErpSolution = 'SAP' | 'ORACLE' | 'MICROSOFT_DYNAMICS' | 'SAGE' | 'QUICKBOOKS' | 'XERO' | 'NETSUITE' | 'ZOHO' | 'TALLY' | 'CUSTOM' | 'OTHER';
export type NotificationPreference = 'SMS' | 'EMAIL' | 'PHONE' | 'PUSH_NOTIFICATION';
export type ExchangeFramework = 'JSON' | 'XML';
export type ActionType = 'VALIDATE' | 'VALIDATE_IRN' | 'CONFIRM' | 'DOWNLOAD' | 'UPDATE' | 'REPORT' | 'EXCHANGE_SELF_HEALTH' | 'EXCHANGE_LOOKUP_IRN' | 'EXCHANGE_LOOKUP_TIN' | 'EXCHANGE_TRANSMIT' | 'EXCHANGE_CONFIRM_RECEIPT' | 'EXCHANGE_PULL';

export interface CreateAccountRequest {
  email: string;
  password?: string;
  otp: string;
  entityRole: EntityRole;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface InitiateAccountSetupRequest {
  email: string;
}

export interface TinVerificationRequest {
  tin: string;
}

export interface CreateBusinessProfileRequest {
  tinRequestId: string;
  industryClassification: IndustryClassification;
  reportingMethods: ReportingMethod;
  erpSolution: ErpSolution;
  aggregateTurnover?: number;
  notificationPreferences?: NotificationPreference;
  preferredInvoiceExchangeFramework?: ExchangeFramework;
}

export interface BusinessProfileResponse {
  id: string;
  industryClassification: IndustryClassification;
  reportingMethods: ReportingMethod;
  erpSolution: ErpSolution;
  aggregateTurnover?: number;
  notificationPreferences?: NotificationPreference;
  preferredInvoiceExchangeFramework?: ExchangeFramework;
  tin: TinResponse;
}

export interface TinResponse {
  id: string;
  tin: string;
  status: 'VERIFIED' | 'FAILED';
  businessName: string;
}

export interface AccountLoginResource {
  email: string;
  token: string;
  accessOptions: string[];
  businessProfile: BusinessProfileResponse;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface CanonicalAddress {
  street?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
}

export interface CanonicalParty {
  name?: string;
  tin?: string;
  email?: string;
  telephone?: string;
  businessDescription?: string;
  address?: CanonicalAddress;
}

export interface CanonicalInvoiceLine {
  description?: string;
  quantity?: number;
  unitPrice?: number;
  lineExtensionAmount?: number;
  taxCategoryId?: string;
}

export interface CanonicalInvoice {
  businessId?: string;
  irn?: string;
  issueDate?: string;
  dueDate?: string;
  invoiceTypeCode?: string;
  invoiceKind?: string;
  paymentStatus?: string;
  note?: string;
  taxPointDate?: string;
  documentCurrencyCode?: string;
  taxCurrencyCode?: string;
  accountingCost?: string;
  buyerReference?: string;
  supplier?: CanonicalParty;
  customer?: CanonicalParty;
  taxTotals?: any[];
  lineExtensionAmount?: number;
  taxExclusiveAmount?: number;
  taxInclusiveAmount?: number;
  payableAmount?: number;
  invoiceLines?: CanonicalInvoiceLine[];
}

export interface EInvoiceActionRecord {
  id: string;
  createdAt: string;
  actionType: ActionType;
  reference?: string;
  payloadJson?: string;
  status?: string;
  message?: string;
  responseBody?: string;
}

export interface TaxpayerAuthRecord {
  id: string;
  createdAt: string;
  email: string;
  code?: string;
  requestId?: string;
  status?: string;
  message?: string;
  receivedAt?: string;
  entityId?: string;
}

export interface InvoiceSigningRecord {
  id: string;
  createdAt: string;
  businessId?: string;
  irn?: string;
  invoiceJson: string;
  status?: string;
  message?: string;
  responseBody?: string;
}

export interface ApiKeyResponse {
  publicKey: string;
  secretKey: string;
  active: boolean;
}
