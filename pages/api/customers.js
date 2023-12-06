import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();
  if (req.method === 'GET') {
    await Order.find({}).sort({updatedAt: -1});
    const customers = await Customer.find({}).sort({updatedAt: -1}).populate('orders');
    res.status(200).json(customers);
  }
}