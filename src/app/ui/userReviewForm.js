import { useEffect } from "react"


const UserReviewForm = ({ userId }) => {

    useEffect(() => {
        console.log("funcionando")
        console.log(userId);
        const fetchData = async () => {

            try {
                const resp = await fetch(`/api/getUserReview?userId=${userId}`);
                console.log(resp)
                if (resp.ok) {
                    const result = await resp.json();
                    console.log("resultado")
                    console.log(result);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.log("error: ", error);
            }
        }

        fetchData();
    })

    return (
        <>
            <h1>UserReviewForm </h1>
            <p>{userId}</p>
        </>

    )
}

export default UserReviewForm