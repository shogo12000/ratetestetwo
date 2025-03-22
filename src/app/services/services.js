
export const getUserReview = async (userId) => {
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

export const updateReview = async (data) => {

  try {
    const response = await fetch("/api/postUpdateReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error("Error Please try again!!")
    }
  } catch (error) {
    console.log("Erro: ", error);
    throw error;
  }
}

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`/api/getDeleteReview?reviewId=${reviewId}`)

    if (response.ok) {
      return response;
       
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar a revisão");
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export const getAllReviews = async () => {
  try{

    const response = await fetch("/api/getAllReviews");
    
    if(response.ok){
      return response;
    }else{
      throw new Error("error");
    }

  }catch(error){
    throw error;
  }
}
 
export const searchData = async (searchWord) => {
 console.log("valor da api", searchWord)
  try{
 
    const response = await fetch(`/api/getSearch?find=${searchWord}`)

    if(response.ok){
      return response;
    }else{
      throw new Error("error");
    }

  }catch(error){
    throw error;
  }
}