var createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  hbs = require("hbs");
//var indexRouter = require("./routes/loginbank");
//var usersRouter = require('./routes/users');
//var registerBank = require("./routes/registerbank");
var app = express();
app.listen(8000, () =>
  console.log("Running on custom port at http://localhost:8000")
);
var urlencodedParser = bodyParser.urlencoded({ extended: true });
let loggedincustomer = null;
let loggedinbanker = null;
app.use(bodyParser.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/', registerBank);
// experimental

app.get("/loginbank", function (req, res) {
  //if(loggedinbanker===null)
  loggedinbanker = null;
  res.render("loginbank");
});
app.get("/registerbank", function (req, res) {
  res.render("registration_bank");
});
app.get("/sellerapi", function (req, res) {
  Details.find({ productno: 1 }, function (err1, response1) {
    Details.find({ productno: 1 }, function (err1, response1) {
      Details.find({ productno: 1 }, function (err1, response1) {
        let x = 0,
          y = 0,
          z = 0;
      });
    });
  });
});
app.get("/registercustomer", function (req, res) {
  res.render("registration-customer");
});
app.get("/logincustomer", function (req, res) {
  loggedincustomer = null;
  res.render("login-customer");
});
app.get("/addbankcustomer", function (req, res) {
  res.render("add-bank-customer");
});
app.get("/seller-api-1", function (req, res) {
  Details.find(
    { productno: 1, customerid: globalecom._id },
    function (err, response) {
      if (err) console.log(err);
      else {
        res.render("seller-api-1", {
          pro1: response,
        });
      }
    }
  );
});
app.get("/seller-api-2", function (req, res) {
  Details.find(
    { productno: 2, customerid: globalecom._id },
    function (err, response) {
      if (err) console.log(err);
      else {
        res.render("seller-api-2", {
          pro1: response,
        });
      }
    }
  );
});
app.get("/seller-api-3", function (req, res) {
  Details.find(
    { productno: 3, customerid: globalecom._id },
    function (err, response) {
      if (err) console.log(err);
      else {
        res.render("seller-api-3", {
          pro1: response,
        });
      }
    }
  );
});

app.get("/ecomhome", function (req, res) {
  if (loggedincustomer === null) {
    res.redirect("/logincustomer");
  } else {
    let x1 = 0,
      x2 = 0,
      x3 = 0;
    let pro1, pro2, pro3;
    Details.find(
      { customerid: loggedincustomer._id, productno: 1 },
      function (err, response) {
        for (let i = 0; i < response.length; i++) {
          x1 += response[i].quantity;
        }
        Details.find(
          { customerid: loggedincustomer._id, productno: 2 },
          function (err2, response2) {
            for (let i = 0; i < response2.length; i++) {
              x2 += response2[i].quantity;
            }
            Details.find(
              { customerid: loggedincustomer._id, productno: 3 },
              function (err3, response3) {
                for (let i = 0; i < response3.length; i++) {
                  x3 += response3[i].quantity;
                }
                res.render("product-list", {
                  pro1: response,
                  pro2: response2,
                  pro3: response3,
                  x1: x1,
                  x2: x2,
                  x3: x3,
                  username: loggedincustomer.name,
                  bankid: loggedincustomer.bankid,
                });
              }
            );
          }
        );
      }
    );
  }
});
app.get("/product-1", function (req, res) {
  if (loggedincustomer === null) {
    res.redirect("/logincustomer");
  }
  res.render("p1", {
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});
app.get("/product-2", function (req, res) {
  if (loggedincustomer === null) {
    res.redirect("/logincustomer");
  }
  res.render("p2", {
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});
app.get("/product-3", function (req, res) {
  if (loggedincustomer === null) {
    res.redirect("/logincustomer");
  }
  res.render("p3", {
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});
app.get("/bank-statement", async function (req, res) {
  if (loggedinbanker === null) {
    res.redirect("/loginbank");
    return;
  }
  console.log(loggedinbanker);

  let sendarr, receivearr;
  
  sendarr = await Transaction.find({ sender: loggedinbanker._id });

  receivearr = await Transaction.find({ receiver: loggedinbanker._id });

  res.render("bank-statement", {
    bankid: loggedinbanker._id,
    name: loggedinbanker.name,
    balance: loggedinbanker.balance,
    send: sendarr,
    receive: receivearr,
  });
});
//end experimental
// catch 404 and forward to error handler

// database mongodb connection

var mongoose = require("mongoose");
const { url } = require("inspector");
const { response } = require("express");
mongoose.connect("mongodb://localhost/my_db");

var bankSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: Number,
});
var Bank = mongoose.model("Bank", bankSchema);

var customerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bankid: String,
});
var Customer = mongoose.model("Customer", customerSchema);

var sellerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bankid: String,
});
var Seller = mongoose.model("Seller", sellerSchema);

var productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  sellerid: String,
});
var Product = mongoose.model("Product", productSchema);

