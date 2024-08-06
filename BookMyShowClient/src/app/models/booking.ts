import { ObjectId } from 'mongodb';

export class Booking {
  user_id: ObjectId;
  show_id: ObjectId;
  transaction_id: ObjectId;
  amount: number;
  seats: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    user_id: ObjectId,
    show_id: ObjectId,
    transaction_id: ObjectId,
    amount: number,
    seats: string[]
  ) {
    this.user_id = user_id;
    this.show_id = show_id;
    this.transaction_id = transaction_id;
    this.amount = amount;
    this.seats = seats;
  }
}