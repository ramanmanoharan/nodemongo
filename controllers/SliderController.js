var mongoose = require("mongoose");
require('../models/Slider');
var Slider = mongoose.model("Slider");

var SliderController = {};

SliderController.list = function(req, res) {
  Slider.find({}).exec(function (err, Sliders) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/Slider/index", {Sliders: Sliders});
    }
  });
};

SliderController.show = function(req, res) {
  Slider.findOne({_id: req.params.id}).exec(function (err, Slider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/Slider/show", {Slider: Slider});
    }
  });
};

SliderController.create = function(req, res) {
  res.render("../views/Slider/create");
};

SliderController.save = function(req, res) {
  var Slider = new Slider(req.body);

  Slider.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/Slider/create");
    } else {
      console.log("Successfully created an Slider.");
      res.redirect("/Sliders/show/"+Slider._id);
    }
  });
};

SliderController.edit = function(req, res) {
  Slider.findOne({_id: req.params.id}).exec(function (err, Slider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/Slider/edit", {Slider: Slider});
    }
  });
};

SliderController.update = function(req, res) {
  Slider.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, Slider) {
    if (err) {
      console.log(err);
      res.render("../views/Slider/edit", {Slider: req.body});
    }
    res.redirect("/Sliders/show/"+Slider._id);
  });
};

SliderController.delete = function(req, res) {
  Slider.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Slider deleted!");
      res.redirect("/Sliders");
    }
  });
};

module.exports = SliderController;