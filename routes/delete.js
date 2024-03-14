const express = require("express");
const deleteRoutes = express.Router();
const fs = require("fs");
deleteRoutes.get("/student/:id", (req, res) => {
    const rollNumber = req.params.id;
    console.log(rollNumber);
    try {
        const data = fs.readFileSync("students.txt", "utf8");
        let students = JSON.parse(data);
        const index = students.findIndex((student) => student.id === studentId);

        
    
       
      } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
      }

    
});
module.exports = editRoutes;