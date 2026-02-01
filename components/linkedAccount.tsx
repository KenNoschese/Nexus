'use client'

import { linkMoodleAccount } from '@/app/actions'
import { useState } from 'react'

function linkedAccount() {
    const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await linkMoodleAccount(formData)
    if (result?.error) setError(result.error)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form action={handleSubmit} className="p-8 border rounded-lg shadow-md bg-white w-96">
        <h1 className="text-2xl text-black font-bold mb-6">Login to Nexus</h1>
        
        <input name="username" placeholder="ID Number" className="w-full text-black p-2 mb-4 border rounded" required />
        <input name="password" type="password" placeholder="Moodle Password" className="w-full text-black p-2 mb-4 border rounded" required />
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button type="submit" className="w-full bg-blue-600 text-black p-2 rounded hover:bg-blue-700">
          Sync Daigler25
        </button>
      </form>
    </div>
  )
}
export default linkedAccount