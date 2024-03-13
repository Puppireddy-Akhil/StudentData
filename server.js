const express = require("express");
const app = express();
const studentRoutes = express.Router();
//configure ejs
app.set("view engine", "ejs");
app.use(express.json()); // to pass the incoming json data
app.use(express.urlencoded({ extended: true }));//to pass form data
app.get('/student',(req,res)=>{
    // res.render('add-student');
    res.render("add-student" );
   })
//render home page
app.get("/",async (req, res) => { 
    try{
      res.render("index" );
    }catch(error){
      res.render('index',{error:error.message})
    }
  });
  app.post("/add-student", async(req, res) => {
    
    try {
          // Logic to handle adding a student
    const { fullName, age, dateOfBirth, classOfStudy, subjects, percentage,grade } = req.body;
    console.log(req.body);
        //   if (!fullName|| !age|| !dateOfBirth|| !classOfStudy|| !subjects|| !percentage|| !grade) {
        //     return res.render("add-student", {
        //       error: "All  fields are required",
        //     });
        //   }
          
      
          res.redirect("/");
        } catch (error) {
        //   return res.render("add-student", {
        //     error: error.message,
        //   });
        }

}); 
app.listen(8080,console.log("server is running"))