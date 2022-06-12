var mongoose = require("mongoose");
require('../models/Admin');
require('../models/Slider');
var bodyParser = require('body-parser');
var multer = require("multer");
var Admin = mongoose.model("Admin");
var Slider = mongoose.model("Slider");
var flash = require('connect-flash');
var adminController = {};

var multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
});
var upload = multer({ storage: multerStorage }).single('sliderfile');


adminController.login = function(req, res) {

   if(req.session.userName){
       res.redirect("/admin/dashboard");
   }else{
  res.render("../views/admin/login", {error:req.flash('error')});
  }
 }

adminController.logout = function (req, res) {
    req.session.destroy();
    res.redirect("/admin");
}
adminController.auth = function (req, res){
 
   var login  = req.body;

  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
   Admin.findOne({email:username, password:password}).exec(function (err, admin) {
    if (err) throw err;
   if(admin==null){
    console.log(err);
      req.flash('error', 'Invalid Email or Password');
      res.redirect("/admin");
   }
   else{
      console.log("LogedIn");
      req.session.userId = admin.email;
      req.session.userName = admin.name;
      var ID = req.session.userId;
      var name = req.session.userName;
      req.flash('username', name);
      if(req.session.userName){
       res.redirect("/admin/dashboard");
   }
   else{
      req.flash('error', "Login only if email is Registered");
      res.redirect("/admin");
   }
   }
   
  

  });
  };

adminController.dashboard = function(req, res){
  var ID = req.session.userId;
  var name = req.session.userName;
  res.render("../views/admin/index.ejs", {userId:ID, username:name});
}

adminController.addslider = function(req, res){

    var ID = req.session.userId;
  var name = req.session.userName;
  res.render("../views/admin/add_slider.ejs", {userId:ID, username:name});
  

}

adminController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employee/show", {employee: employee});
    }
  });
};
// view slider
adminController.viewslider = function(req, res) {
    var ID = req.session.userId;
  var name = req.session.userName;
  Slider.find({}).exec(function (err, slider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/admin/viewslider", {userId:ID, username:name, slider: slider, error:req.flash('error')});
    }
  });
};
// delete slider
adminController.sliderdelete = function(req, res) {
  var ID = req.session.userId;
  var name = req.session.userName;
  Slider.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
       req.flash('error', 'Unable to Delete Slider');
      res.redirect('/admin/viewslider');
     // res.render("../views/admin/add_slider", {message:req.flash('message'), userId:ID, username:name});
    } else {
     var error=   'Slider Saved!';
      req.flash('error', 'Slider Deleted Successfully!');
      console.log("Successfully Deleted an Slider.");
      res.redirect('/admin/viewslider');
     // res.render("../views/admin/add_slider", {message:req.flash('message'), userId:ID, username:name});

    }
  });
};


var urlencodedParser = bodyParser.urlencoded({ extended: false });
adminController.saveslider =  function (req, res) {
   var ID = req.session.userId;
  var name = req.session.userName;
    upload(req, res, function(err) {
   //         console.log(req.body.slidertitle);
   // console.log(req.file.filename);
    var item  = {
      slidertitle: req.body.slidertitle,
      sliderdesc: req.body.sliderdesc,
      sliderfile: req.file.filename
   }
   var slider = new Slider(item);
      slider.save(function(err) {
    if(err) {
      console.log(err);
      req.flash('message', 'Unable to Save Slider');
      var error=  'Unable to Save Slider';
     res.render("../views/admin/add_slider", {message:req.flash('message'), userId:ID, username:name});
    } else {
     var error=   'Slider Saved!';
     req.flash('message', 'Successfully created an Slider.');
      console.log("Successfully created an Slider.");
     res.render("../views/admin/add_slider", {message:req.flash('message'), userId:ID, username:name});

    }
  });
    });
  
}
adminController.save = function(req, res) {
  var slider = new Slider(req.body);

  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/employee/create");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

adminController.slideredit = function(req, res) {
   var ID = req.session.userId;
  var name = req.session.userName;
  Slider.findOne({_id: req.params.id}).exec(function (err, slider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/admin/editslider", {userId:ID, username:name, slider: slider});
    }
  });
};

adminController.updateslider =  function (req, res) {
   var ID = req.session.userId;
  var name = req.session.userName;
    upload(req, res, function(err) {
   //         console.log(req.body.slidertitle);
   // console.log(req.file.filename);
   if(req.file){
    

  var item  = {
      slidertitle: req.body.slidertitle,
      sliderdesc: req.body.sliderdesc,
      sliderfile: req.file.filename
     
   }
   //console.log(item);
 }else{
  var item  = {
      slidertitle: req.body.slidertitle,
      sliderdesc: req.body.sliderdesc
       
   }
 }
   //console.log(item);
    Slider.findByIdAndUpdate(req.params.id, { $set: item}, { new: true }, function (err, employee) {
    if (err) {
      //console.log(err);
      req.flash('error', 'Slider Updated Failed');
      res.redirect("/admin/viewslider/");
    }
     req.flash('error', 'Slider Updated Successfully');
    res.redirect("/admin/viewslider/");
  });
 });
}




adminController.update = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("../views/employee/edit", {employee: req.body});
    }
    res.redirect("/employees/show/"+employee._id);
  });
};



adminController.delete = function(req, res) {
  Employee.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

module.exports = adminController;