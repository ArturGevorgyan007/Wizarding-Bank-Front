export interface Transaction {
    amount: number;
    senderEmail: string;
    recipientEmail: string;
    createdAt: Date;
    description: string;
}
