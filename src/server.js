const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();
app.use(morgan("common"));
app.use(cors(corsOptions));

app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

const db = require("./configs/constants").mongoDB_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//routes
app.use("/api/v1/auth", require('./Routes/auth/authRoutes'));
app.use("/api/v1/users", require('./Routes/user/userRoutes'));
app.use("/api/v1/appointment", require('./Routes/appointment/appointmentRoute'));
app.use("/api/v1/payment", require('./Routes/payment/paymentRoutes'));
app.use("/api/v1/transaction", require('./Routes/payment/transactionRoutes'));
app.use("/api/v1/transaction", require('./Routes/payment/paymentRoutes'));
app.use("/api/v1/message", require('./Routes/messaging/messageRoute'));


//for testing of file uploads in base64
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});



const PORT = process.env.PORT || 5005;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server Running on port " + PORT);
});
