export function parseDateFromString(text: string) {
    const dateRegex = /\d{1,2}([/.-])\d{1,2}\1\d{4}/g
    let matches: any = text.match(dateRegex);

    if (matches){
        matches = matches.map((match:string) => match.replaceAll("-", "/").replaceAll(".", "/"))
        return matches.length === 1
            ? matches[0]
            : matches.join(', ')
    }else return "-"
}