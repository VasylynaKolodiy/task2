export function parseDateFromString(text: string) {
    const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
    const matches: any = text.match(dateRegex);
    if (matches){
        return matches.length === 1
            ? matches[0]
            : matches.join(', ')
    }else return "-"
}