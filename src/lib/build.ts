import { execSync } from "node:child_process";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const BUILD_NOW = new Date();
export const BUILD_DATE_ISO = BUILD_NOW.toISOString().slice(0, 10);
export const BUILD_DATE_HUMAN = `${BUILD_NOW.getUTCFullYear()}-${String(BUILD_NOW.getUTCMonth() + 1).padStart(2, "0")}-${String(BUILD_NOW.getUTCDate()).padStart(2, "0")}`;
export const BUILD_YEAR = BUILD_NOW.getUTCFullYear();
export const BUILD_TIME_HUMAN = `${String(BUILD_NOW.getUTCHours()).padStart(2, "0")}:${String(BUILD_NOW.getUTCMinutes()).padStart(2, "0")} UTC`;

let gitHash: string;
let gitDirty: boolean;
try {
    gitHash = execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
    gitDirty = execSync("git diff --quiet HEAD; echo $?", { encoding: "utf-8" }).trim() !== "0";
} catch {
    gitHash = "no-git";
    gitDirty = false;
}

export { gitHash, gitDirty };
