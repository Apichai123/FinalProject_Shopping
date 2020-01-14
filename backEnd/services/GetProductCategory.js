const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.get("/getproduct-category", passport.authenticate("jwt", { session: false }),
    function(req, res) {
      db.ProductCategory.findAll({
       
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