const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat } = require('docx');
const fs = require('fs');

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            {
                id: "Title",
                name: "Title",
                basedOn: "Normal",
                run: { size: 48, bold: true, color: "D81B60", font: "Arial" },
                paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
            },
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, color: "D81B60", font: "Arial" },
                paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 26, bold: true, color: "C0C0C0", font: "Arial" },
                paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: "lead-list",
                levels: [{
                    level: 0,
                    format: LevelFormat.DECIMAL,
                    text: "%1.",
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } }
                }]
            },
            {
                reference: "bullet-list",
                levels: [{
                    level: 0,
                    format: LevelFormat.BULLET,
                    text: "•",
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 720, hanging: 360 } } }
                }]
            }
        ]
    },
    sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        children: [
            new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Instagram Lead & Profile Improvement Report")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Prepared for: Shelly_BlingRealm")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Date: April 9, 2026")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Instagram Profile Audit & Suggestions")] }),
            new Paragraph({ children: [new TextRun("Current Handle: @shelly_blingrealm")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Bio Optimization")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Clear Value Proposition: Instead of 'Giltzandglam Things', try 'Hand-placed Luxury Rhinestone Art for the Bold & Glamorous'.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Call to Action (CTA): Add a clear 'DM for Custom Orders' or 'Shop Our Catalog Below' link.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Highlight Main Products: Mention 'Custom Tumblers', 'Bling Mirrors', and 'Auto Accessories' explicitly.")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Content Strategy")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("ASMR & Process Reels: The 'bling' niche thrives on ASMR stone-placing videos and 'reveal' videos under bright lights.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Consistent Posting: Aim for at least 3 Reels per week using trending 'sparkle' or 'glam' audio.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Highlights Cleanup: Create categories like 'Process', 'Reviews', 'FAQ', and 'Available Now'.")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Target Instagram Leads (35+ Accounts)")] }),
            new Paragraph({ children: [new TextRun("We have identified 35 highly relevant accounts including direct competitors, potential B2B buyers (Lash Techs, Boutiques), and influencers.") ]}),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Rhinestone Artists & Competitors")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@bijoubybecca - High-profile artist (249K+ followers)")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@coveredinsparkle - Custom rhinestone tumblers")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@babescustoms - Made-to-order processing")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@blingbytinkk - DIY bling space")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@creationsxpam - Focuses on 'bling mirrors'")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Potential Buyers: Lash Techs & Beauty Boutiques")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@lashed.by.richez - Uses bling mirrors for branding (High Value)") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@shopkoutureme - Boutique stocking custom accessories") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@theglamclique - Beauty boutique looking for unique items") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@glam.by.jess - Glam room influencer") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@makeup_by_evelinnn - MUA using custom compact mirrors") ] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Specialty Niches & Influencers")] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@taylorspennysblingcustoms - Bling sneakers/kids") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@cell_letto - Bling phone cases") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@ellebauerdesigns - Dance costume designer") ] }),
            new Paragraph({ numbering: { reference: "lead-list", level: 0 }, children: [new TextRun("@chicbyrubysinclair - Drag/performance artist") ] }),

            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Next Steps for Development")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Outreach to Lash Techs: Offer custom logo mirrors for their stations. This is a very responsive market segment.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Collaborate with Small Boutiques: Propose 'drop-ship' or small-batch wholesale for their accessory sections.")] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Use the Mini Catalog: Send the HTML/PDF catalog to these leads via DM or Email.")] }),

            new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hangzhou Misi Shell Import Export Co., Ltd", bold: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Email: hzmyshell1015@outlook.com | WhatsApp: +86 15207050232")] })
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Bling_Lead_Report.docx", buffer);
    console.log("Report generated successfully.");
});
