const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.delete(
    "/delete-user/:id",
    passport.authenticate("jwt", { session: false }),
    async function(req, res) {
      let deluser = await db.user
        .findOne({ where: { id: req.params.id } })
       if (!deluser) {
         res.status(404).send({ message: "The user is not found." })
       } else {
         deluser.destroy()
           .then(result => {
             res.status(200).send({ message: "success" })
           })
           .catch(err => {
             res.status(400).send({ message: "something went wrong." })
           })
       }
    }
  );
};
