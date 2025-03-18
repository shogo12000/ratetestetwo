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
    const [loading, setLoading] = useState(false);
    const [dataSaved, setDataSaved] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/addReview`, {
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

  
            if(response.ok){
                setDataSaved(true);
            }else{
                setDataSaved(false);
                setLoading(false);
            }
 
        } catch (error) {
            console.log("form error: ", error)
        }

    }



    return (
        <div>

            <div className='max-w-2xl m-auto'>
                <form onSubmit={(e) => handleForm(e)}>
                    <input type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="SubTitle"
                        disabled={loading}
                        className={`border p-2 block w-full mb-2 ${loading && "bg-gray-300"}`} />

                    <input type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        placeholder="Course Code"
                        disabled={loading}
                        className={`border p-2 block w-full mb-2 ${loading && "bg-gray-300"}`} />

                    <input type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Course Title"
                        disabled={loading}
                        className={`border p-2 block w-full mb-2 ${loading && "bg-gray-300"}`} />

                    <input type="text"
                        value={professorName}
                        onChange={(e) => setProfessorName(e.target.value)}
                        placeholder="Professor Name"
                        disabled={loading}
                        className={`border p-2 block w-full mb-2 ${loading && "bg-gray-300"}`} />

                    <textarea
                        value={studentReview}
                        onChange={(e) => setStudentReview(e.target.value)}
                        className={`w-full p-2 border-1 ${loading && "bg-gray-300"}`}
                        rows="4"
                        disabled={loading}
                        //    cols="50" 
                        placeholder="Review" />

                    {!loading ?
                        <button type="submit" className='bg-gray-300 p-2 rounded-lg'>Add Review</button>
                        : dataSaved ?<p className='font-bold'>REVIEW SAVED...</p>: <p className='font-bold'>SAVING YOUR REVIEW...</p>
                    }
                </form>
            </div>

            <LogoutBtn />
        </div>
    )
}

export default PageOne