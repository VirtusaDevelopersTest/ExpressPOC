var faker = require("faker");

var cassandra = require("cassandra-driver");

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function (err, result) {
    console.log('index  : casssandra connected');
});

var getAllServices = 'select * from services_ks.services';

var appRouter = function (app) {



    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to our restful API' });
    });

    app.get("/user", function (req, res) {
        var data = ({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            email: faker.internet.email()
        });
        res.status(200).send(data);
    });

    app.get("/users/:num", function (req, res) {
        var users = [];
        var num = req.params.num;

        if (isFinite(num) && num  > 0 ) {
            for (i = 0; i <= num-1; i++) {
                users.push({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    username: faker.internet.userName(),
                    email: faker.internet.email()
                });
            }

            res.status(200).send(users);

        } else {
            res.status(400).send({ message: 'invalid number supplied' });
        }

    });


    app.get("/getUsername", function (req, res) {
        client.execute(getAllServices,[],function (err, result) {
                if (err) {
                    res.status(404).send({msg: err});
                }
                else {
                    res.render('index',{
                        services : result.rows
                    });
                }
            });
        console.log("Service executed successfully");

    });
}

module.exports = appRouter;