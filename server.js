const express = require("express");
const app = express();
const fs = require("fs");
const filterRoutes = require("./routes/filter");
const editRoutes = require("./routes/edit");
const studentRoutes = express.Router();
//configure ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json()); // to pass the incoming json data
app.use(express.urlencoded({ extended: true })); //to pass form data
//render home page
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.render("index", { error: error.message });
  }
});

app.get("/addStudent", (req, res) => {
  // res.render('add-student');
   res.render("add-student");
  
});
app.get("/updateStudent", (req, res) => {
  res.render("updateStudent");
});



app.use("/filter", filterRoutes);
app.use("/edit", editRoutes);

// Route to handle adding a new student
// app.post("/add-student", (req, res) => {
//   const student = req.body;
//   const {
//     fullName,
//     age,
//     dateOfBirth,
//     classOfStudy,
//     subjects,
//     percentage,
//     grade,
//   } = req.body;

//   // Convert marks to numbers
//   const marks = {};
//   subjects.forEach((subject) => {
//     marks[subject] = parseInt(req.body[`${subject}-marks`]);
//   });

//   // Include marks in the student object
//   student.marks = marks;
//   // Load existing student data from the file, if any
//   let students = [];
//   try {
//     const data = fs.readFileSync("students.txt", "utf8");
//     students = JSON.parse(data);
//   } catch (err) {
//     console.error("Error reading file:", err);
//   }

//   // Add the new student
//   students.push(student);
//   console.log(student);

//   // Write updated student data back to the file
//   fs.writeFile("students.txt", JSON.stringify(students), (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//       res.status(500).send("Error writing to file");
//     } else {
//       res.send("Student added successfully");
//     }
//   });
// });

// Route to handle updating a student
app.post("/update-student", (req, res) => {
  const studentId = req.body.rollNo;
  const updatedStudent = req.body;

  try {
    const data = fs.readFileSync("students.txt", "utf8");
    students = JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
  // Load existing student data from the file
  // Find the student to update
  const index = students.findIndex((student) => student.rollNo === studentId);

  if (index === -1) {
    res.status(404).send("Student not found");
    return;
  }

  // Update the student
  students[index] = { ...students[index], ...updatedStudent };

  // Write updated student data back to the file
  fs.writeFile("students.txt", JSON.stringify(students), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Error writing to file");
    } else {
      res.send("Student updated successfully");
    }
  });
});

//delete
app.get("/delete/:id", (req, res) => {
  const studentId = req.params.id;

  let students = [];

  try {
    const data = fs.readFileSync("students.txt", "utf8");
    students = JSON.parse(data);

    const index = students.findIndex((student) => student.rollNo === studentId);

    if (index === -1) {
      res.status(404).send("Student not found");
      return;
    }

    // Remove the student from the array
    students.splice(index, 1);

    // Write updated student data back to the file
    fs.writeFile("students.txt", JSON.stringify(students), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing to file");
      } else {
        res.send("Student deleted successfully");
      }
    });
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).send("Error reading file");
  }
});

// Route to handle deleting a student

// Endpoint to get all students
app.get("/studentss", async (req, res) => {
  try {
    const data = fs.readFileSync("students.txt", "utf8");
    students = JSON.parse(data);
    //const data = await fs.readFile("students.txt", { encoding: "utf8" });
    //console.log(data);
    // const lines = data.split('\n');
    // const students = lines.map(line => JSON.parse(line));
    console.log(students);
    res.json(students);
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).send("Internal Server Error");
  }
});
//display
app.get("/students", (req, res) => {
  try {
    const data = fs.readFileSync("students.txt", "utf8");
    const newData = JSON.parse(data);
    console.log(newData);
    // console.log(data)
    // const lines = data.split("\n");
    // // console.log(lines);
    // const students = lines.map((line) => JSON.parse(line));
    // console.log(students);
    res.render("displayStudents", { students: newData });
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).send("Internal Server Error");
  }
});
//search
app.post("/searchRollNo", async (req, res) => {
  const rollNumber = req.body.rollNumber;

  try {
    const data = fs.readFileSync("students.txt", "utf8");
    const students = JSON.parse(data);

    const filteredStudents = students.filter((student) => {
      return student.rollNo === rollNumber;
    });

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
app.post("/searchName", async (req, res) => {
  const fullName = req.body.fullName;

  try {
    const data = fs.readFileSync("students.txt", "utf8");
    const students = JSON.parse(data);

    const filteredStudents = students.filter((student) => {
      return student.fullName == fullName;
    });

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

// app.post("/searchh", async (req, res) => {
//   //console.log(req.body);
//   const rollNumber = req.body.rollNumber;

//   try {
//     const data = fs.readFileSync("students.txt", "utf8");
//     const newData = JSON.parse(data);
//     console.log(rollNumber)
//     const student = newData.filter((student) => {
//       return (student.rollNo == rollNumber);
//     });
//     console.log(student)
//     // const data = await fs.readFile('students.txt', { encoding: 'utf8' });
//     // const lines = data.split('\n');
//     // const students = lines.map(line => JSON.parse(line));
//     // const student = students.find(student => student.rollNumber === rollNumber);
//     if (student) {
//       // res.json(student);
//       res.render("displayStudents", { students: newData });
//     } else {
//       res.status(404).send("Student not found");
//     }
//   } catch (err) {
//     console.error("Error reading file:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//   app.post("/add-student", async(req, res) => {

//     try {
//         console.log(req.body,);
//           // Logic to handle adding a student
//     const { fullName, age, dateOfBirth, classOfStudy, subjects, percentage,grade } = req.body;
//     console.log(req.body);
//         //   if (!fullName|| !age|| !dateOfBirth|| !classOfStudy|| !subjects|| !percentage|| !grade) {
//         //     return res.render("add-student", {
//         //       error: "All  fields are required",
//         //     });
//         //   }

//           res.redirect("/");
//         } catch (error) {
//         //   return res.render("add-student", {
//         //     error: error.message,
//         //   });
//         }

// });
app.listen(8088, console.log("server is running"));
