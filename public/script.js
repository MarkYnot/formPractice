document.addEventListener('DOMContentLoaded', ()=>{
   const addCourseForm = document.getElementById("add-course-form");
   const courseList = document.getElementById("course-list");
   const errorContainer = document.getElementById("error-container");

   const fetchCourses = async () => {
      try{
        const url = "http://localhost:8000/api/courses";
        const response = await fetch(url);
        const courses = await response.json();
        console.log("courses:", courses)
        courseList.innerHTML = '';
        courses.forEach(course => {
            const li = document.createElement("li");
            li.textContent = `Title:${course.title}, Instructor: ${course.instructor}, duration: ${course.duration}`;
            
            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add("delete-button")
            deleteBtn.dataset.courseId = course._id;
            li.appendChild(deleteBtn)
            courseList.appendChild(li)
        })
      }catch(error){
        console.error("Error fetching courses", error)
      }
   };

   addCourseForm.addEventListener('submit', async (event) =>{
     event.preventDefault();
     const formData = new FormData(addCourseForm);
     const courseData = Object.fromEntries(formData.entries());
    //  console.log("courseData", courseData)
     try{
       const url = "http://localhost:8000/api/courses";
       const response = await fetch(url,{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(courseData)
       })

       if(response.ok){
          errorContainer.innerHTML = "";
          addCourseForm.reset();
          fetchCourses()
       }

       const responseData = await response.json();
       if(responseData.errors){
         errorContainer.innerHTML = ''; // clear previous errors
         for(const field in responseData.errors){
            const errorText = responseData.error[field];
            const errorElement = document.createElement("p");
            errorElement.textContent = errorText;
            errorContainer.appendChild(errorElement);
         }
       }
     } catch (error){
      console.error("Error adding course", error);         
    }
   });

   courseList.addEventListener('click', async (event) => {
     if(event.target.classList.contains('delete-button')){
        const courseId = event.tearget.dataset.courseId;
        if(confirm('Are you sure you want to delete this course?')){
          try{
             const response = await fetch(
              `http://localhost:8000/api/courses/${courseId}`,
              {
                method: "DELETE"
              }
             );

             if(response.ok){
                 fetchCourses();
             }else{
                console.error("Error deleting course:", response.statusText)
             }
          }catch(error){
              console.error("Error deleting course")
            }
        }
     }
   })
   fetchCourses();
})