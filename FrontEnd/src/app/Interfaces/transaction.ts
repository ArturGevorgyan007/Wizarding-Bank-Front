export interface Transaction {
    amount: number;
    senderId: string;
    recipientId: string;
    createdAt: Date;
    description: string;
}
