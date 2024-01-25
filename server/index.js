const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { movieRouter } = require("./routes/MovieRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/movie" , movieRouter)

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running at ${process.env.PORT}`);
    console.log("Connected to the DataBase");
  } catch (error) {
    console.log(error);
  }
});