var detailsSchema = mongoose.Schema({
  quantity: Number,
  customerid: String,
  cost: Number,
  productno: Number,
  delivered: String,
});
var Details = mongoose.model("Details", detailsSchema);

var transactionSchema = mongoose.Schema({
  sender: String,
  receiver: String,
  Amount: Number,
  references: String,
});
var Transaction = mongoose.model("Transaction", transactionSchema);

var correspondingSchema = mongoose.Schema({
  sender: String,
  receiver: String,
});
var Corresponding = mongoose.model("Corresponding", correspondingSchema);

var globalEcomBank = new Bank({
  name: "Ecommerce Site",
  email: "ecom@ecom.com",
  password: "ecom",
  balance: 5000000000000,
  _id: "6309febff4746e29daa12236",
});
const seller1 = {
  _id: "630a0d73b8352acbe9acb114",
  name: "Seller1",
  email: "seller1@seller1.com",
  password: "sell",
  balance: 10,
  __v: 0,
};
const seller2 = {
  _id: "630a11c048f810f0fa35de7a",
  name: "Seller2",
  email: "sell2@s.com",
  password: "sell",
  balance: 19,
  __v: 0,
};
const seller3 = {
  _id: "630a121a48f810f0fa35de7d",
  name: "seller3",
  email: "seller3@s.com",
  password: "sell",
  balance: 33,
  __v: 0,
};

const globalecom = {
  _id: "630a04149ee7ab466af19e45",
  name: "Ecom",
  email: "ecom@ecom.com",
  password: "ecom",
  bankid: "6309febff4746e29daa12236",
};

/// here is all database collection s end

// register bank done completly
// database test
let test_response = null;

app.get("/testdb", async function (req, res) {
  test_response = await Corresponding.find();
  res.json(test_response);
  //  console.log(globalEcomBank);
});

app.get("/testdbb", async function (req, res) {
  // response = await Details.find()
  res.json(test_response);
});

//app.locals.Bank = Bank;

// register account bank && login BAnk

app.post("/registerbank", urlencodedParser, function (req, res) {
  //console.log('hello world');
  //console.log(req.body);
  var input = req.body;
  console.log(input);
  var newBank = new Bank({
    name: req.body.username,
    email: req.body.email,
    password: req.body.pass,
    balance: req.body.balance,
  });
  newBank.save(function (err, Bank) {
    if (err) console.log(err);
    else res.redirect("/loginbank");
  });
});
app.post("/loginbank", urlencodedParser, function (req, res) {
  Bank.findOne(
    { email: req.body.email, password: req.body.pass },
    function (err, response) {
      if (err) console.log(err);
      console.log(response);
      if (response == null) {
        res.redirect("/loginbank");
        return;
      }
      loggedinbanker = response;
      res.redirect("/bank-statement");
    }
  );
});
// register account bank && login BAnk ends here
// register account customer %^ and login in website here

app.post("/registercustomer", urlencodedParser, function (req, res) {
  var newCustomer = new Customer({
    name: req.body.username,
    email: req.body.email,
    password: req.body.pass,
    bankid: null,
  });
  //console.log(newCustomer);
  newCustomer.save(function (err, Customer) {
    if (err) console.log(err);
    else {
      console.log(Customer._id);
      res.redirect("/logincustomer");
    }
  });
});

app.post("/logincustomer", urlencodedParser, function (req, res) {
  var logininfo = req.body;
  Customer.findOne(
    { email: req.body.email, password: req.body.pass },
    function (err, response) {
      if (err) console.log(err);
      else {
        console.log(response);
        if (response === null) res.redirect("/logincustomer");
        else {
          loggedincustomer = response;

          // save loggedincustomer = id
          // console.log(response.bankid);
          if (response.bankid === null) {
            res.redirect("/addbankcustomer");
          } else {
            console.log("redirecting to product-list");
            res.redirect("/ecomhome");
            // if not null this should be added
          }
        }
      }
    }
  );
});

