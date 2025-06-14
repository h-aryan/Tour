const Tour = require("../model/tourModel");

exports.getOverview = async (req, res, next) => {
  // 1) Get all tours from the database (mocked here)
  const tours = await Tour.find();
  //2) Build template based on the data

  // 3) Render that template using the data from step 1
  res.status(200).render("overview", {
    title: "All Tours",
    message: "Welcome to the Overview Page!",
    tours: tours,
  });
};

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker",
  });
};
