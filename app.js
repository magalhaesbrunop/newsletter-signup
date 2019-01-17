//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

var request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extend: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var button = req.body.button;

  var data = {
    members: [
      {email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName
       },
      }
    ]
  };

  var jsonData = JSON.stringify(data);



  var options = {

    url: "https://us20.api.mailchimp.com/3.0/lists/9f7290c162",
    method: "POST",
    headers: {
      "Authorization": "bruno1 1e410475c1a8fea045973393b76d4bbf-us20"
    },

    body: jsonData

  };

  request(options, function(error, response, body) {

    if(error) {
      res.sendFile(__dirname + "/failure.html");

    } else {

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");

      } else {
        res.sendFile(__dirname + "/failure.html");

      }
    }
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("The server is running on port 3000");
});


// API Key
// /1e410475c1a8fea045973393b76d4bbf-us20


// List id
// 9f7290c162





























/**/
