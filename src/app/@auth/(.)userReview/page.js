"use client";
import { Modal } from "../../ui/modal"
import { useSearchParams, useRouter } from "next/navigation";
import UserReviewForm from "../../ui/userReviewForm"
 
export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  return (
    <Modal> 
      <h1>TEste</h1>
      {userId}
      <UserReviewForm userId={userId}/>
    </Modal>
  )
}