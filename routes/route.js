const express = require("express");
const router = express.Router();
// cluster, database, collection,documents,field
const Course = require("../models/Course");

//create a new course
router.post("/courses", async (req, res) => {
  try {
    //create documents
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        console.log(error.errors);
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
});
//get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//update a course by ID
router.put("/coureses/:id", async (req,res)=>{
   const courseId = req.params.id;
   try {
       const course = await Course.findByIdAndUpdate(courseId, req.body, {new:true})
       if(!course){
         return res.status(404).json({error:"Course not found"});
       }
       res.json(course);
   } catch (error) {
      res.status(500).json({error: error.message})
   }

})

//delete a course by ID
router.delete('/courses/:id', async (req, res) =>{
  const courseId = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(courseId)
    if(!course){
      return res.status(404).json({error:"Course not found"});
    }
    res.json({message: "Successfully deleted"});
} catch (error) {
   res.status(500).json({error: error.message})
}
})
module.exports = router;
