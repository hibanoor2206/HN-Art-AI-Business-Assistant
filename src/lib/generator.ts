import type { ToolId } from '../types';

type FieldValues = Record<string, string>;

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const OPENERS = [
  'Handcrafted with love and precision,',
  'Every piece tells a story —',
  'Designed for those who appreciate the art of handmade,',
  'A true labor of creativity,',
  'Meticulously crafted by hand,',
];

const CLOSERS = [
  'A perfect gift for someone special — or a well-deserved treat for yourself.',
  'Each piece is unique, just like the person who owns it.',
  'Bring a touch of handmade elegance into your world today.',
  'Limited quantities — once it\'s gone, it\'s gone.',
  'Made with passion, delivered with care.',
];

export function generateContent(toolId: ToolId, fields: FieldValues): string {
  const seed = hashStr(Object.values(fields).join('|') + toolId);
  const v = Object.fromEntries(Object.entries(fields).map(([k, val]) => [k, val.trim()]));

  switch (toolId) {
    case 'product-description':
      return genProductDescription(v, seed);
    case 'customer-reply':
      return genCustomerReply(v, seed);
    case 'instagram-caption':
      return genInstagramCaption(v, seed);
    case 'pricing-assistant':
      return genPricing(v, seed);
    case 'order-confirmation':
      return genOrderConfirmation(v, seed);
    case 'gift-card-message':
      return genGiftCard(v, seed);
    case 'marketing-ideas':
      return genMarketingIdeas(v, seed);
    case 'business-name':
      return genBusinessName(v, seed);
    case 'seo-keywords':
      return genSeoKeywords(v, seed);
    case 'email-writer':
      return genEmail(v, seed);
    default:
      return 'Content generated successfully.';
  }
}

function genProductDescription(v: FieldValues, seed: number): string {
  const name = v.productName || 'this handmade piece';
  const details = v.details || 'premium materials and expert craftsmanship';
  const audience = v.audience ? ` Perfect for ${v.audience.toLowerCase()},` : '';
  const opener = pick(OPENERS, seed);
  const closer = pick(CLOSERS, seed >> 2);

  return `${opener} ${name} is a one-of-a-kind creation born from passion and artistry. Crafted using ${details.toLowerCase()}, this piece stands out with its distinctive character and impeccable finish.${audience} it brings a touch of elegance and authenticity to any space.

✨ Handmade with premium-quality materials
✨ Unique design — no two pieces are exactly alike
✨ Thoughtfully packaged, ready for gifting

${closer}

Dimensions & care: Each item is carefully sealed and finished for lasting beauty. Wipe gently with a soft, dry cloth to maintain its shine.`;
}

function genCustomerReply(v: FieldValues, seed: number): string {
  const inquiry = v.inquiry || 'your inquiry';
  const tone = v.tone?.toLowerCase() || 'warm and professional';
  const opener = pick([
    'Thank you so much for reaching out!',
    'Hi there! Thank you for your interest in our handmade collection.',
    'Hello! We absolutely love hearing from our customers.',
    'Thank you for your message — we\'re thrilled you\'re interested!',
  ], seed);

  return `${opener}

Regarding your question: ${inquiry}

Here's what I can share:
• Yes, we'd be happy to help with this! All our pieces are handmade with care.
• Production typically takes 3–5 business days, and shipping takes an additional 2–4 days depending on your location.
• Customization is always welcome — just let us know your preferences and we'll make it happen.

We strive to keep our tone ${tone} in every interaction, and we want you to feel confident and excited about your purchase.

Is there anything else you'd like to know? Feel free to reply here or message us on WhatsApp/Instagram. We usually respond within a few hours! 🌿

Warm regards,
The HN Art AI Team`;
}

function genInstagramCaption(v: FieldValues, seed: number): string {
  const topic = v.postTopic || 'our latest handmade creation';
  const vibe = v.vibe ? ` ${v.vibe.toLowerCase()} vibes only` : '';
  const emoji = pick(['✨', '🌿', '💫', '🎨', '🌸', '🤎'], seed);
  const hook = pick([
    `Stop scrolling — ${topic.toLowerCase()} is here!`,
    `Something beautiful just dropped 🤍`,
    `You asked, we delivered!`,
    `New creation alert! ${emoji}`,
    `Crafted with love, shared with you.`,
  ], seed);

  return `${hook}

${topic}. Every detail is made by hand, with intention and heart.${vibe}

We pour our creativity into every piece, and seeing your reactions makes it all worth it. 🤎

Which one is your favorite? Let us know in the comments! 👇

#HandmadeWithLove #ArtisanCrafts #HNArtAI #ResinArt #HandmadeJewelry #SmallBusiness #CraftedWithCare #SupportLocal #MakerLife #CreativeBusiness #HandmadeDesign #ArtisanMade #GiftIdeas #CustomMade #HandmadeGifts`;
}

