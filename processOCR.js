import textFromImage from "./textFromImage.js";
import pdfToImage from "./pdfToImage.js";

//Main process function
const processOCR = async (filePath) => {
  if (filePath.endsWith(".pdf")) {
    const imageFilesList = await pdfToImage(filePath);
    const textFromImages = await Promise.all(
      imageFilesList.map(async (file) => {
        return await textFromImage(file);
      })
    );
    const resultText = textFromImages.join("\n");
    const resultObj = parseData(resultText);
    //console.log(resultText);
    //console.log(resultObj);
    return resultObj;
  } else if (filePath.endsWith(".png") || filePath.endsWith(".jpg")) {
    const resultText = await textFromImage(filePath);
    return resultText;
    //console.log(resultText);
  } else {
    console.log("This file extension is not supported");
  }
};

// Find and parse text
const parseData = (text) => {
  const result = {
    name: text.match(/Company\s[A-Z]+/i)?.[0] || null,
    billingAddressCity: text.match(/City:\s([A-Za-z]+)/i)?.[1] || null,
    billingAddressCountry: text.match(/Country:\s([A-Za-z\s]+)/i)?.[1] || null,
    billingAddressPostalCode: text.match(/Postal Code:\s(\d+)/i)?.[1] || null,
    billingAddressState: text.match(/State:\s([A-Za-z\s]+)/i)?.[1] || null,
    billingAddressStreet: text.match(/Street:\s([A-Za-z\s\d]+)/i)?.[1] || null,
    constantSymbol: text.match(/Constant Symbol:\s(\d+)/i)?.[1] || null,
    dateInvoiced: text.match(/Invoice Date:\s([\d-]+)/i)?.[1] || null,
    dateOfReceiving: null,
    datePaid: text.match(/Paid Date:\s([\d-]+)/i)?.[1] || null,
    deliveryNotes: text.match(/Notes:\s([A-Za-z\s]+)/i)?.[1] || null,
    dueDate: text.match(/Due Date:\s([\d-]+)/i)?.[1] || null,
    duzp: "none",
    grandTotalAmount: parseFloat(text.match(/Total Amount:\s(\d+\.\d+)/i)?.[1]) || null,
    currency: text.match(/Currency:\s([A-Za-z]+)/i)?.[1] || null,
    note: text.match(/Note:\s([A-Za-z\s]+)/i)?.[1] || null,
    originalNumber: text.match(/Invoice Number:\s([A-Za-z\d-]+)/i)?.[1] || null,
    paymentMethod: text.match(/Payment Method:\s([A-Za-z]+)/i)?.[1] || null,
    sicCode: "none",
    supplyCode: "none",
    taxAmount: parseFloat(text.match(/Tax Amount:\s(\d+\.\d+)/i)?.[1]) || null,
    taxRate: parseFloat(text.match(/Tax Rate:\s(\d+\.\d+)/i)?.[1]) || null,
    variableSymbol: text.match(/Variable Symbol:\s(\d+)/i)?.[1] || null,
    vatId: text.match(/VAT ID:\s([A-Za-z\d]+)/i)?.[1] || null,
    weight: text.match(/Weight:\s([\d\.]+\s?kg)/i)?.[1] || null,
    amount: parseFloat(text.match(/Amount:\s(\d+\.\d+)/i)?.[1]) || null,
    invoiceItems: [],
  };

  const itemsRegex = /Item:\s(\d+)\sQuantity:\s(\d+)\sUnit Price:\s(\d+\.\d+)\sTax Rate:\s(\d+)/gi;
  let match;
  while ((match = itemsRegex.exec(text)) !== null) {
    result.invoiceItems.push({
      quantity: parseInt(match[2]),
      unitPrice: parseFloat(match[3]),
      taxRate: parseFloat(match[4]),
    });
  }
  return result;
};

export default processOCR;
