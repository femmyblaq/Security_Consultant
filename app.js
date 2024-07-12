const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { check, validationResult } = require("express-validator");
const app = express();
app.use(express.static("public"));
const port = 3000;
app.set("view engine", "ejs");
mailchimp.setConfig({
  apiKey: "e94053372137fcaf7cecdc89af0921e1-us10",
  server: "us10",
});

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.get("/", (req, res) => {
  res.render("Home");
});
app.get("/contact", (req, res) => {
  res.render("Get_In_Touch");
});
app.get("/about", (req, res) => {
  res.render("About");
});
app.get("/business_consulting", (req, res) => {
  res.render("Business_Consulting");
});
app.get("/education", (req, res) => {
  res.render("Education_Training");
});
app.get("/security_consulting", (req, res) => {
  res.render("Security_Consulting");
});
app.get("/software_development", (req, res) => {
  res.render("Software_Dev");
});
app.get("/enterpreneur", (req, res) => {
  res.render("Enterpreneur");
});
app.get("/information_service", (req, res) => {
  res.render("Information_Service");
});
app.post(
  "/contact",
  urlencodedParser,
  [
    check("Username", "Enter a username with 3+ charater long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
  (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const message = req.body.message;

    console.log(firstName, lastName, email, message);
    let data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            MESSGE: message,
          },
        },
      ],
    };
    let dataJson = JSON.stringify(data);

    var options = {
      url: "https://us10.api.mailchimp.com/3.0/lists/1ab03b2e4e",
      method: "POST",
      headers: {
        Authorization: "habeeb e94053372137fcaf7cecdc89af0921e1-us10",
      },
      body: dataJson,
    };

    // request(options, async function (error, response, body) {
    //   if (error) {
    //     // res.send("<h4>There was problem signing up to the Newsletter.</h4>");
    //     // res.redirect("/failure.html");
    //     res.sendFile(`${__dirname}/failure.html`);
    //   } else {
    //     if (response.statusCode === 200) {
    //       res.sendFile(`${__dirname}/success.html`);
    //       // res.redirect("/success.html");
    //     } else {
    //       res.sendFile(`${__dirname}/failure.html`);
    //     }
    //   }
    // });
    const error = validationResult(req);
    // console.log("validation error", error.array());

    if (!error.isEmpty()) {
      const alert = error.array();
      console.log("validation error", alert);
      res.render("Get_In_Touch", { alert });
    }
  }
);
// app.post("/failure.html", (req, res) => {
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