function genPricing(v: FieldValues, _seed: number): string {
  const product = v.product || 'your product';
  const materials = parseFloat(v.materials) || 0;
  const hours = parseFloat(v.laborHours) || 0;
  const positioning = v.positioning?.toLowerCase() || 'mid-range';

  const hourlyRate = positioning.includes('premium') || positioning.includes('luxury') ? 25 : positioning.includes('budget') ? 12 : 18;
  const laborCost = hours * hourlyRate;
  const baseCost = materials + laborCost;

  const markup = positioning.includes('premium') ? 2.5 : positioning.includes('budget') ? 1.5 : 2.0;
  const suggestedPrice = Math.round((baseCost * markup) / 5) * 5;

  const range = positioning.includes('premium') ? [suggestedPrice, Math.round(suggestedPrice * 1.3 / 5) * 5] : [Math.round(suggestedPrice * 0.85 / 5) * 5, suggestedPrice];

  return `💰 Pricing Analysis for: ${product}

📊 Cost Breakdown:
   • Materials: $${materials.toFixed(2)}
   • Labor (${hours}h @ $${hourlyRate}/hr): $${laborCost.toFixed(2)}
   • Total Base Cost: $${baseCost.toFixed(2)}

🏷 Suggested Price Range: $${range[0]} – $${range[1]}
   • Recommended Price: $${suggestedPrice}
   • Profit Margin: ${(suggestedPrice - baseCost).toFixed(2)} (${(((suggestedPrice - baseCost) / suggestedPrice) * 100).toFixed(0)}% margin)

💡 Strategy Notes:
   • Positioning: ${positioning}
   • Your labor rate of $${hourlyRate}/hr reflects ${positioning.includes('premium') ? 'premium craftsmanship' : positioning.includes('budget') ? 'accessible pricing' : 'standard market rates'}
   • Consider bundle pricing (e.g., "Buy 2 save 10%") to increase average order value
   • For custom orders, add a 15–20% customization premium

Remember: Don't underprice your art! Your time and creativity have real value. 🌿`;
}

function genOrderConfirmation(v: FieldValues, seed: number): string {
  const orderNum = v.orderNumber || '#0000';
  const product = v.product || 'your handmade order';
  const details = v.details ? `\n\n📝 Note: ${v.details}` : '';
  const emoji = pick(['🌿', '✨', '🤎', '🌸'], seed);

  return `Order Confirmed! ${emoji}

Hi there,

Thank you so much for your order! We're thrilled to craft something special for you.

📋 Order Details:
   • Order Number: ${orderNum}
   • Product: ${product}
   • Status: Confirmed & In Production${details}

🎨 What Happens Next:
   1. Our artisan will begin handcrafting your piece (3–5 business days)
   2. You'll receive a shipping notification with tracking once it's ready
   3. Your order arrives beautifully packaged and ready to enjoy

Need to make changes? Reply to this message or contact us on WhatsApp. We're happy to help!

Thank you for supporting handmade! 🤎

Warmly,
The HN Art AI Team`;
}

function genGiftCard(v: FieldValues, seed: number): string {
  const occasion = v.occasion || 'a special occasion';
  const recipient = v.recipient || 'someone special';
  const product = v.product ? ` I hope this ${v.product.toLowerCase()} brings you joy` : '';
  const tone = pick([
    `Wishing you a wonderful ${occasion.toLowerCase()}!${product} and reminds you how much you mean to me.`,
    `Happy ${occasion.toLowerCase()}! Every detail of this gift was chosen with you in mind.`,
    `For ${recipient}, on your ${occasion.toLowerCase()}:${product}. May it bring a smile to your face today and always.`,
    `To ${recipient} — celebrating you and your ${occasion.toLowerCase()}. Here's to many more beautiful moments together.`,
  ], seed);

  return `${tone}

With love and gratitude,
🤎`;
}

function genMarketingIdeas(v: FieldValues, _seed: number): string {
  const business = v.business || 'your handmade business';
  const goal = v.goal ? ` focused on ${v.goal.toLowerCase()}` : '';

  return `📈 Marketing Ideas for: ${business}${goal}

1. 🎬 Behind-the-Scenes Reels
   Show your making process! People love seeing the artistry behind handmade products. Post 15–30 second clips of your workspace, tools, and creation stages.

2. 🎁 "Gift with Purchase" Promo
   Offer a small freebie (like a mini resin trinket) with orders over a certain amount. This increases average order value and creates delight.

3. 📸 User-Generated Content Campaign
   Encourage customers to post photos with your products using a branded hashtag. Feature the best ones on your page and offer a monthly giveaway.

4. 🤝 Micro-Influencer Collabs
   Partner with 3–5 niche influencers in your aesthetic. Offer free products in exchange for honest reviews and unboxing posts.

5. ⏰ Limited-Time Drops
   Create urgency with "limited edition" or "only 5 available" posts. This drives quick conversions and makes your products feel exclusive.

6. 💌 Storytelling Posts
   Share the story behind your brand — why you started, what inspires you, and your creative journey. People connect with people, not just products.

7. 🏷 Seasonal Bundles
   Group complementary products into themed bundles (e.g., "Cozy Night In Set") at a slight discount. Great for holiday and gifting seasons.

8. 💬 Engagement-First Stories
   Use Instagram Stories polls, quizzes, and Q&A stickers daily to keep your audience engaged and your content visible.

Remember: consistency is key! Post regularly and engage authentically with your community. 🌿`;
}

