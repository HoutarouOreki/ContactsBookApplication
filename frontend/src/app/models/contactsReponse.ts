import { Contact } from "./contact";

export interface ContactsResponse {
    data: Contact[],
    totalMatchingFilter: number,
    pageNumber?: number,
    pageSize?: number,
}