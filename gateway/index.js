import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get('/users/:id', async (req, res) => {
  try {
    const idUser = req.params.id;
    const resUserService = await axios.get(`http://localhost:3001/users/${idUser}`);
    return res.status(200).json({
      message: "service enabled",
      data: resUserService.data
    })
  } catch (error) {
    res.status(500).json({
      message: "service disabled",
      error: "User Service Unavailable"
    })
  }
})


app.get('/orders/:id', async (req, res) => {
  try {
    const idUser = req.params.id;
    const resOrderService = await axios.get(`http://localhost:3002/orders/${idUser}`);
    return res.status(200).json({
      message: "service enabled",
      data: resOrderService.data
    })
  } catch (error) {
    res.status(500).json({
      message: "service disabled",
      error: "Order Service Unavailable"
    })
  }
})

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
})