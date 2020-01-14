const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.get("/getuser", passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.user.findAll({
       
      })
      .then(result =>{
        res.status(200).send(result)
      })
      .catch(err=>{
        console.error(err)
      })
    }
  );

      }