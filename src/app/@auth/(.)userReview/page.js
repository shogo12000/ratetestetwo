"use client";

import { Modal } from "../../ui/modal";
import { useSearchParams } from "next/navigation";
import UserReviewForm from "../../ui/userReviewForm";
import { Suspense } from "react";

function UserReviewContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  return (
    <Modal>
      <h1>Teste</h1>
      {userId}
      <UserReviewForm userId={userId} />
    </Modal>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserReviewContent />
    </Suspense>
  );
}