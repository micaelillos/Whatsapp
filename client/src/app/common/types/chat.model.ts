import { Contact } from "./contact.model";

export interface Chat {
    contact: Contact;
    name: string;
    id: Id;
    isGroup: boolean;
    isOnline: boolean;
}
export interface Id {
    server: string;
    user: string;
    _serialized: string;
    fromMe: boolean;
    remote: string;
    id: string;
}