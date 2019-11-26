var express         = require('express'),
    app             = express(),
    ejs             = require ('ejs'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    faker           = require('faker'),
    methodOverride  = require ("method-override"),
    mongoose    = require ('mongoose'),
    { getCode, getName, getNames, getData, getCodes } = require('country-list'),
    FroalaEditor = require('froala-editor'),
    wysiwygEditor = require('wysiwyg-editor-node-sdk'),
    cookieParser = require("cookie-parser"),
    _           = require('lodash'),
    passport = require('passport'),
    validator   = require("express-validator"),
    session     = require("express-session"),
    wysiwyg = require('wysiwyg'),
    UserHelper  = require('./helpers/User'),
    OrderHelper  = require('./helpers/Order'),
    MongoStore  = require("connect-mongo")(session),
    fs          = require('fs'),
    flash           = require('connect-flash'),
    User        = require('./models/user'),
    Brand        = require('./models/brand'),
    Order        = require('./models/order'),
    seedDB      = require('./seeds'),
    Product        = require('./models/product');

//seedDB();
var server = require('http').createServer(app);
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

// Connect mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/intshop", {
//    useMongoClient: true
    useNewUrlParser: true 
});
mongoose.Promise = global.Promise;

// Tell express to use these folders
app.use(express.static(path.join(__dirname , '/public')));
app.use(express.static(path.join(__dirname , './models')));
app.use(flash());

// Tell express to set defaults
app.set("views", path.join(__dirname , 'views'));  //OR app.set("views", __dirname , '/views');
app.set("view engine", "ejs");
app.engine('.html', require('ejs').__express);

// Tell express to use these plugins
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(methodOverride("_method"));

app.locals._ = _;
app.locals.apptitle = "International shoping";

app.use(validator());
app.use(session({ 
        secret: 'thisisasecretkey',
        resave: true,
        saveInitialized: true,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

// Setup Passport
app.use (passport.initialize());
app.use(passport.session());
require('./passport/passport-local.js');


const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , './public/images/userUploads'))
  },
  filename: function (req, file, cb) {
      
    cb(null, req.user.name + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});

//const filestorage = new multer.diskStorage({
//  destination: function (req, file, cb) {
//    cb(null, path.join(__dirname , '/public/images/userUploads'))
//  },
//  filename: function (req, file, cb) {
//      
//    cb(null, req.user.name + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//  }
//});
const uploadFile = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.pdf' && ext !== '.doc' && ext !== '.docx' && ext !== '.jpeg' && ext !== '.jpg' && ext !== '.gif' && ext !== '.png' && ext !== '.txt') {
            return callback(new Error('Only doc,pdf,docx,txt files are allowed'))
        }
        callback(null, true)
    }
});


app.use(function(req,res,next){
    if (req.user){
    }
    sess = req.session.passport;
    res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    res.header("Content-Type", "application/octet-stream");
    res.locals.countriesList = getData();
    res.locals.currentUser = req.user;
//    console.log(res.locals.currentUser);
    next();
});

