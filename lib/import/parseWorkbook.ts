import * as XLSX from "xlsx";

export async function parseWorkbook(file: File) {
  const buffer = await file.arrayBuffer();
  return XLSX.read(buffer, { type: "array" });
}
