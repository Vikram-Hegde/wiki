const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function monthYear(iso: string): string {
    const d = new Date(iso);
    return `→ ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function yearOnly(iso: string): string {
    return String(new Date(iso).getUTCFullYear());
}

export function relativeMonth(iso: string): string {
    const d = new Date(iso);
    const months = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return months < 1 ? "THIS MONTH" : `${Math.floor(months)} MO AGO`;
}

export function pluralize(n: number, singular: string, plural: string): string {
    return `${n} ${n === 1 ? singular : plural}`;
}
