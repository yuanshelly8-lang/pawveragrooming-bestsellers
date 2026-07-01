const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, Header, Footer, PageNumber, ShadingType } = require("docx");

function hdr(text) { return new Paragraph({ spacing: { before: 100 }, shading: { fill: "7B2D8E", type: ShadingType.CLEAR }, children: [new TextRun({ text: `  ${text}`, bold: true, font: "Arial", size: 26, color: "FFFFFF" })] }); }
function p(text, opts = {}) { return new Paragraph({ spacing: { before: opts.b || 40, after: opts.a || 40 }, children: [new TextRun({ text, font: "Arial", size: 21, bold: opts.bold, italics: opts.ital, color: opts.color })] }); }

const emails = [
  { n: 1, co: "Novelty Inc", to: "shop@noveltyinc.com / tgreen@noveltyinc.com", subj: "Ready-to-Sell Bling Tumblers & Gift Items — Factory Direct for Retail Distribution", pri: "⭐⭐⭐⭐⭐",
    body: `Dear Todd / Novelty Inc Purchasing Team,

I came across Novelty Inc and was impressed by the scale of your distribution network — 250,000 sq ft of warehouse space serving convenience stores and mass retail across the US is truly remarkable.

I'm Shelly from MisiShell (Hangzhou Misi Shell Import Export Co., Ltd). We manufacture a full range of rhinestone and bling products that are perfect for impulse-buy retail and gift aisles:

• Rhinestone Tumblers & Water Bottles (24oz/40oz, Stanley-style, ready to retail)
• Bling Keychains (100+ designs, retail-packaged)
• Rhinestone Car Accessories (license plate frames, steering wheel covers)
• Bling Daily Accessories (makeup mirrors, phone cases, home décor)

What makes us different from other suppliers:
• We ship finished, ready-to-sell products — not loose rhinestones
• Full OEM/ODM support — your branding, your packaging
• One-stop sourcing across 4 product categories
• Competitive factory-direct pricing for volume orders

I'd love to send you a free sample set of our best-selling bling tumblers and keychains, shipped DDP to your Greenfield warehouse — no cost, no obligation.

Could I send you our product catalog? I think you'll see some items that would fly off the shelves in your retail network.

Best regards,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 2, co: "Young's Inc (Lena Kramer)", to: "youngs@youngsinc.com / orders@youngsinc.com", subj: "New Bling Product Line for Your Gift & Home Décor Collection — Factory Direct from China", pri: "⭐⭐⭐⭐⭐",
    body: `Dear Lena / Young's Inc Sourcing Team,

I hope this email finds you well. I'm reaching out because Young's Inc is exactly the kind of partner we're looking for — a trusted giftware wholesaler with 37 years of experience and nationwide distribution.

I'm Shelly from MisiShell, a manufacturer based in Hangzhou, China, specializing in rhinestone and bling finished products. Our product line includes:

• Rhinestone Tumblers & Water Bottles — the hottest trending gift item
• Bling Keychains — 100+ trendy designs, retail-ready
• Rhinestone Home Décor — candle holders, tissue box covers, storage trays
• Bling Makeup Accessories — compact mirrors, lipstick cases, brush holders

These are all finished, retail-ready products — not raw materials. They fit perfectly into gift shops, boutiques, and home décor sections that Young's already supplies.

We offer:
• Full OEM/ODM — custom branding and packaging
• Low MOQ — 20 pcs per design
• DDP shipping to your Dundee warehouse
• Free sample set upon request

As a fellow team that values long-term partnerships, I'd love to explore how MisiShell products could complement your existing giftware catalog.

May I send over our product catalog and a complimentary sample set?

Warm regards,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 3, co: "The Rhinestone World (Matt Vassallo)", to: "info@therhinestoneworld.com", subj: "Finished Bling Products to Complement Your Rhinestone Supply Business", pri: "⭐⭐⭐⭐⭐",
    body: `Dear Matt,

As the founder of The Rhinestone World, you've built something incredible — the go-to destination for the entire bling community. I've watched several of your YouTube tutorials and the passion your team brings to the craft is truly inspiring.

I'm Shelly from MisiShell, a manufacturer in Hangzhou, China. While TRW excels at supplying rhinestones and tools for the DIY community, we see an opportunity to complement your product line with finished bling products:

• Pre-made Rhinestone Tumblers (24oz/40oz, fully bedazzled, ready to gift or resell)
• Bling Keychains (100+ designs, retail-packaged)
• Rhinestone Car Accessories & Daily Items

Here's why this could work well for TRW:
→ Your customers love bling — but not everyone has time to DIY
→ Finished products = higher price point and margins
→ We handle manufacturing; you leverage your community and brand trust

We could also explore a co-branded or TRW-exclusive product line. Imagine "TRW Signature Collection" bling tumblers — designed by your team, manufactured by ours.

I'd love to send you a sample set to see the quality firsthand — completely free, shipped DDP to Bradenton.

Would you be open to exploring this?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 4, co: "Dreamtime Creations (Linda/Cindy)", to: "info@dreamtimecreations.com", subj: "Ready-Made Bling Products to Expand Your 30,000+ SKU Catalog", pri: "⭐⭐⭐⭐⭐",
    body: `Dear Linda / Cindy,

Congratulations on 35+ years of Dreamtime Creations! Your journey from a small business to 30,000+ SKUs and a trusted name in the rhinestone world is truly impressive.

I'm Shelly from MisiShell, a manufacturer in Hangzhou specializing in finished rhinestone products. I'm reaching out because I believe we could help Dreamtime expand into a fast-growing product category: ready-made bling accessories.

While your core business is supplying loose rhinestones and crystals, the market for finished bling products is exploding — especially:

• Rhinestone Tumblers & Water Bottles (the #1 trending bling product in 2025-2026)
• Bling Keychains (perfect impulse-buy add-on for your existing customers)
• Rhinestone Makeup Accessories (compact mirrors, lipstick cases)

Adding these as a new category could:
• Increase average order value from existing customers
• Attract new customers who want finished products, not just supplies
• Create a Dreamtime-branded finished product line (we handle all OEM/ODM)

The investment is minimal — we offer low MOQ (20 pcs per design), DDP shipping, and I'd love to start with a free sample set so you can evaluate the quality.

Would you or Cindy have a few minutes to discuss? A simple reply to this email or a WhatsApp message works great.

Best regards,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 5, co: "Rhinestones Unlimited (Angela/Matt)", to: "angela@rhinestonesunlimited.com / mprice@rhinestonesunlimited.com", subj: "Finished Bling Products for the Dance & Performance Market — New Revenue Stream", pri: "⭐⭐⭐⭐",
    body: `Dear Angela / Matt,

I hope this finds you well! Rhinestones Unlimited has been a cornerstone of the dance and performance industry for 30 years — an incredible achievement.

I'm Shelly from MisiShell, a finished-product manufacturer specializing in rhinestone and bling items. I noticed that while RU excels at supplying crystals and adhesives, there may be an opportunity to offer your customers ready-made bling accessories:

• Rhinestone Tumblers & Water Bottles — perfect for dance moms, competition gifts
• Bling Keychains — team spirit accessories, recital keepsakes
• Rhinestone Phone Cases & Makeup Mirrors — backstage essentials

Your dance/performance customer base already loves sparkle — offering finished accessories alongside your crystal supply would be a natural upsell.

We provide full OEM support (custom designs, your branding), low MOQ (20 pcs/design), and DDP shipping anywhere in the US.

I'd love to send a free sample set to Golden Valley. May I share our catalog?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 6, co: "Bling Car Decor (Elena Malbert)", to: "info@blingcardecor.com", subj: "OEM Rhinestone Car Accessories — Expand Your Product Line at Factory-Direct Prices", pri: "⭐⭐⭐⭐",
    body: `Dear Elena,

I love what you've built with Bling Car Decor! From Amazon to TikTok Shop to Walmart — you've turned rhinestone car accessories into a multi-platform brand. That takes serious hustle.

I'm Shelly from MisiShell, a manufacturer in Hangzhou, China. We specialize in exactly the kind of products you sell — and we can help you scale:

• Rhinestone License Plate Frames — 50+ designs available, custom options
• Bling Steering Wheel Covers — crystal-studded, various sizes
• Rhinestone Cup Holders & Coasters — the perfect car accessory add-on
• Crystal Gear Shift Covers, Rearview Mirror Charms, Vent Clips

But we also make products that could expand your "Bling" brand beyond cars:
• Rhinestone Tumblers (car cup holder-friendly sizes!)
• Bling Keychains (natural add-on to car accessories)
• Rhinestone Phone Holders for cars

As a factory, we offer:
• Custom designs with your Bling Car Decor branding
• MOQ as low as 20 pcs per design
• DDP shipping to California
• 30-50% savings vs. your current suppliers (let us quote to prove it)

I'd love to send you a sample box of our car accessories and some new items. Completely free, no strings attached.

Just reply to this email or shoot me a WhatsApp — I respond fast!

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 7, co: "Popfizzy", to: "info@popfizzy.com / sales@popfizzy.com", subj: "Bling Keychains & Accessories — New Designs, Factory-Direct Pricing for Amazon & Faire", pri: "⭐⭐⭐⭐",
    body: `Dear Popfizzy Team,

Your rhinestone keychains and bag charms are all over Amazon — and for good reason. The designs are eye-catching and the reviews speak for themselves.

I'm Shelly from MisiShell, a bling accessories manufacturer in Hangzhou, China. We make the exact kind of products that would fit perfectly into your Popfizzy and Talk of Fame 101 lines:

• Rhinestone Keychains — 100+ unique designs (letter, initial, animal, holiday themes)
• Bling Bag Charms & Purse Accessories
• Crystal Phone Charms & Wristlet Keychains

What we bring to the table:
• New designs every month — stay ahead of Amazon trends
• Custom designs with your branding — exclusivity for your listings
• Factory-direct pricing — better margins than trading companies
• MOQ as low as 20 pcs per design — test new designs with low risk
• Retail-ready packaging included

We also make rhinestone tumblers and makeup accessories if you're looking to expand your product range on Amazon.

Can I send you a sample pack of our newest keychain designs? Free shipping, no commitment.

Looking forward to hearing from you!

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 8, co: "Savvy Bling (Colleen Arambula)", to: "savvyblings@gmail.com / info@savvyblings.com", subj: "Factory-Direct Bling Products for Your Faire & Trade Show Business", pri: "⭐⭐⭐⭐" ,
    body: `Dear Colleen,

I saw Savvy Bling at the Dallas Market Center listings and on Faire — congratulations on being a Top Shop! Your crystal jewelry and spiritual bling pieces are beautiful.

I'm Shelly from MisiShell, a bling accessories manufacturer in China. I think we could be a great supply partner for your wholesale business:

• Rhinestone Keychains & Bag Charms — perfect trade show impulse buys
• Bling Tumblers & Water Bottles — the hottest new bling category
• Crystal Makeup Mirrors & Accessories — great gift-set items
• Rhinestone Home Décor — candle holders, tissue boxes, storage trays

For a trade show brand like Savvy Bling, we offer:
• Exclusive designs not available from other suppliers
• Custom packaging with your branding
• Small MOQ (20 pcs/design) — perfect for testing at shows
• Quick turnaround for pre-show orders (15-20 days production)

I'd love to send you a sample set before your next show. Free shipping to Miami — just say the word!

Warmly,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 9, co: "Be Createful (Jennifer Moore)", to: "support@becreateful.com", subj: "Ready-Made Bling Products for Your 15,000+ Customer Community", pri: "⭐⭐⭐",
    body: `Dear Jennifer,

19 years of Be Createful is amazing! The community you've built around rhinestone crafting — 15,000+ verified reviews — shows real dedication to your customers.

I'm Shelly from MisiShell, a manufacturer of finished bling products. While Be Createful excels at supplying LUXE® rhinestones and DIY materials, I see a big opportunity to add ready-made bling products to your catalog:

• Rhinestone Tumblers — for customers who want the "bling look" without the DIY effort
• Bling Keychains — impulse-buy add-ons for every order
• Crystal Makeup Accessories — compact mirrors, lipstick cases

Think of it as expanding from "supplies" to "supplies + finished products." Your community already loves sparkle — some just want to buy the finished item.

We offer OEM/ODM (custom branding as "Be Createful" products), low MOQ, and free samples.

Would you be interested in seeing some samples?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 10, co: "Texas Rhinestone", to: "admin@texasrhinestone.com", subj: "Finished Bling Accessories to Complement Your Rhinestone Transfer Business", pri: "⭐⭐⭐",
    body: `Dear Renita,

Texas Rhinestone has an impressive 5,000+ transfer designs — that's a catalog most companies can only dream of!

I'm Shelly from MisiShell, a bling accessories manufacturer. While your core business is rhinestone transfers and HTV, I'd love to introduce a complementary product line:

• Rhinestone Tumblers & Water Bottles — pre-bedazzled, ready to ship
• Bling Keychains — great add-on sales for your existing customers
• Crystal Car Accessories & Home Décor

These finished products require zero application skill from your customers — they're ready to use or gift. It's a natural expansion that leverages your existing rhinestone-loving customer base.

Factory-direct pricing, OEM branding available, free samples shipped DDP to Houston.

Interested in seeing some pieces?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 11, co: "Crystal Parade (Vicki Baker)", to: "sales@crystalparade.co.uk", subj: "Ready-Made Rhinestone Products for Crystal Parade — Factory OEM from China", pri: "⭐⭐⭐⭐",
    body: `Dear Vicki,

Crystal Parade has become the UK's go-to name for everything crystal and rhinestone — from Swarovski supplies to custom-bedazzled creations. Your range is exceptional.

I'm Shelly from MisiShell, a manufacturer in Hangzhou, China, specializing in finished rhinestone products. I noticed Crystal Parade already offers some custom bedazzled items (cups, shoes, phone cases) — we could help you scale that side of the business significantly:

• Rhinestone Tumblers & Bottles — pre-made in 50+ designs, or custom to your spec
• Bling Keychains — 100+ designs, retail-ready with packaging
• Crystal Phone Cases, Makeup Mirrors, Car Accessories
• Custom OEM — any design, any branding, any quantity from 20 pcs

Benefits of working with MisiShell:
• Factory-direct pricing (30-50% below UK wholesale)
• DDP shipping to Kenilworth — we handle customs and duties
• Consistent quality across large orders
• New designs every month to keep your catalog fresh

I'd love to send you a sample box. Would that be of interest?

Kind regards,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 12, co: "Bottle Bling (Katie)", to: "info@bottlebling.co.uk / katie@bottlebling.co.uk", subj: "OEM Rhinestone Bottles & Glassware — Expand Your Bottle Bling Range with Factory Prices", pri: "⭐⭐⭐⭐",
    body: `Dear Katie,

Bottle Bling is such a brilliant concept — turning ordinary bottles into sparkling gifts! The gold dust and crystal bottles are gorgeous, and I can see why corporate clients love them.

I'm Shelly from MisiShell, a rhinestone products manufacturer in China. Our product line includes rhinestone-decorated bottles, tumblers, and drinkware — which aligns perfectly with what Bottle Bling does:

• Rhinestone Champagne & Wine Bottles — fully bedazzled, ready for gifting
• Crystal-Studded Tumblers & Water Bottles — 24oz and 40oz sizes
• Bling Glassware — champagne flutes, wine glasses with crystal stems
• Custom Corporate Gift Sets — bottles + keychains + accessories

For Bottle Bling specifically:
• We can produce bottles to YOUR exact specifications
• Custom crystal patterns, colors, and placements
• Your Bottle Bling branding on every piece
• Significant cost savings vs. bedazzling in-house
• Scale from 20 to 20,000 pieces per order

Imagine being able to offer your corporate clients larger orders with faster turnaround and better margins — that's what factory OEM can do for you.

Shall I send a sample set? Free DDP delivery to Blackpool.

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 13, co: "Bling My Thing (Ayano Kimura)", to: "info@bling-my-thing.com", subj: "High-Quality Rhinestone Phone Cases & Accessories — Alternative OEM Source", pri: "⭐⭐⭐",
    body: `Dear Ayano,

Bling My Thing's iPhone cases are works of art — the Swarovski crystal designs are stunning. As a designer, you have an incredible eye for crystal placement.

I'm Shelly from MisiShell, a rhinestone accessories manufacturer in China. I'm reaching out because we can offer high-quality rhinestone phone cases and tech accessories at significantly competitive prices:

• Crystal Phone Cases — precision stone placement, various crystal grades
• Rhinestone AirPod Cases, Watch Bands, and Tech Accessories
• Custom designs to YOUR specifications

With the changes in the Swarovski crystal market, many brands are exploring alternative premium crystal sources. Our crystals offer:
• Comparable brilliance and clarity to premium European crystals
• 40-60% cost savings
• More flexibility in custom designs and smaller batch sizes
• Faster production turnaround (15-20 days)

We could produce your existing designs with our crystals for you to compare quality side-by-side — no commitment needed.

Interested in a sample comparison?

Best regards,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 14, co: "Best Bling Bling", to: "bestbling@bestblingbling.com", subj: "Bling Accessories Manufacturer Partnership — Expanding Product Range", pri: "⭐⭐",
    body: `Dear Best Bling Bling Team,

I noticed your impressive range of rhinestone home décor and accessories. Your 20+ years in the bling industry is a testament to your expertise.

I'm Shelly from MisiShell, another bling accessories manufacturer. Rather than viewing each other as competitors, I believe there's an opportunity for collaboration:

• Product Range Expansion — you have strengths in home décor; we excel in tumblers, keychains, car accessories, and makeup items
• Cross-Supply — fill each other's gaps in product categories
• White-Label — we can produce items for your catalog that you don't currently manufacture

I'd love to explore synergies. Open to a discussion?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` },

  { n: 15, co: "Velvet Caviar (Michelle Melendez)", to: "support@velvetcaviar.com", subj: "Rhinestone Phone Cases & Accessories — OEM Manufacturing for Retail Brands", pri: "⭐⭐⭐",
    body: `Dear Michelle,

Velvet Caviar has done something amazing — taking phone cases from commodity to fashion statement. Seeing your products in Nordstrom, Urban Outfitters, and across social media is incredibly impressive.

I'm Shelly from MisiShell, a rhinestone accessories manufacturer in China. I specialize in the kind of sparkle and bling that fits perfectly into Velvet Caviar's aesthetic:

• Rhinestone Phone Cases — precision crystal placement, premium quality
• Crystal Tech Accessories — AirPod cases, watch bands, phone charms
• Bling Keychains & Bag Accessories — natural product line extensions

For a brand sold in Nordstrom and Urban Outfitters, quality and consistency are non-negotiable — and that's exactly what factory-direct OEM provides:
• Consistent quality across thousands of units
• Custom designs exclusive to Velvet Caviar
• Competitive pricing for retail margin requirements
• Fast turnaround for seasonal collections

I understand you likely have existing suppliers, but a comparison quote never hurts. May I send you a sample of our rhinestone phone case quality?

Best,
Shelly
MisiShell — Hangzhou Misi Shell Import Export Co., Ltd
Email: hzmyshell1015@outlook.com
WhatsApp: +86 15207050232` }
];

const allChildren = [];
allChildren.push(new Paragraph({ spacing: { before: 800 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLING RHINESTONE ACCESSORIES", bold: true, font: "Arial", size: 40, color: "7B2D8E" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CUSTOMIZED OUTREACH EMAILS", bold: true, font: "Arial", size: 32, color: "7B2D8E" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: "15 Personalized Cold Emails — MisiShell", font: "Arial", size: 22, color: "888888" })] }));

emails.forEach((e, i) => {
  allChildren.push(hdr(`Email ${e.n}/15 — ${e.co}  ${e.pri}`));
  allChildren.push(p(""));
  allChildren.push(new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "To: ", bold: true, font: "Arial", size: 21 }), new TextRun({ text: e.to, font: "Arial", size: 21 })] }));
  allChildren.push(new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: "Subject: ", bold: true, font: "Arial", size: 21 }), new TextRun({ text: e.subj, font: "Arial", size: 21 })] }));
  allChildren.push(p(""));
  // Split body by double newline into paragraphs
  e.body.split("\n").forEach(line => {
    allChildren.push(p(line));
  });
  if (i < emails.length - 1) allChildren.push(new Paragraph({ children: [new PageBreak()] }));
});

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 21 } } } },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "MisiShell — Bling Outreach Emails", font: "Arial", size: 16, color: "AAAAAA", italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Page ", font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ text: " of ", font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 16, color: "AAAAAA" })] })] }) },
    children: allChildren
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("Bling_Outreach_Emails.docx", buf);
  console.log("DONE: Bling_Outreach_Emails.docx (" + buf.length + " bytes)");
});
