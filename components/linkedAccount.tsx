'use client'

import { linkMoodleAccount } from '@/app/actions'
import { useState } from 'react'

function LinkedAccount({ isLinked }: { isLinked: boolean }) {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await linkMoodleAccount(formData)
    if (result?.error) setError(result.error)
  }

  if (isLinked) {
    return (
      <div className="flex items-center justify-between p-8 bg-white/5 border border-gray-800 rounded-2xl md:w-full">
        <h1 className="text-xl font-bold">Daigler25</h1>
        <div className="flex items-center gap-2 px-6 py-2 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Synced</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 border border-gray-800 rounded-2xl md:w-full">
      <form action={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Link Daigler25</h1>
        
        <input name="username" placeholder="ID Number" className="w-full bg-black/20 border border-gray-700 p-2 mb-4 rounded text-white" required />
        <input name="password" type="password" placeholder="Moodle Password" className="w-full bg-black/20 border border-gray-700 p-2 mb-4 rounded text-white" required />
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">
          Sync Account
        </button>
      </form>
    </div>
  )
}
export default LinkedAccount