/// add bank customer page
app.post("/addbankcustomer", urlencodedParser, function (req, res) {
  //console.log(req.body);

  Bank.findOne(
    { _id: req.body.bankid, password: req.body.pass },
    function (err, response) {
      if (err) console.log(err);
      else {
        if (response === null) {
          res.redirect("/addbankcustomer");
        } else {
          //console.log(response._id);
          //console.log( loggedincustomer );

          Customer.findOneAndUpdate(
            {
              email: loggedincustomer.email,
              password: loggedincustomer.password,
            },
            { bankid: response._id },
            function (errr, respon) {
              if (errr) console.log(errr);
              else {
                //console.log(respon);
                loggedincustomer.bankid = response._id;
                res.redirect("/ecomhome");
              }
            }
          );
          // res.render("product-list",{
          //   username: loggedincustomer.name,
          //   bankid: response._id
          // });
        }
      }
    }
  );
});

app.post("/product-1", urlencodedParser, async function (req, res) {
  console.log(req.body);
  var input = req.body;
  var newDetails = new Details({
    quantity: req.body.qty,
    customerid: loggedincustomer._id,
    cost: 249 * input.qty,
    productno: 1,
    delivered: "undelivered",
  });

  test_response = await newDetails.save();
  var newTransaction = new Transaction({
    sender: loggedincustomer.bankid,
    receiver: globalecom.bankid,
    Amount: 249 * input.qty,
    references: test_response._id,
  });
  newTransaction.save(function (err, Transaction) {
    if (err) console.log(err);
    else {
      console.log(Transaction);
    }
    // console.log(Transaction);
  });
  /*

*/

  var newEcom = new Details({
    quantity: req.body.qty,
    customerid: globalecom._id,
    cost: 249 * input.qty,
    productno: 1,
    delivered: "undelivered",
  });
  newEcom.save(function (err, Details) {
    if (err) console.log(err);
    else {
      var newTransaction2 = new Transaction({
        sender: globalecom.bankid,
        receiver: seller1._id,
        Amount: 249 * input.qty,
        references: Details._id,
      });
      var newCorres = new Corresponding({
        sender: test_response._id,
        receiver: Details._id,
      });
      newCorres.save(function (errr, Corresponding) {
        if (err) console.log(errr);
        else {
        }
      });
      newTransaction2.save(function (er, Transaction) {
        if (err) console.log(er);
        else {
        } //console.log(Transaction);
      });
    }
  });

  let amount;
  Bank.findOne({ _id: loggedincustomer.bankid }, function (err, response) {
    if (err) console.log(err);
    else {
      let x = response.balance;
      x = x - 249 * input.qty;
      Bank.findByIdAndUpdate(
        { _id: loggedincustomer.bankid },
        { balance: response.balance - 249 * input.qty },
        function (err, response) {
          //   console.log(response);
        }
      );
    }
  });

  Bank.findOne({ _id: seller1._id }, function (err, response) {
    if (err) console.log(err);
    else {
      Bank.findByIdAndUpdate(
        { _id: seller1._id },
        { balance: response.balance + 249 * input.qty },
        function (err, response) {
          console.log(response);
        }
      );
    }
  });
  res.render("payment-success", {
    response: test_response,
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});
//////////selllllllerrrrrrrrrrrr 2222222222222222
app.post("/product-2", urlencodedParser, async function (req, res) {
  console.log(req.body);
  var input = req.body;
  var newDetails = new Details({
    quantity: req.body.qty,
    customerid: loggedincustomer._id,
    cost: 1980 * input.qty,
    productno: 2,
    delivered: "undelivered",
  });

  test_response = await newDetails.save();

  var newTransaction = new Transaction({
    sender: loggedincustomer.bankid,
    receiver: globalecom.bankid,
    Amount: 1980 * input.qty,
    references: test_response._id,
  });
  newTransaction.save(function (err, Transaction) {
    if (err) console.log(err);
    else console.log(Transaction);
  });

  var newEcom = new Details({
    quantity: req.body.qty,
    customerid: globalecom._id,
    cost: 1980 * input.qty,
    productno: 2,
  });
  newEcom.save(function (err, Details) {
    if (err) console.log(err);
    else {
      var newTransaction2 = new Transaction({
        sender: globalecom.bankid,
        receiver: seller2._id,
        Amount: 1980 * input.qty,
        references: Details._id,
      });
      var newCorres = new Corresponding({
        sender: test_response._id,
        receiver: Details._id,
      });
      newCorres.save(function (errr, Corresponding) {
        if (err) console.log(errr);
        else {
        }
      });
      newTransaction2.save(function (er, Transaction) {
        if (err) console.log(er);
        else console.log(Transaction);
      });
    }
  });

  let amount;
  Bank.findOne({ _id: loggedincustomer.bankid }, function (err, response) {
    if (err) console.log(err);
    else {
      let x = response.balance;
      x = x - 1980 * input.qty;
      Bank.findByIdAndUpdate(
        { _id: loggedincustomer.bankid },
        { balance: response.balance - 1980 * input.qty },
        function (err, response) {
          console.log(response);
        }
      );
    }
  });

  Bank.findOne({ _id: seller2._id }, function (err, response) {
    if (err) console.log(err);
    else {
      Bank.findByIdAndUpdate(
        { _id: seller2._id },
        { balance: response.balance + 1980 * input.qty },
        function (err, response) {
          console.log(response);
        }
      );
    }
  });

  res.render("payment-success", {
    response: test_response,
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});

app.post("/product-3", urlencodedParser, async function (req, res) {
  console.log(req.body);
  var input = req.body;
  var newDetails = new Details({
    quantity: req.body.qty,
    customerid: loggedincustomer._id,
    cost: 10000 * input.qty,
    productno: 3,
    delivered: "undelivered",
  });

  test_response = await newDetails.save();

  var newTransaction = new Transaction({
    sender: loggedincustomer.bankid,
    receiver: globalecom.bankid,
    Amount: 10000 * input.qty,
    references: test_response._id,
  });
  newTransaction.save(function (err, Transaction) {
    if (err) console.log(err);
    else console.log(Transaction);
  });

  var newEcom = new Details({
    quantity: req.body.qty,
    customerid: globalecom._id,
    cost: 10000 * input.qty,
    productno: 3,
  });
  newEcom.save(function (err, Details) {
    if (err) console.log(err);
    else {
      var newTransaction2 = new Transaction({
        sender: globalecom.bankid,
        receiver: seller3._id,
        Amount: 10000 * input.qty,
        references: Details._id,
      });
      var newCorres = new Corresponding({
        sender: test_response._id,
        receiver: Details._id,
      });
      newCorres.save(function (errr, Corresponding) {
        if (err) console.log(errr);
        else {
        }
      });
      newTransaction2.save(function (er, Transaction) {
        if (err) console.log(er);
        else console.log(Transaction);
      });
    }
  });

  let amount;
  Bank.findOne({ _id: loggedincustomer.bankid }, function (err, response) {
    if (err) console.log(err);
    else {
      let x = response.balance;
      x = x - 10000 * input.qty;
      Bank.findByIdAndUpdate(
        { _id: loggedincustomer.bankid },
        { balance: response.balance - 10000 * input.qty },
        function (err, response) {
          console.log(response);
        }
      );
    }
  });

  Bank.findOne({ _id: seller3._id }, function (err, response) {
    if (err) console.log(err);
    else {
      Bank.findByIdAndUpdate(
        { _id: seller3._id },
        { balance: response.balance + 10000 * input.qty },
        function (err, response) {
          console.log(response);
        }
      );
    }
  });
  res.render("payment-success", {
    response: test_response,
    username: loggedincustomer.name,
    bankid: loggedincustomer.bankid,
  });
});
///seller api
app.post("/seller-api-1", urlencodedParser, function (req, res) {
  var input = req.body.transactionid;
  console.log(req.body);
  Details.findOneAndUpdate(
    { _id: input },
    { delivered: "Delivered" },
    function (err, response) {
      if (err) console.log(err);
      else {
      }
    }
  );
  Corresponding.findOne({ receiver: input }, function (err, response) {
    Details.findOneAndUpdate(
      { _id: response.sender },
      { delivered: "Delivered" },
      function (er, resp) {
        if (err) console.log(er);
        else res.redirect("/seller-api-1");
      }
    );
  });
});
app.post("/seller-api-2", urlencodedParser, function (req, res) {
  var input = req.body.transactionid;
  console.log(req.body);
  Details.findOneAndUpdate(
    { _id: input },
    { delivered: "Delivered" },
    function (err, response) {
      if (err) console.log(err);
      else {
      }
    }
  );
  Corresponding.findOne({ receiver: input }, function (err, response) {
    Details.findOneAndUpdate(
      { _id: response.sender },
      { delivered: "Delivered" },
      function (er, resp) {
        if (err) console.log(er);
        else res.redirect("/seller-api-2");
      }
    );
  });
});
app.post("/seller-api-3", urlencodedParser, function (req, res) {
  var input = req.body.transactionid;
  console.log(req.body);
  // Details.aggregate([{$addFields: {delivered: ""}}]);
  Details.findOneAndUpdate(
    { _id: input },
    { delivered: "Delivered" },
    function (err, response) {
      if (err) console.log(err);
      else {
      }
    }
  );
  Corresponding.findOne({ receiver: input }, function (err, response) {
    Details.findOneAndUpdate(
      { _id: response.sender },
      { delivered: "Delivered" },
      function (er, resp) {
        if (err) console.log(er);
        else res.redirect("/seller-api-3");
      }
    );
  });
});
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect("error");
});

module.exports = app;
// Default port of express is 3000
