# **OCR Processing Tool**

This project provides tools for processing OCR (Optical Character Recognition) from PDFs and images using the `pdf-to-img` and `tesseract.js` libraries.

## 📌 **Functions**
- Conversion of PDF to images (`pdfToImage.js`)
- Extracting text from images (`textFromImage.js`)
- Processing text and extracting important information (`processOCR.js`)


## 📂 **Project structure**
```
├── images/             # Folder for temporarily stored images from PDFs
├── main.js             # Main script calling processOCR
├── processOCR.js       # Core OCR processing logic
├── pdfToImage.js       # Converts PDF to images
├── textFromImage.js    # Extracts text using Tesseract.js
├── package.json        # Package configuration
└── README.md           # Documentation
```


## 🔧 **Configuration**
We use `tesseract.js` for text recognition, which requires proper configuration of the language model (eng for English). You can modify the language in `textFromImage.js`.
```
const worker = await createWorker("eng");
```
To support other languages, download the corresponding models from Tesseract OCR.
[Tesseract OCR.](https://github.com/tesseract-ocr/tessdata)

## 📝 **Output Format**
The output will be a JSON object with the extracted data.
```
{
  "name": "Company ABC",
  "billingAddressCity": "Prague",
  "billingAddressCountry": "Czech Republic",
  "invoiceItems": [
    {
      "quantity": 2,
      "unitPrice": 15.5,
      "taxRate": 21
    }
  ]
}
```
