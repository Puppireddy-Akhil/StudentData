const express = require("express");
const filterRoutes = express.Router();
const fs = require("fs");

filterRoutes.post("/classOfStudy", async (req, res) => {
    const classOfStudy = req.body.classOfStudy;
    
    try {
      const data = fs.readFileSync("students.txt", "utf8");
      const students = JSON.parse(data);
      
      const filteredStudents = students.filter((student) => {
        return student.classOfStudy == classOfStudy;
      });
      console.log(filteredStudents)
      if (filteredStudents.length > 0) {
        res.render("displayStudents", { students: filteredStudents });
      } else {
        res.status(404).send("Student not found");
      }
    } catch (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  filterRoutes.post("/age", async (req, res) => {
    const age = req.body.age;
    
    try {
      const data = fs.readFileSync("students.txt", "utf8");
      const students = JSON.parse(data);
      
      const filteredStudents = students.filter((student) => {
        return student.age == age;
      });
      console.log(filteredStudents)
      if (filteredStudents.length > 0) {
        res.render("displayStudents", { students: filteredStudents });
      } else {
        res.status(404).send("Student not found");
      }
    } catch (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  filterRoutes.post("/percentage", async (req, res) => {
    const percentage = req.body.percentage;
    
    try {
      const data = fs.readFileSync("students.txt", "utf8");
      const students = JSON.parse(data);
      
      const filteredStudents = students.filter((student) => {
        return student.percentage >= percentage;
      });
      console.log(filteredStudents)
      if (filteredStudents.length > 0) {
        res.render("displayStudents", { students: filteredStudents });
      } else {
        res.status(404).send("Student not found");
      }
    } catch (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
//   filterRoutes.post("/classOfStudy", async (req, res) => {
//     const classOfStudy = req.body.classOfStudy;
    
//     try {
//       const data = fs.readFileSync("students.txt", "utf8");
//       const students = JSON.parse(data);
      
//       const filteredStudents = students.filter((student) => {
//         return student.classOfStudy == classOfStudy;
//       });
//       console.log(filteredStudents)
//       if (filteredStudents.length > 0) {
//         res.render("displayStudents", { students: filteredStudents });
//       } else {
//         res.status(404).send("Student not found");
//       }
//     } catch (err) {
//       console.error("Error reading file:", err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

module.exports = filterRoutes;