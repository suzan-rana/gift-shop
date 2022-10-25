import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/api/takesuzan", (req, res) => {
  const data = req.body;
  console.log(data);

  res.json({
    message: 'your name is recerieved.',
    yourname: data.name
  })
});

app.listen("8000", () => console.log("Backend listening at port 8000."));
