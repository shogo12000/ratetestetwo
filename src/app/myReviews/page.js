'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Link from "next/link";

const MyReviews = () => {
    const [dataReview, setDataReview] = useState([]); // Estado inicial com array
    const [modifiedReviews, setModifiedReviews] = useState({}); // Estado para controle de modificações por revisão
    const router = useRouter(); 

    useEffect(() => {
        const fetchReviews = async () => {
            const resp = await fetch("/api/showUserReview");
            const data = await resp.json();
            setDataReview(data);
        };

        fetchReviews();
    }, []); 

    const editChange = (id)=>{
        router.push(`/userReview?id=${id}`)
    }

    return (
        <div>
            {dataReview.length > 0 ? (
                dataReview.map((data, index) => (
                    <div key={index} className="p-4 border-b border-gray-300">
                        {data._id}
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded"
                            value={data.courseCode}
                            onChange={(e) => handleChange(index, "courseCode", e.target.value)}
                            readOnly={!modifiedReviews[index]?.editChange}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.courseTitle}
                            onChange={(e) => handleChange(index, "courseTitle", e.target.value)}
                            readOnly={!modifiedReviews[index]?.editChange}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.professorName}
                            onChange={(e) => handleChange(index, "professorName", e.target.value)}
                            readOnly={!modifiedReviews[index]?.editChange}
                        />
                        <textarea
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.studentReview}
                            onChange={(e) => handleChange(index, "studentReview", e.target.value)}
                            readOnly={!modifiedReviews[index]?.editChange}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.createdAt}
                            onChange={(e) => handleChange(index, "createdAt", e.target.value)}
                            readOnly={!modifiedReviews[index]?.editChange}
                        /> 
                        <button
                            onClick={() => editChange(data._id)}
                            className="bg-gray-300 p-2 rounded-xl">
                            Edit
                        </button> 
                        <button
                            className="bg-gray-300 p-2 rounded-xl"
                        >Delete</button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Carregando reviews...</p>
            )}
        </div>
    );
};

export default MyReviews;
