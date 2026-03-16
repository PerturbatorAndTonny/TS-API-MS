import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

const orders = [
  { id: 101, userId: 1, product: 'Laptop', amount: 1200 },
  { id: 102, userId: 2, product: 'Phone', amount: 800 }
];

app.get('/orders/:id', async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  if (isNaN(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID' });
  }

  const order = orders.find(order => order.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  try {
    const userResponse = await axios.get(`http://localhost:3001/users/${order.userId}`);
    return res.status(200).json({
      ...order,
      user: userResponse.data
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || 'Failed to fetch user details'
      });
    } else {
      return res.status(500).json({
        error: 'Failed to fetch user details'
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});