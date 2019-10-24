export interface Transaction {
  uuid: string;
  senderID: string;
  receiverID: number;
  amount: number;
  createdAt: string;
}
