let apikey: string;

export function setApikey(newApikey: string) {
    apikey = newApikey;
}

export function getApikey(): string {
    return apikey;
}