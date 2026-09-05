export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  quantity: string;
  specifications: string;
}
