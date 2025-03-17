"use client"
import { useEffect } from "react";

const pagetTwo = ()=>{
    useEffect(()=>{
        const dataReview = async ()=>{
            const resp = await fetch("/api/showReview");
            const showResp = await resp.json();
            console.log(showResp);
        }

        dataReview();
    },[])
    return(
        <div>
            <h1>Page Two</h1>
        </div>
    )
}

export default pagetTwo