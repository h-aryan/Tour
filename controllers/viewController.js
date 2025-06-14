exports.getOverview = (req, res) => {
  res.status(200).render("overview", {
    title: "All Tours",
    message: "Welcome to the Overview Page!",
  });
};

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker",
  });
};
