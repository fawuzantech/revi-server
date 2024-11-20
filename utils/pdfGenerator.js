import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function generatePDF(summaries) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const fontSize = 12;

  let y = height - 40; // Start at the top with some padding

  summaries.forEach((summary, idx) => {
    const text = `Article ${idx + 1}:\n${summary}\n\n`;
    const lines = font.splitTextIntoLines(text, width - 80); // Wrap text
    lines.forEach(line => {
      if (y < 40) {
        y = height - 40;
        pdfDoc.addPage([600, 800]);
      }
      page.drawText(line, { x: 40, y, font, size: fontSize });
      y -= fontSize + 4;
    });
  });

  return await pdfDoc.save();
}
