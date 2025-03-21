import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { AuthContext } from "../context/myContext";
import { useContext } from "react";
import { getUserReview, updateReview } from "../services/services"

const UserReviewForm = ({ userId }) => {
  const router = useRouter()
  const { contextMyReview } = useContext(AuthContext); 
  const [reviewData, setReviewData] = useState({
    courseCode: "",
    courseTitle: "",
    createdAt: "",
    professorName: "",
    studentReview: "",
    userEmail: "",

  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getUserReview(userId);
        console.log(response);
        if(response.ok){
          const resp = await response.json();
          setReviewData(resp);
        }else{
          throw new Error("Error. Please try again later!!!");
        }
      }catch(error){
        throw error;
      }
    };

    fetchData();
  }, [userId]);  

 
  const handleSaveBtn = async () => { 
    try{
      const  resp  = await updateReview(reviewData) 
      if( resp.ok ){
        contextMyReview();     
        router.back();   
      }else{
        throw new Error("Error Please try again!!");
      }
    }catch(error){
      throw error;
    }  
  }

  const handleFieldChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>User Review Formx</h1>
      <div>
        <label htmlFor="courseCode" className="block">Course Code:</label>
        <input
          type="text"
          id="courseCode"
          name="courseCode"  // Nome do campo, deve corresponder à chave do estado
          value={reviewData.courseCode}  // Valor vinculado ao estado
          className="border-1  px-2 rounded-lg w-full"
          onChange={handleFieldChange}  // Atualiza o estado ao digitar
        />
      </div>

      <div>
        <label htmlFor="courseTitle" className="block">Course Title:</label>
        <input
          type="text"
          id="courseTitle"
          name="courseTitle"  // Nome do campo, deve corresponder à chave do estado
          value={reviewData.courseTitle}  // Valor vinculado ao estado
          className="border-1 px-2 rounded-lg w-full"
          onChange={handleFieldChange}  // Atualiza o estado ao digitar
        />
      </div>

      <div>
        <label htmlFor="professorName" className="block">Professor Name:</label>
        <input
          type="text"
          id="professorName"
          name="professorName"  // Nome do campo, deve corresponder à chave do estado
          value={reviewData.professorName}  // Valor vinculado ao estado
          className="border-1 px-2 rounded-lg w-full"
          onChange={handleFieldChange}  // Atualiza o estado ao digitar
        />
      </div>

      <div>
        <label htmlFor="studentReview" className="block">Student Review:</label>
        <textarea
          id="studentReview"
          name="studentReview"  // Nome do campo, deve corresponder à chave do estado
          value={reviewData.studentReview}  // Valor vinculado ao estado
          className="border-1 px-2 rounded-lg w-full"
          onChange={handleFieldChange}  // Atualiza o estado ao digitar
        />
      </div>

      <p>{reviewData.createdAt}</p>

      <button onClick={handleSaveBtn}
        className="bg-gray-300 p-2 rounded-xl"
      >Save</button>

      <button
        className="bg-gray-300 p-2 rounded-xl"
        onClick={() => router.back()}>Cancel</button>
    </>
  );
};

export default UserReviewForm;
