'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }) {
  const router = useRouter()

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-end">
            <button className="mb-4 text-red-500" onClick={() => router.back()}>
              Close
            </button>
          </div> 
          {children}
        </div>
      </div>
    </>
  )
}