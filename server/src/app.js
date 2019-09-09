const express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  helmet = require("helmet");

//custom imports

const mainRouter = require("./routes/mainRoutes");

//initialize the app

const app = express();

//middleware

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.info("Database successfully connected");
  })
  .catch(error => console.log(error));

//custom routes

app.use("/api", mainRouter);

//404 default route

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route unavailable" });
});

// port
const PORT = process.env.PORT || 8088;

// initiate app to listen for connections
const server = app.listen(PORT, () => {
  console.info(`The app is listening on port ${PORT}`);
});

server.timeout = 480000;