// ===========
// ROUTES
// ===========
app.get ("/", function(req, res){
    var brands = [
//    {
//        name: 'Amazon',
//        image: '/brands/Amazon.png'
//    },
//    {
//        name: 'eBay',
//        image: '/brands/eBay.png'
//    },
//    {
//        name: 'Walmart',
//        image: '/brands/Walmart.png'
//    },
//    {
//        name: 'H&M',
//        image: '/brands/H&M.png'
//    },
//    {
//        name: 'Nike',
//        image: '/brands/Nike.png'
//    },
//    {
//        name: 'Adidas',
//        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png'
//    },
//    {
//        name: 'Forever21',
//        image: '/brands/Forever21.jpg'
//    },
//    {
//        name: 'Victorias Secret',
//        image: '/brands/Victorias Secret.png'
//    },
//    {
//        name: 'Sephora',
//        image: '/brands/Sephora.png'
//    },
//    {
//        name: 'ASOS',
//        image: '/brands/ASOS.png'
//    },
//    {
//        name: 'RalphLauren',
//        image: '/brands/RalphLauren.png'
//    },
//    {
//        name: 'Za Ful',
//        image: '/brands/Za Ful.png'
//    },
//    {
//        name: 'Fashion Nova',
//        image: '/brands/Fashion Nova.jpeg'
//    },
//    {
//        name: 'Bath Body Works',
//        image: '/brands/BathBodyWorks.png'
//    },
//    {
//        name: 'Oshkosh',
//        image: '/brands/Oshkosh.png'
//    },
//    {
//        name: 'Nordstrom',
//        image: '/brands/Nordstrom.jpg'
//    },
//    {
//        name: "Macys",
//        image: '/brands/Macys.png'
//    },
//    {
//        name: 'Target',
//        image: '/brands/Target.png'
//    },
//    {
//        name: 'Kohls',
//        image: '/brands/Kohls.jpg'
//    },
//    {
//        name: 'Etsy',
//        image: '/brands/Etsy.png'
//    },
//    {
//        name: '6pm',
//        image: '/brands/6pm.png'
//    },
//    {
//        name: 'Zulily',
//        image: '/brands/Zulily.png'
//    },
//    {
//        name: 'Carters',
//        image: '/brands/Carters.png'
//    },
//    {
//        name: 'Stylight',
//        image: '/brands/Stylight.png'
//    }
    
];
    brands.forEach(function(seed){
    Brand.create(seed, function(err, post){

        if (err){
            console.log(err);
        } else{
            console.log (`added a brand: \n ${post}`);
        }
    });
});
    Brand.find({}, function(err, brands){
        res.render("index", {brands});
    });
//    res.render ("landing"); 
});

app.get ("/profile", UserHelper.isLoggedIn, function(req, res){
    res.render("profile");
//    res.render ("landing"); 
});
app.get ("/history", function(req, res){
    Order.find({}, function(err, orders){
//        console.log(orders);
        
        res.render("history", {orders});
    });
});
app.get ("/buyforme", function(req, res){
    var errors = req.flash('order');
    var success = req.flash('orderSuccess');
    res.render("buyforme", {messages: errors, hasErrors: errors.length > 0, messagesSuccess: success, hasSuccess: success.length > 0});
//    res.render ("landing"); 
});
app.post ("/buyforme", UserHelper.isLoggedIn, OrderHelper.OrderValidation, function(req, res){
    const newOrder = new Order();
    newOrder.name = req.body.info.name;
    newOrder.link = req.body.info.link;
    newOrder.info = req.body.info.info;
    newOrder.quantity = req.body.info.quantity;
    newOrder.price = req.body.info.price;
    newOrder.payer = req.user._id;
        
        newOrder.save((err) => {
            if (err) {
                req.flash('order', 'Order Unsuccesful. Please try again');
                res.redirect("/buyforme");
            }
            else {
                req.flash('orderSuccess', 'Order Succesful');
                res.redirect("/buyforme");
            }
        });
});

app.get("/product_detail/:id", function(req,res){
    var proID = req.params.id;
//    console.log(proID);
    Order.find({_id:proID}, function(err, product){
//        console.log(product);
        if (err) {
            console.log(err);
        }
        res.render("product_detail", {product: product[0]});
        
    });
});

// All Products
//app.get("/products/all", function(req,res) {
//    res.render("allProducts");
//});

app.get("/products/:category", function(req,res){
    var category = req.params.category;
    console.log(category);
    Product.find ({'category': category}, function(req,res){
        res.render("allProducts", {category});
    });
});


//-------Authentications----------

app.get("/signup", function(req,res) {
    const errors = req.flash('error');
    res.render("signup", {messages: errors, hasErrors: errors.length > 0});
});

app.post("/signup", UserHelper.SignUpValidation, passport.authenticate('signup', {
    successRedirect: `/`,
    failureRedirect: '/signup',
    failureFlash: true
}));

app.get("/login", function(req,res) {
    const errors = req.flash('error');
    res.render("login", {messages: errors, hasErrors: errors.length > 0});
});

app.post("/login", UserHelper.LoginValidation, passport.authenticate('local.login', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req,res,next) {
        res.redirect('/');
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.put("/profile/:id", function(req,res){

//    console.log(req.body);
    
    User.findByIdAndUpdate(req.params.id, req.body.info, function (err, post){
        if(err){
            res.redirect("/profile");
        } else {
            res.redirect("/profile");
        }
    });
});

// Start server
var server = server.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log("Irecs Server started on port ", port);
});
