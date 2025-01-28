import { createWorker } from "tesseract.js";

const textFromImage = async (filePath) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(filePath);
  //console.log(ret.data.text);
  await worker.terminate();
  return ret.data.text;
};

export default textFromImage;