function genBusinessName(v: FieldValues, seed: number): string {
  const niche = v.niche || 'handmade crafts';
  const style = v.style?.toLowerCase() || '';

  const elegant = ['Lumière', 'Maison', 'Atelier', 'Fleur', 'Aurelia', 'Céleste', 'Belle', 'Élan'];
  const playful = ['Bloom & Co', 'Pixie Dust Studio', 'Happy Hands', 'Whimsy Workshop', 'Color Pop', 'Giggle Crafts', 'Sunny Lane', 'Jellybean Studio'];
  const minimal = ['FORM', 'NOIR', 'STÜDIO', 'KRAFT', 'BLANCO', 'ESSEN', 'AERA', 'NÜDE'];
  const luxury = ['The Artisan House', 'Maison de Craeft', 'Velvet & Stone', 'Gilded Bloom', 'Heritage Hands', 'Opulent Oddities', 'Luxe Artisan', 'Regal Craft Co'];

  let pool = elegant;
  if (style.includes('playful')) pool = playful;
  else if (style.includes('minimal')) pool = minimal;
  else if (style.includes('luxury')) pool = luxury;

  const suffixes = ['Studio', 'Collective', 'Co.', 'Atelier', 'House', 'Works', 'Lab', 'Designs'];
  const picks: string[] = [];
  for (let i = 0; i < 8; i++) {
    const base = pool[(seed + i * 3) % pool.length];
    const suffix = suffixes[(seed + i) % suffixes.length];
    if (i < 3) picks.push(base);
    else if (i < 6) picks.push(`${base} ${suffix}`);
    else picks.push(`${base} & ${pool[(seed + i * 5) % pool.length]}`);
  }

  const unique = [...new Set(picks)].slice(0, 8);

  return `✨ Business Name Ideas for: ${niche}

${unique.map((n, i) => `${i + 1}. ${n}`).join('\n')}

💡 Tips for choosing:
• Say it out loud — does it roll off the tongue?
• Check if the .com domain and Instagram handle are available
• Keep it short (1–3 words max) for memorability
• Make sure it reflects your brand personality (${style || 'your chosen style'})

Your brand name is the first impression — choose one that feels authentically YOU. 🌿`;
}

function genSeoKeywords(v: FieldValues, _seed: number): string {
  const product = v.product || 'handmade products';
  const base = product.toLowerCase().replace(/handmade\s*/i, '').trim();

  const primary = [
    `handmade ${base}`,
    `handcrafted ${base}`,
    `custom ${base}`,
    `artisan ${base}`,
  ];
  const longTail = [
    `handmade ${base} for gifts`,
    `unique handmade ${base}`,
    `personalized ${base} online`,
    `handmade ${base} free shipping`,
    `best handmade ${base} 2024`,
    `custom ${base} made to order`,
  ];
  const related = [
    'handmade gifts',
    'artisan crafts',
    'small business handmade',
    'support local makers',
    'unique gifts online',
    'handcrafted decor',
  ];

  return `🔍 SEO Keywords for: ${product}

⭐ Primary Keywords (high priority):
${primary.map((k) => `   • ${k}`).join('\n')}

📍 Long-Tail Keywords (lower competition, higher intent):
${longTail.map((k) => `   • ${k}`).join('\n')}

🔗 Related Keywords (broaden your reach):
${related.map((k) => `   • ${k}`).join('\n')}

📊 How to Use These:
   • Include 1–2 primary keywords in your product title
   • Sprinkle long-tail keywords naturally in your description
   • Add 5–10 relevant tags when listing on Etsy/Instagram
   • Use related keywords in your shop bio and about section

Pro tip: Check search volume on Etsy/Google Trends before finalizing your top 3 keywords! 🌿`;
}

function genEmail(v: FieldValues, _seed: number): string {
  const purpose = v.purpose || 'your email';
  const tone = v.tone?.toLowerCase() || 'professional';
  const subject = purpose.length > 50 ? purpose.slice(0, 50) + '...' : purpose;

  return `Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)}

Dear [Recipient Name],

I hope this email finds you well. I'm reaching out regarding ${purpose.toLowerCase()}.

I've been following your work for some time and am truly impressed by the quality and craftsmanship you bring to your field. At HN Art AI, we specialize in handmade artisan products, and I believe there's a wonderful opportunity for us to collaborate.

Here's what I'd like to discuss:
• Details and specifications aligned with ${purpose.toLowerCase()}
• How we can create mutual value through this partnership
• Timeline and next steps that work for both of us

I'd love to schedule a brief call or exchange more details via email at your convenience. Please let me know what works best for you.

Thank you for your time and consideration. I look forward to hearing from you.

${tone === 'formal' ? 'Sincerely,' : 'Warm regards,'}
[Your Name]
HN Art AI
[Your Email] | [Your Phone]
craftingcreativity.com`;
}
