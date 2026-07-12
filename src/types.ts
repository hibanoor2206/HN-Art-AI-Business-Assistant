export type ToolId =
  | 'product-description'
  | 'customer-reply'
  | 'instagram-caption'
  | 'pricing-assistant'
  | 'order-confirmation'
  | 'gift-card-message'
  | 'marketing-ideas'
  | 'business-name'
  | 'seo-keywords'
  | 'email-writer';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ToolMeta {
  id: ToolId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  placeholder: string;
  examples: string[];
  fields: { id: string; label: string; placeholder: string; optional?: boolean; type?: 'text' | 'textarea' }[];
}

export type DashView = ToolId | 'dashboard' | 'products' | 'settings';
export type AppView = 'landing' | 'dashboard';
