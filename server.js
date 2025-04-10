const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

console.log("Connecting to:", DB.replace(/:([^:@]+)@/, ":****@"));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

/*const testTour = new Tour({
  name: "The Forest Hiker-2",
  rating: 4.7,
  price: 497,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR!", err);
  });

const testTour_2 = new Tour({
  name: "The Stargazzer-2",
  rating: 4.7,
  price: 497,
});

testTour_2
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR!", err);
  });
*/
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
