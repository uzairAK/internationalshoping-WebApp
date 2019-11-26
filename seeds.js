var mongoose    = require ('mongoose'),
    User  = require ('./models/user');
    
console.log("SeedDB activated");

var data = [
    {
        username: "rizkhan",
        firstName: "Riz",
        lastName: "Khan",
        email: "rizkhan@gmail.com",
        password: "1234",
        userImage: "http://www.book-a-flat.com/images/paris-salon-2.jpg"
    },
    {
        username: "uzairakhan",
        firstName: "Uzair",
        lastName: "Aezad Khan",
        type: "Mentor",
        email: "uzairkhan@gmail.com",
        country: "Pakistan",
        userImage: "//goo.gl/2WnLrL"
    }
];

var brands = [
    {
        name: 'Amazon',
        image: 'http://www.book-a-flat.com/images/paris-salon-2.jpg'
    },
    {
        name: 'eBay',
        image: 'http://www.book-a-flat.com/images/paris-salon-2.jpg'
    }
];

function seedDB(){
    // Remove all posts
    User.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Removed all users");
        // Add new posts
            data.forEach(function(seed){
                User.create(seed, function(err, post){
                
                    if (err){
                        console.log(err);
                    } else{
                        console.log (`added a user: \n ${post}`);
                    }
                });
            });
        }
    });
}

module.exports = seedDB;