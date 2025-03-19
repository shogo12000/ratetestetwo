"use client";

import { Modal } from "../../ui/modal";
import { useSearchParams } from "next/navigation";
import UserReviewForm from "../../ui/userReviewForm";
import { Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal>
        <h1>Teste</h1>
        {userId}
        <UserReviewForm userId={userId} />
      </Modal>
    </Suspense>
  );
}
