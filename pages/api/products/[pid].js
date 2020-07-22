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
        const product = await Product.findById(pid);
        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case "PUT":
      try {
        const product = await Product.findOneAndReplace({ _id: pid }, body);
        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    case "DELETE":
      try {
        const product = await Product.findById(pid);
        await product.remove();
        res.status(200).json({});
      } catch (error) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(405);
      break;
  }
}
