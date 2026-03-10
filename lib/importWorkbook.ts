import { workbookSeed } from "@/data/seed";
import { AppData } from "@/types/models";

/**
 * MVP import utility.
 * In this version we seed from workbook-derived JSON.
 * Later, replace with runtime xlsx parser and keep this mapping shape.
 */
export function importWorkbookSeed(): AppData {
  return structuredClone(workbookSeed);
}
