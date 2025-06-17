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

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "user", select: "name photo" },
        select: "review rating user",
      })
      .populate({
        path: "guides",
        select: "name photo role",
      });

    if (!tour) {
      return res.status(404).render("error", {
        title: "Tour not found",
        message: "No tour found with that ID.",
      });
    }

    res.status(200).render("tour", {
      title: `${tour.name} Tour`,
      tour,
    });
  } catch (err) {
    res.status(500).render("error", {
      title: "Error",
      message: err.message || "Something went wrong.",
    });
  }
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Login",
    message: "Please log in to continue.",
  });
};
