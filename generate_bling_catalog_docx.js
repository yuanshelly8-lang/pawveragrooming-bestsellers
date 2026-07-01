const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, ImageRun, WidthType, ShadingType, VerticalAlign, BorderStyle, HeadingLevel } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "D81B60" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            {
                id: "Title",
                name: "Title",
                basedOn: "Normal",
                run: { size: 56, bold: true, color: "D81B60", font: "Arial" },
                paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
            }
        ]
    },
    sections: [{
        properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
        children: [
            new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Hangzhou Misi Shell Import Export Co., Ltd")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Premium Rhinestone OEM/ODM Manufacturer")] }),
            new Paragraph({ spacing: { after: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "💎 SPARKLE MINI CATALOG 💎", bold: true, size: 32 })] }),

            new Table({
                columnWidths: [4680, 4680],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: "FCE4EC", type: ShadingType.CLEAR },
                                width: { size: 4680, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Daily Lifestyle", bold: true, size: 28 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun("• Rhinestone Makeup Mirrors")] }),
                                    new Paragraph({ children: [new TextRun("• Crystal Hair Brushes")] }),
                                    new Paragraph({ children: [new TextRun("• Bling Desktop Calculators")] }),
                                    new Paragraph({ children: [new TextRun("• Glitter Phone Stands & Pens")] })
                                ]
                            }),
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: "FCE4EC", type: ShadingType.CLEAR },
                                width: { size: 4680, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Auto Bling", bold: true, size: 28 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun("• Start Button Rings")] }),
                                    new Paragraph({ children: [new TextRun("• License Plate Frames")] }),
                                    new Paragraph({ children: [new TextRun("• Valve Stem Caps")] }),
                                    new Paragraph({ children: [new TextRun("• USB Car Chargers")] })
                                ]
                            })
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: "FCE4EC", type: ShadingType.CLEAR },
                                width: { size: 4680, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Bling Drinkware", bold: true, size: 28 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun("• Full Rhinestone Tumblers")] }),
                                    new Paragraph({ children: [new TextRun("• Custom Logo Coffee Cups")] }),
                                    new Paragraph({ children: [new TextRun("• Diamond Water Bottles")] }),
                                    new Paragraph({ children: [new TextRun("• Sparkling Straw Sets")] })
                                ]
                            }),
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: "FCE4EC", type: ShadingType.CLEAR },
                                width: { size: 4680, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Jeweled Footwear", bold: true, size: 28 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun("• Blinged Crocs & Clogs")] }),
                                    new Paragraph({ children: [new TextRun("• Custom Name Charms")] }),
                                    new Paragraph({ children: [new TextRun("• Luxury-Style Motifs")] }),
                                    new Paragraph({ children: [new TextRun("• DIY Jewelry Kits")] })
                                ]
                            })
                        ]
                    })
                ]
            }),

            new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OEM/ODM Service available: Logo, Packaging, Custom Designs", italics: true })] }),
            
            new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ready to Sparkle? Request a Free Sample!", bold: true, color: "D81B60", size: 28 })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Email: hzmyshell1015@outlook.com | WhatsApp: +86 15207050232")] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Website: hzmyshell.en.alibaba.com")] })
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Bling_Mini_Catalog.docx", buffer);
    console.log("Catalog generated successfully.");
});
