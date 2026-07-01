const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, Header, Footer, PageNumber, BorderStyle, ShadingType, Table, TableRow, TableCell, WidthType } = require("docx");

const b = { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } };

function hdr(text) { return new Paragraph({ spacing: { before: 100 }, shading: { fill: "7B2D8E", type: ShadingType.CLEAR }, children: [new TextRun({ text: `  ${text}`, bold: true, font: "Arial", size: 28, color: "FFFFFF" })] }); }
function p(text, opts = {}) { return new Paragraph({ spacing: { before: opts.b || 60, after: opts.a || 60 }, indent: opts.indent ? { left: 360 } : undefined, children: [new TextRun({ text, font: "Arial", size: 22, bold: opts.bold, italics: opts.ital, color: opts.color })] }); }
function field(label, value) { return new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: label + " ", font: "Arial", size: 22, bold: true }), new TextRun({ text: value, font: "Arial", size: 22 })] }); }

const clients = [
  {
    n: 1, company: "Novelty Inc", type: "大型批发分销商", country: "美国", city: "Greenfield, IN",
    site: "noveltyincwholesale.com", products: "贴钻保温杯(24oz/40oz)、冲动消费零售品、定制设计小玩意",
    scale: "250,000平方英尺仓库，从设计到采购垂直整合，供货给便利店、超市和大众零售渠道",
    contact: "Jim Melcher (创始人/老板)\nTodd Green (总经理/总裁)\nBenjamin Woznica (客户互动与采购管理总监)\nShawn Kilcoyne (新任总裁,2025年10月起)",
    email: "shop@noveltyinc.com / tgreen@noveltyinc.com", phone: "(317) 462-3121",
    addr: "351 West Muskegon Drive, Greenfield, IN 46140",
    angle: "最大批发渠道——直供便利店和超市，量级最大。可提供贴钻水杯OEM整箱出货。",
    priority: "⭐⭐⭐⭐⭐"
  },
  {
    n: 2, company: "Young's Inc", type: "大型礼品批发商", country: "美国", city: "Dundee, MI",
    site: "youngsinc.com", products: "贴钻钥匙扣、家居装饰、礼品、时尚配饰",
    scale: "成立于1988年，大型仓储配送中心，全美礼品店供货商",
    contact: "Chi Yang (CEO)\nLena Kramer (全球采购经理)\nTrena Bleyaert (采购/海运物流)\nMatt Darr (财务/采购运营)",
    email: "youngs@youngsinc.com / orders@youngsinc.com / mattd@youngsinc.com", phone: "(800) 323-7799",
    addr: "5073 Ann Arbor Rd, Dundee, MI 48131",
    angle: "37年历史的礼品批发巨头，有专职全球采购经理Lena Kramer——最直接的OEM合作切入点。",
    priority: "⭐⭐⭐⭐⭐"
  },
  {
    n: 3, company: "The Rhinestone World (TRW)", type: "行业领袖/设备+材料供应商", country: "美国", city: "Bradenton, FL",
    site: "therhinestoneworld.com", products: "贴钻套件、模板、批发水钻、Bling Anything贴纸材料、定制服装",
    scale: "行业领导者，YouTube 10万+粉丝，Facebook 6万+粉丝，2008年成立",
    contact: "Matt Vassallo (创始人兼CEO)",
    email: "info@therhinestoneworld.com", phone: "(941) 755-1696",
    addr: "3511 15th St E, Bradenton, FL 34208",
    angle: "Bling行业的\"教父级\"公司，影响力巨大。合作可同时获得品牌背书和DIY社区渗透。",
    priority: "⭐⭐⭐⭐⭐"
  },
  {
    n: 4, company: "Dreamtime Creations", type: "大型水钻批发商", country: "美国", city: "Aurora, MO",
    site: "dreamtimecreations.com", products: "施华洛世奇、Preciosa、自有品牌水钻、平底/烫钻、水晶串珠、配件",
    scale: "1989年成立，年营收约510万美元，11-50名员工，30,000+SKU",
    contact: "Linda Bourque (总裁/创始人)\nCindy Wilson (联合老板，负责采购)\nGarrett Stuessy (联合老板)",
    email: "info@dreamtimecreations.com", phone: "(417) 678-5748",
    addr: "101 S. Main St., Aurora, MO 65605",
    angle: "35年历史的水钻供应巨头，510万美元年营收，自有品牌线——非常适合OEM成品供货合作。",
    priority: "⭐⭐⭐⭐⭐"
  },
  {
    n: 5, company: "Rhinestones Unlimited", type: "大型水钻批发商", country: "美国", city: "Golden Valley, MN",
    site: "rhinestonesu.com", products: "施华洛世奇、Preciosa水钻、亚克力宝石、舞蹈配饰、粘胶",
    scale: "1994年成立，年营收约360万美元，11-50名员工，舞蹈/表演行业主要供应商",
    contact: "Matt Price (老板/VP)\nAngela Peery (总裁/CMO)\nNicole Price (销售总监)",
    email: "angela@rhinestonesunlimited.com / mprice@rhinestonesunlimited.com", phone: "(952) 848-0133",
    addr: "2305 Louisiana Ave N, Golden Valley, MN 55427",
    angle: "舞蹈/表演行业的水钻供应商，360万美元年营收。可提供成品贴钻配饰作为新品类扩展。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 6, company: "Bling Car Decor", type: "汽车贴钻配饰品牌", country: "美国", city: "Moreno Valley, CA",
    site: "blingcardecor.com", products: "贴钻车牌框、方向盘套、车标装饰、杯垫等汽车内饰",
    scale: "专注汽车贴钻细分市场，Amazon/Etsy/Walmart/TikTok Shop多平台销售",
    contact: "Elena Malbert (创始人/老板)\nKimberly Thomas (运营助理经理)",
    email: "info@blingcardecor.com / support@blingcardecor.com", phone: "(951) 455-4654",
    addr: "Moreno Valley / Perris, CA",
    angle: "汽车贴钻配饰的垂直品牌——你的产品线中有汽车配件类，精准匹配。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 7, company: "Popfizzy (Talk of Fame 101)", type: "Amazon/Faire bling品牌", country: "美国", city: "Atlanta, GA",
    site: "popfizzy.com", products: "贴钻钥匙扣、水钻包扣、时尚配饰",
    scale: "Amazon头部品牌，Faire批发平台销售，2011年成立",
    contact: "Sonia Gupta (推测创始人)\nPaulette Jones (IET协调员)",
    email: "info@popfizzy.com / sales@popfizzy.com", phone: "(404) 939-7008",
    addr: "Atlanta, GA",
    angle: "贴钻钥匙扣品类的Amazon头部卖家——精准匹配你的钥匙扣产品线。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 8, company: "Savvy Bling", type: "批发品牌/展会参展商", country: "美国", city: "Miami, FL / Dallas",
    site: "savvyblings.com", products: "贴钻首饰、水钻配饰、精神穿搭、水晶礼品",
    scale: "Faire\"Top Shop\"卖家，Dallas Market Center和ASD Market Week常规参展商",
    contact: "Colleen Arambula (老板)",
    email: "savvyblings@gmail.com / info@savvyblings.com", phone: "(786) 208-1663",
    addr: "Miami, FL",
    angle: "展会活跃品牌，Faire Top Shop——批发渠道的理想合作伙伴。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 9, company: "Be Createful", type: "水钻供应商/社区品牌", country: "美国", city: "Overland Park, KS",
    site: "becreateful.com", products: "LUXE®高级水钻、DMC玻璃烫钻、贴钻套装",
    scale: "19年历史，15,000+验证好评，大型DIY Bling社区",
    contact: "Jennifer Moore (创始人/老板)",
    email: "support@becreateful.com", phone: "(913) 335-1083",
    addr: "Overland Park, KS",
    angle: "拥有庞大的贴钻DIY社区和自有品牌——适合成品OEM合作或联名推广。",
    priority: "⭐⭐⭐"
  },
  {
    n: 10, company: "Texas Rhinestone", type: "制造商/批发商", country: "美国", city: "Houston, TX",
    site: "texasrhinestone.com", products: "即贴水钻转印(5000+设计)、定制转印、HTV乙烯基",
    scale: "13年历史，Houston 4,000平方英尺仓库",
    contact: "Renita Hudson (联系人/管理层)",
    email: "admin@texasrhinestone.com", phone: "(713) 539-4494",
    addr: "Houston, TX",
    angle: "德州地区的水钻制造头部企业，可作为互补合作——他们做转印，你做成品。",
    priority: "⭐⭐⭐"
  },
  {
    n: 11, company: "Crystal Parade", type: "水晶配饰品牌/零售批发", country: "英国", city: "Kenilworth, Warwickshire",
    site: "crystalparade.co.uk", products: "定制贴钻杯子、鞋子、手机壳、施华洛世奇/Preciosa水晶、DIY材料",
    scale: "英国贴钻行业领先品牌，提供定制贴钻服务和材料批发",
    contact: "Vicki Baker (创始人/老板)\nAnthony (设计/社交媒体负责人)",
    email: "sales@crystalparade.co.uk", phone: "+44 01926 853636",
    addr: "Unit E4, Holly Farm Business Park, Honiley, Kenilworth, CV8 1NP, UK",
    angle: "英国贴钻行业的领军品牌——同时做零售和批发，适合成品供货合作。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 12, company: "Bottle Bling", type: "贴钻酒瓶/礼品品牌", country: "英国", city: "Blackpool",
    site: "bottlebling.co.uk", products: "贴钻酒瓶(金粉/水钻)、玻璃器皿、个性化贴钻礼品",
    scale: "英国领先的贴钻瓶品牌，接企业订单和定制",
    contact: "Katie (企业订单负责人)",
    email: "info@bottlebling.co.uk / katie@bottlebling.co.uk", phone: "+44 01253 462615",
    addr: "B&T Promotions, The Pavilions, Avroe Crescent, Blackpool FY4 2DP, UK",
    angle: "贴钻瓶子的专业品牌——与你的rhinestone bottles产品线完美匹配。",
    priority: "⭐⭐⭐⭐"
  },
  {
    n: 13, company: "Bling My Thing", type: "奢华手机壳品牌", country: "德国", city: "Berlin",
    site: "bling-my-thing.com", products: "施华洛世奇水晶iPhone手机壳和科技配件",
    scale: "高端品牌，使用正品施华洛世奇水晶，Amazon EU和零售渠道",
    contact: "Ayano Kimura (创始人兼设计师)",
    email: "通过官网联系", phone: "+49 30 50189556",
    addr: "Sybelstr. 13, 10629 Berlin, Germany",
    angle: "高端施华洛世奇手机壳品牌——可提供更具性价比的替代水钻方案。",
    priority: "⭐⭐⭐"
  },
  {
    n: 14, company: "Best Bling Bling (Bestbling)", type: "工厂直销批发商", country: "美国(中国工厂)", city: "在线",
    site: "bestblingbling.com", products: "贴钻家居装饰、化妆配饰(气垫镜、口红盒)、礼品",
    scale: "20+年历史，提供OEM/ODM服务",
    contact: "总经理(销售/OEM)",
    email: "bestbling@bestblingbling.com", phone: "在线联系",
    addr: "在线运营",
    angle: "竞品分析对象——了解他们的定价和产品线有助于定位自己的竞争优势。",
    priority: "⭐⭐"
  },
  {
    n: 15, company: "Velvet Caviar", type: "时尚科技配饰品牌", country: "美国", city: "Brooklyn, NY",
    site: "velvetcaviar.com", products: "水钻手机壳、闪光/bling科技配饰",
    scale: "高人气时尚品牌，Urban Outfitters、Nordstrom、Amazon均有销售",
    contact: "Michelle Melendez (创始人)",
    email: "support@velvetcaviar.com", phone: "通过官网",
    addr: "Brooklyn, NY",
    angle: "进入Nordstrom/Urban Outfitters等高端零售渠道的品牌——如能成为供应商，渠道价值极高。",
    priority: "⭐⭐⭐"
  },
];

