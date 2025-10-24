export type AgeRange = 'Below 30' | '31-40' | '41-50' | '51-60' | 'Above 60' | '';
export type Language = 'English' | 'Hindi' | 'Tamil' | 'Telugu' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Kannada' | 'Malayalam' | 'Punjabi' | '';
export type Tenant = 'sbi' | 'axis';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  ageRange: AgeRange;
  language: Language;
  website?: string;
  tenant: Tenant;
  createdAt: string;
  updatedAt: string;
}

export interface TenantProps {
  id: Tenant;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface UsersState {
  users: User[];
}

export interface TenantState {
  tenantData: TenantProps | null;
}
