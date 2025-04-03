const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const tours = JSON.parse(
  ////// ARRAY of Tours //////
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

///GET FOR ALL TOURS
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

///GET FOR A TOUR BY ID

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
});

app.delete("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