const allChildren = [];

// Title
allChildren.push(new Paragraph({ spacing: { before: 1500 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLING RHINESTONE ACCESSORIES", bold: true, font: "Arial", size: 44, color: "7B2D8E" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BUYER DEVELOPMENT REPORT", bold: true, font: "Arial", size: 36, color: "7B2D8E" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "贴钻/镶钻饰品买家开发报告", font: "Arial", size: 24, color: "888888" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "Hangzhou Misi Shell Import Export Co., Ltd", font: "Arial", size: 26, color: "555555" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "美国 & 欧洲市场  |  15家目标客户  |  April 2026", font: "Arial", size: 22, color: "888888" })] }));
allChildren.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 }, children: [new TextRun({ text: "产品线: 贴钻水杯 · 贴钻钥匙扣 · 贴钻化妆品配件 · 贴钻汽车配饰 · 贴钻日用品", font: "Arial", size: 20, color: "999999" })] }));

// Summary table
const thCell = (txt, w) => new TableCell({ borders: b, shading: { fill: "7B2D8E", type: ShadingType.CLEAR }, width: { size: w, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: txt, bold: true, font: "Arial", size: 18, color: "FFFFFF" })] })] });
const summaryRows = [new TableRow({ tableHeader: true, children: [thCell("#", 400), thCell("Company", 2200), thCell("Type", 1500), thCell("Country", 800), thCell("Priority", 900), thCell("Angle", 3560)] })];
clients.forEach((c, i) => {
  const bg = i % 2 === 0 ? "F5F5F5" : "FFFFFF";
  const td = (txt, w, bold) => new TableCell({ borders: b, shading: { fill: bg, type: ShadingType.CLEAR }, width: { size: w, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: txt, font: "Arial", size: 18, bold })] })] });
  summaryRows.push(new TableRow({ children: [td(`${c.n}`, 400), td(c.company, 2200, true), td(c.type, 1500), td(c.country, 800), td(c.priority, 900), td(c.angle.split("——")[0], 3560)] }));
});
allChildren.push(new Table({ columnWidths: [400, 2200, 1500, 800, 900, 3560], rows: summaryRows }));
allChildren.push(new Paragraph({ children: [new PageBreak()] }));

