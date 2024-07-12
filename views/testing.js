// ...rest of the initial code omitted for simplicity.
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { body, validationResult } = require("express-validator");
const app = express();
app.use(express.static("public"));
const port = 5000;
// app.set("view engine", "ejs");
// mailchimp.setConfig({
//   apiKey: "e94053372137fcaf7cecdc89af0921e1-us10",
//   server: "us10",
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.post(
  "/user",
  // username must be an email
  body("username").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => res.json(user));
  }
);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
