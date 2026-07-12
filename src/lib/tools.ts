import type { ToolMeta, ToolId } from '../types';

export const TOOLS: ToolMeta[] = [
  {
    id: 'product-description',
    name: 'AI Product Description Generator',
    shortName: 'Product Description',
    description: 'Craft compelling, SEO-friendly product descriptions that convert browsers into buyers.',
    icon: 'FileText',
    placeholder: 'e.g., Handmade resin ocean coaster set with gold flakes',
    examples: [
      'Resin ocean coaster set with gold flakes',
      'Handmade beaded pearl bracelet with silver clasp',
      'Customized dried flower bouquet in pastel tones',
      'Personalized wooden photo frame with engraved names',
    ],
    fields: [
      { id: 'productName', label: 'Product Name', placeholder: 'Resin Ocean Coaster Set' },
      { id: 'details', label: 'Key Details / Materials', placeholder: 'Epoxy resin, gold flakes, blue pigment, cork base', type: 'textarea' },
      { id: 'audience', label: 'Target Audience (optional)', placeholder: 'Home decor enthusiasts, gift buyers', optional: true },
    ],
  },
  {
    id: 'customer-reply',
    name: 'AI Customer Reply Generator',
    shortName: 'Customer Reply',
    description: 'Respond to customer inquiries professionally with warm, on-brand replies.',
    icon: 'MessageCircle',
    placeholder: 'e.g., Customer asking about custom colors and shipping time',
    examples: [
      'Customer asking if the beaded bag comes in other colors',
      'Customer wants to know shipping time to another city',
      'Customer requesting a refund for a damaged item',
      'Customer asking for bulk pricing on 20 bracelets',
    ],
    fields: [
      { id: 'inquiry', label: 'Customer Message', placeholder: 'Do you have this bag in red? How long does shipping take?', type: 'textarea' },
      { id: 'tone', label: 'Reply Tone (optional)', placeholder: 'Friendly, professional, warm', optional: true },
    ],
  },
  {
    id: 'instagram-caption',
    name: 'AI Instagram Caption Generator',
    shortName: 'Caption Generator',
    description: 'Generate scroll-stopping Instagram captions with hashtags that boost engagement.',
    icon: 'Instagram',
    placeholder: 'e.g., New resin jewelry dish collection launch post',
    examples: [
      'Launching a new resin jewelry dish collection',
      'Behind-the-scenes of making beaded bracelets',
      'Showcasing a customized wedding bouquet',
      'Holiday gift guide featuring personalized frames',
    ],
    fields: [
      { id: 'postTopic', label: 'Post Topic', placeholder: 'Launching new resin jewelry dish collection' },
      { id: 'vibe', label: 'Vibe / Mood (optional)', placeholder: 'Cozy, elegant, festive', optional: true },
    ],
  },
  {
    id: 'pricing-assistant',
    name: 'AI Product Pricing Assistant',
    shortName: 'Pricing Assistant',
    description: 'Get smart pricing suggestions based on materials, time, and market positioning.',
    icon: 'DollarSign',
    placeholder: 'e.g., Resin coaster set: materials $8, 2 hours labor, premium positioning',
    examples: [
      'Resin coaster set: materials $8, 2 hours labor',
      'Beaded bag: materials $15, 5 hours labor, luxury market',
      'Custom bouquet: materials $20, 1.5 hours, mid-range',
      'Engraved frame: materials $6, 45 min, budget-friendly',
    ],
    fields: [
      { id: 'product', label: 'Product Name', placeholder: 'Resin Coaster Set' },
      { id: 'materials', label: 'Material Cost ($)', placeholder: '8' },
      { id: 'laborHours', label: 'Labor Hours', placeholder: '2' },
      { id: 'positioning', label: 'Market Position (optional)', placeholder: 'Premium, mid-range, budget', optional: true },
    ],
  },
  {
    id: 'order-confirmation',
    name: 'AI Order Confirmation Generator',
    shortName: 'Order Confirmation',
    description: 'Create polished order confirmation messages that build trust and excitement.',
    icon: 'PackageCheck',
    placeholder: 'e.g., Confirm order #1043 for a customized photo frame',
    examples: [
      'Order #1043: customized photo frame, shipping tomorrow',
      'Order #1050: beaded bracelet set, ready for pickup',
      'Order #1062: resin coaster set, dispatched today',
      'Order #1071: personalized gift box, pre-order',
    ],
    fields: [
      { id: 'orderNumber', label: 'Order Number', placeholder: '#1043' },
      { id: 'product', label: 'Product', placeholder: 'Customized Photo Frame' },
      { id: 'details', label: 'Additional Details (optional)', placeholder: 'Shipping tomorrow via express courier', optional: true, type: 'textarea' },
    ],
  },
  {
    id: 'gift-card-message',
    name: 'AI Gift Card Message Generator',
    shortName: 'Gift Card Generator',
    description: 'Write heartfelt gift card messages for any occasion in seconds.',
    icon: 'Gift',
    placeholder: 'e.g., Birthday gift message for a handmade jewelry set',
    examples: [
      'Birthday gift: handmade beaded bracelet for a best friend',
      'Anniversary gift: customized bouquet for wife',
      'Thank you gift: resin coaster set for a colleague',
      'Wedding gift: personalized frame for the couple',
    ],
    fields: [
      { id: 'occasion', label: 'Occasion', placeholder: 'Birthday, Anniversary, Thank You...' },
      { id: 'recipient', label: 'Recipient (optional)', placeholder: 'Best friend, wife, colleague' },
      { id: 'product', label: 'Product (optional)', placeholder: 'Beaded bracelet, custom bouquet' },
    ],
  },
  {
    id: 'marketing-ideas',
    name: 'AI Marketing Ideas Generator',
    shortName: 'Marketing Ideas',
    description: 'Get creative marketing campaign ideas tailored to your handmade products.',
    icon: 'Lightbulb',
    placeholder: 'e.g., Marketing ideas for a handmade jewelry brand',
    examples: [
      'Marketing ideas for handmade jewelry brand on Instagram',
      'Promo ideas for a holiday resin art sale',
      'Ideas to increase beaded bag sales this summer',
      'Content calendar ideas for a customized gift shop',
    ],
    fields: [
      { id: 'business', label: 'Business / Product Line', placeholder: 'Handmade resin art and jewelry' },
      { id: 'goal', label: 'Marketing Goal (optional)', placeholder: 'Increase sales, grow followers, holiday promo', optional: true },
    ],
  },
  {
    id: 'business-name',
    name: 'AI Business Name Generator',
    shortName: 'Business Name',
    description: 'Generate memorable, brandable business name ideas for your handmade venture.',
    icon: 'Sparkles',
    placeholder: 'e.g., Business names for a handmade resin art studio',
    examples: [
      'Names for a handmade resin art studio',
      'Names for a beaded jewelry brand',
      'Names for a customized gift shop',
      'Names for a botanical bouquet business',
    ],
    fields: [
      { id: 'niche', label: 'Business Niche', placeholder: 'Handmade resin art and home decor' },
      { id: 'style', label: 'Name Style (optional)', placeholder: 'Elegant, playful, minimal, luxury', optional: true },
    ],
  },
  {
    id: 'seo-keywords',
    name: 'AI SEO Keyword Generator',
    shortName: 'SEO Keywords',
    description: 'Discover high-ranking SEO keywords for your handmade product listings.',
    icon: 'Search',
    placeholder: 'e.g., SEO keywords for handmade resin coasters',
    examples: [
      'SEO keywords for handmade resin coasters',
      'Keywords for beaded bags on Etsy',
      'Keywords for personalized photo frames',
      'Keywords for customized dried flower bouquets',
    ],
    fields: [
      { id: 'product', label: 'Product / Listing', placeholder: 'Handmade resin coasters' },
      { id: 'platform', label: 'Platform (optional)', placeholder: 'Etsy, Instagram, own website', optional: true },
    ],
  },
  {
    id: 'email-writer',
    name: 'AI Email Writer',
    shortName: 'Email Writer',
    description: 'Write professional business emails for partnerships, restocks, and announcements.',
    icon: 'Mail',
    placeholder: 'e.g., Email to a supplier about bulk bead pricing',
    examples: [
      'Email to a supplier about bulk bead pricing',
      'Newsletter email about a new product launch',
      'Email to a customer about a delayed shipment',
      'Collaboration pitch email to an influencer',
    ],
    fields: [
      { id: 'purpose', label: 'Email Purpose', placeholder: 'Inquiring about bulk bead pricing from a supplier' },
      { id: 'tone', label: 'Tone (optional)', placeholder: 'Professional, friendly, formal', optional: true },
    ],
  },
];

export const TOOL_MAP: Record<ToolId, ToolMeta> = TOOLS.reduce(
  (acc, t) => ({ ...acc, [t.id]: t }),
  {} as Record<ToolId, ToolMeta>
);

export function getTool(id: string): ToolMeta | undefined {
  return TOOL_MAP[id as ToolId];
}