// Detail pages
clients.forEach((c, i) => {
  allChildren.push(hdr(`${c.n}. ${c.company}`));
  allChildren.push(field("类型:", c.type));
  allChildren.push(field("国家/城市:", `${c.country} — ${c.city}`));
  allChildren.push(field("网站:", c.site));
  allChildren.push(field("主营产品:", c.products));
  allChildren.push(field("规模:", c.scale));
  allChildren.push(p(""));
  allChildren.push(p("📧 联系方式", { bold: true, color: "7B2D8E", b: 100 }));
  c.contact.split("\n").forEach(line => allChildren.push(p("• " + line, { indent: true })));
  allChildren.push(field("Email:", c.email));
  allChildren.push(field("Phone:", c.phone));
  if (c.addr !== "在线运营") allChildren.push(field("Address:", c.addr));
  allChildren.push(p(""));
  allChildren.push(p("🎯 开发切入点", { bold: true, color: "7B2D8E", b: 100 }));
  allChildren.push(p(c.angle));
  allChildren.push(p("优先级: " + c.priority, { bold: true }));
  if (i < clients.length - 1) allChildren.push(new Paragraph({ children: [new PageBreak()] }));
});

// Strategy page
allChildren.push(new Paragraph({ children: [new PageBreak()] }));
allChildren.push(hdr("开发策略建议"));
allChildren.push(p(""));
allChildren.push(p("🥇 第一梯队 (最高优先级)", { bold: true, color: "7B2D8E", b: 150 }));
allChildren.push(p("1. Novelty Inc — 250,000平方英尺的大型分销商，直供美国便利店/超市，量级最大", { indent: true }));
allChildren.push(p("2. Young's Inc — 37年历史的礼品批发巨头，有专职全球采购经理", { indent: true }));
allChildren.push(p("3. The Rhinestone World — Bling行业教父，合作可获品牌背书", { indent: true }));
allChildren.push(p("4. Dreamtime Creations — 510万美元年营收的水钻批发商，有自有品牌线", { indent: true }));
allChildren.push(p(""));
allChildren.push(p("🥈 第二梯队 (高优先级)", { bold: true, color: "7B2D8E", b: 150 }));
allChildren.push(p("5. Rhinestones Unlimited — 360万美元年营收，舞蹈行业主力供应商", { indent: true }));
allChildren.push(p("6. Bling Car Decor — 汽车贴钻垂直品牌，产品精准匹配", { indent: true }));
allChildren.push(p("7. Popfizzy — Amazon贴钻钥匙扣头部卖家", { indent: true }));
allChildren.push(p("8. Crystal Parade — 英国贴钻行业领军品牌", { indent: true }));
allChildren.push(p("9. Bottle Bling — 贴钻瓶子专业品牌，精准匹配rhinestone bottles", { indent: true }));
allChildren.push(p(""));
allChildren.push(p("🥉 第三梯队 (培育型)", { bold: true, color: "7B2D8E", b: 150 }));
allChildren.push(p("10. Savvy Bling, Be Createful, Texas Rhinestone, Bling My Thing, Velvet Caviar, Best Bling Bling", { indent: true }));
allChildren.push(p(""));
allChildren.push(p("💡 开发信核心策略", { bold: true, color: "7B2D8E", b: 200 }));
allChildren.push(p("• 突出\"成品OEM\"优势——大多数竞品只卖散装水钻，你提供完整的贴钻成品", { indent: true }));
allChildren.push(p("• 强调产品多样性——水杯、钥匙扣、化妆品配件、汽车配饰一站式供应", { indent: true }));
allChildren.push(p("• 提供免费样品+DDP到美国/欧洲作为突破口", { indent: true }));
allChildren.push(p("• 展示mini catalog图片——视觉冲击力是bling产品的最大卖点", { indent: true }));
allChildren.push(p("• 针对批发商强调\"ready-to-sell\"成品，针对品牌商强调OEM定制能力", { indent: true }));

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "MisiShell — Bling Rhinestone Buyer Report", font: "Arial", size: 16, color: "AAAAAA", italics: true })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [ new TextRun({ text: "Page ", font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ text: " of ", font: "Arial", size: 16, color: "AAAAAA" }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 16, color: "AAAAAA" }) ] })] }) },
    children: allChildren
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("Bling_Buyer_Report.docx", buf);
  console.log("DONE: Bling_Buyer_Report.docx (" + buf.length + " bytes)");
});
