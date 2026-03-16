import express from "express";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || 'Failed to fetch order details'
      });
    } else {
      return res.status(500).json({
        error: 'Failed to fetch order details'
      });
    }
  }
});


app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});