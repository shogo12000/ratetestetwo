'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import { AuthContext } from "../context/myContext";
import { useContext } from "react";

const MyReviews = () => { 
 
    const router = useRouter(); 
    const { contextMyReview, userDataReview } = useContext(AuthContext);

    useEffect(() => {
        const fetchReviews = async () => { 
            await contextMyReview();  
        }; 
        fetchReviews();
    }, []); 

    const editChange = (id)=>{
        router.push(`/userReview?id=${id}`)
    }

    const handleDeleteBtn = async (id)=>{
        try {
            console.log("btn delete ", id);
            const response = await fetch(`/api/getDeleteReview?reviewId=${id}`)

            if (response.ok) {
                console.log("Revisão deletada com sucesso!");
                await contextMyReview(); 
                // Atualizar o estado da interface, se necessário
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao deletar a revisão");
            }
        } catch (error) {
            throw error;
        }
    }   

    return (
        <div> 
            {userDataReview.length > 0 ? (
                userDataReview.map((data, index) => (
                    <div key={index} className="p-4 border-b border-gray-300">
                        {data._id}
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded"
                            value={data.courseCode}
                            onChange={(e) => handleChange(index, "courseCode", e.target.value)}
                            readOnly={true}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.courseTitle}
                            onChange={(e) => handleChange(index, "courseTitle", e.target.value)}
                            readOnly={true}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.professorName}
                            onChange={(e) => handleChange(index, "professorName", e.target.value)}
                            readOnly={true}
                        />
                        <textarea
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.studentReview}
                            onChange={(e) => handleChange(index, "studentReview", e.target.value)}
                            readOnly={true}
                        />
                        <input
                            type="text"
                            className="border border-gray-400 w-full p-2 rounded mt-2"
                            value={data.createdAt}
                            onChange={(e) => handleChange(index, "createdAt", e.target.value)}
                            readOnly={true}
                        /> 
                        <button
                            onClick={() => editChange(data._id)}
                            className="bg-gray-300 p-2 rounded-xl">
                            Edit
                        </button> 
                        <button
                            onClick={() => handleDeleteBtn(data._id)}
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
