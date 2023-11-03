export class OutputParser {


    parse(response: string): string {
        const match = response.match(/ ([^`]+)/s);
        if (match) {
            return match[1].trim();
        } else {
            return '';
        }
    }

    
}