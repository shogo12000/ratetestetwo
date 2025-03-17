'use client';
import { redirect } from 'next/navigation'
import LogoutBtn from "../components/btnLogout"
import { useState } from 'react';

const PageOne = () => {
    const [subTitle, setSubTitle] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [professorName, setProfessorName] = useState("");
    const [studentReview, setStudentReview] = useState("");

    const handleForm = async (e)=>{
        e.preventDefault();

        try{
            const response = await fetch(`/api/addReview`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    subTitle: subTitle,
                    courseCode: courseCode,
                    courseTitle: courseTitle,
                    professorName: professorName,
                    studentReview: studentReview
                })
            })

            console.log(await response.json())
        }catch(error){
            console.log("form error: ", error)
        }
        
    }

 
    
    return (
        <div>
            <div className='max-w-2xl m-auto'>
                <form onSubmit={(e)=>handleForm(e)}>
                    <input type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="SubTitle" 
                        className={`border p-2 block w-full mb-2  `} />

                    <input type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        placeholder="Course Code" 
                        className={`border p-2 block w-full mb-2  `} />

                    <input type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Course Title"
                        className={`border p-2 block w-full mb-2  `} />

                    <input type="text"
                        value={professorName}
                        onChange={(e) => setProfessorName(e.target.value)}
                        placeholder="Professor Name"
                        className={`border p-2 block w-full mb-2  `} />

                    <textarea 
                        value={studentReview}
                        onChange={(e) => setStudentReview(e.target.value)}
                        className='w-full p-2 border-1'
                        rows="4"
                        //    cols="50" 
                        placeholder="Review" />

                    <button type="submit" className='bg-gray-300 p-2 rounded-lg'>Add Review</button>

                </form>
            </div>

            <LogoutBtn />
        </div>
    )
}

export default PageOne