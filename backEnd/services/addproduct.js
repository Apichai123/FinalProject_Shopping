const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.post(
    "/create-product",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {

      if (!req.files) {
        
      } else {
        const picture = req.files.photoPost
        const pictureName = `${(new Date()).getTime()}.jpeg`;
        picture.mv('./upload/' + pictureName)
        db.Product.create({
          name: req.body.name,
          image: `http://localhost:9000/${pictureName}`,
          description: req.body.description,
          price: req.body.price,
          ProductCategoryId: 1
        })
          .then(result => res.status(201).json(result))
          .catch(err => {
            console.error(err);
            res.status(400).json({ message: err.message })
          })

      }
  

      // db.Product.create({
      //     name: req.body.name,
      //     image: req.body.image,
      //     description: req.body.description,
      //     price: req.body.price,
      //     ProductCategoryId: 1
      //   })
      //   .then(result => res.status(201).send(result))
      //   .catch(err => {
      //     console.error(err);
      //     res.status(400).send({ message: err.message });
      //   })
    })
}
