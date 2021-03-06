const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/passport/passport");
const bcrypt =require('bcryptjs')
const BCRYPT_SALT_ROUNDS =12
module.exports = (app, db) => {
  app.post("/registerUser", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        user
          .update({
            name: req.body.name,
            email: req.body.email,
            role: "user"
          })
          .then(() => {
            console.log("user created in db");
            res.status(200).send({ message: "user created" });
          })
          .catch(err => {
            console.error(err);
            res.status(400).send({ message: err.message });
          });
      }
    })(req, res, next);
  });

  app.post("/loginUser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        if (info.message === "username or password is incorrect.") {
          console.error(info.message);
          res.status(401).send({ message: info.message });
        } else {
          console.error(info.message);
          res.status(400).send(info.message);
        }
      } else {
        const token = jwt.sign(
          { id: user.id, role: user.role, name: user.name },
          jwtOptions.secretOrKey,
          { expiresIn: 36000 }
        );
        res.status(200).send({
          auth: true,
          token,
          message: "user found & logged in"
        });
      }
    })(req, res, next);
  });

  app.put(
    "/change-password",
    passport.authenticate("jwt", { session: false }),
    async function(req, res) {
      let targetUser = await db.user.findOne({ where: { id: req.user.id } });
      if (!targetUser) {
        res.status(404).send({ message: "user not found" });
      } else {
        var salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
        var newHashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
        bcrypt.compare(
          req.body.oldPassword,
          req.user.password,
          async (err, result) => {
            console.log(result);
            if (!result) {
              res.status(401).send({ message: "your old password is wrong." });
            } else {
             await targetUser
                .update({
                  password: newHashedPassword
                })
                .then(
                  res.status(200).send({ message: "Your password is changed." })
                )
                .catch(
                  res.status(401).send({ message: "error update." })
                );
            }
          }
        );
      }
    }
  );

  app.get(
    "/protected-route",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      res.status(200).send(req.user);
    }
  );
};
