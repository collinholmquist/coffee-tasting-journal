const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller");
const entries = require('../controllers/entry.controller')
const coffeeConfig = require('../static/coffeeConfig')


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/", (req, res) => {

    res.render('pages/home', {
      brewmethods: coffeeConfig.brew_methods,
      taste_profile: coffeeConfig.flavor_profiles
    })
  });
  app.get("/auth", (req, res) => {res.render('pages/register')})
  app.get("/user", entries.findAll)
  app.post("/user", entries.create)
  app.get("/user/:entry_id", entries.findById)
  app.post("/user/:entry_id", entries.editById)
  app.post("/user/remove/:entry_id", entries.delete)

};
