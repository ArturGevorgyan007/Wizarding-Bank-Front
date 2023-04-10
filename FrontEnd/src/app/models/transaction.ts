export interface Transaction {
    "id"?: number,
    "amount"?: number,
    "cardId"?: number,
    "accountId"?: number,
    "createdAt"?: string,
    "description"?: string,
    "recipientId"?: number,
    "status"?: string,
    "senderId"?: number
}