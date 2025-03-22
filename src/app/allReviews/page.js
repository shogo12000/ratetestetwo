"use client";
import { useEffect, useState } from "react";
import { getAllReviews, searchData } from "../services/services";
import { AuthContext } from "../context/myContext";
import { useContext } from "react";

const AllReviews = () => {
    const [pageError, setPageError] = useState(false);
    const [data, setData] = useState([]);
    const [searchField, setSearchField] = useState("")
    const { getSearchData, dataSearch } = useContext(AuthContext);

    useEffect(() => {

        getSearchData(null);

        // const getReviews = async () => {
        //     try {
        //         const response = await getAllReviews();

        //         if (!response.ok) {
        //             throw new Error("error try again!!!");
        //         }

        //         const data = await response.json();
        //         setData(data);

        //     } catch (error) {
        //         setPageError(true)
        //     }
        // }

        // getReviews();


    }, [])

    const searchBtn = async () => {
        getSearchData(searchField);
        
        console.log(dataSearch);
        // try{
        //     const response = await searchData(searchField);

        //     if(response.ok){
        //         console.log(response);
        //         console.log(await response.json())
        //         console.log("xxxxxxxxxxx")
        //     }else{
        //         console.log("error")
        //     }

        // }catch(error){
        //     setPageError(true);
        // }
    }

    if (pageError) {
        return <h1>Error try again</h1>
    }

    // if(dataSearch.length === 0){
    //     return <p>try again later!!!</p>
    // }

    return (
        <div> 
            <input type="text"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)} className="border-1" />
            <button onClick={searchBtn} className="p-2 bg-gray-300 rounded-lg">
                Search
            </button>

            <section>
                {dataSearch.map((e, index) => {
                    return (
                        <article key={index} className="p-5 my-2 bg-amber-100" >
                            <div className="flex gap-1">
                                <h3 className="font-semibold">Title: </h3>
                                <p>{e.courseTitle}</p>
                            </div>

                            <div className="flex gap-1">
                                <h3 className="font-semibold">Course Code: </h3>
                                <p>{e.courseCode}</p>
                            </div>

                            <div className="flex gap-1">
                                <h3 className="font-semibold">Professor</h3>
                                <p>{e.professorName}</p>
                            </div>

                            <div className="flex gap-1">
                                <h3 className="font-semibold">Review</h3>
                                <p>{e.studentReview}</p>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    )
}

export default AllReviews;