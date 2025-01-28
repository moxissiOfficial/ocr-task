import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";

const pdfToImage = async (pdfFilePath) => {
  const imgFiles = [];
  let counter = 1;
  const document = await pdf(pdfFilePath, { scale: 3 });
  for await (const image of document) {
    const fileName = `./images/page${counter}.png`;
    await fs.writeFile(fileName, image);
    imgFiles.push(fileName);
    counter++;
  }
  return imgFiles;
};

export default pdfToImage;
