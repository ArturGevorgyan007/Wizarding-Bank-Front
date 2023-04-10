export interface Transaction {
    "id"?: number,
    "amount"?: number,
    "cardId"?: number,
    "accountId"?: number,
    "createdAt"?: string,
    "description"?: string,
    "recipientId"?: number,
    "status"?: number,
    "senderId"?: number
}