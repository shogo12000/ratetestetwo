
export const getUserReview = async (userId)=>{
    try {
        const resp = await fetch(`/api/getUserReview?userId=${userId}`);
        if (resp.ok) {
          return resp;
        } else {
          throw new Error("Error Please try again!!")
        }
      } catch (error) {
        console.log("Erro:", error);
        throw error;
      }
}

export const updateReview = async (data)=>{
 
  try{
    const response = await fetch("/api/postUpdateReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(response.ok){
      return response;
    }else{
      throw new Error("Error Please try again!!")
    } 
  }catch (error){
    console.log("Erro: ", error);
    throw error;
  }
}

export const deleteReview = async (data)=>{
  try{

  }catch(error){
    console.log("Error: ", error);
    throw error;
  }
}