const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Update user details--------------------------------------------
router.put("/:id",async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password) {
            try {
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
              return res.status(500).json(err);
            }
          }
          try {
            const user = await User.findByIdAndUpdate(req.params.id, {
              $set: req.body,
            });
            res.status(200).json("Your account has been updated");
          } catch (err) {
            return res.status(500).json(err);
          }
    }else{
        return res.status(403).json("You can only update your account");
    }
});

//deleting a user--------------------------------------------------------
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

//getting a user----------------------------------------------------------
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      //Removing parameters like password which we dont want to display
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other); //In others we send everything except password and updated at
    } catch (err) {
      res.status(500).json(err);
    }
  });

//following some user-------------------------------------------------------------
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id); //data of person user wants to follow
        const currentUser = await User.findById(req.body.userId); //data of the user itself
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("User has been followed");
        } else {
          res.status(403).json("You are already following this user");
        }
      }catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot follow yourself!");
    }
  });
  

//unfollowing a user--------------------------------------------------------
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id); //data of person user wants to follow
        const currentUser = await User.findById(req.body.userId); //data of the user itself
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("User has been unfollowed");
        } else {
          res.status(403).json("You already dont follow this user!");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cant unfollow yourself!");
    }
  });


module.exports = router;