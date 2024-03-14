const express = require("express");
const editRoutes = express.Router();
const fs = require("fs");
editRoutes.get("/student/:id", (req, res) => {
    const rollNumber = req.params.id;
    console.log(rollNumber);
    try {
        const data = fs.readFileSync("students.txt", "utf8");
        const students = JSON.parse(data);
        
        const filteredStudents = students.filter((student) => {
          return student.rollNo === rollNumber;
        });
    
        if (filteredStudents.length > 0) {
          res.render("updateStudent", { students: filteredStudents });
        } else {
          res.status(404).send("Student not found");
        }
      } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
      }

    
});
module.exports = editRoutes;