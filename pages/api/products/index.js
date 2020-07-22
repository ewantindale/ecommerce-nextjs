import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { pid },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json({ products });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case "POST":
      try {
        const product = await Product.create(body);
        res.status(201).json({ product });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(405);
      break;
  }
}
