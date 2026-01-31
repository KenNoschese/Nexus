import { createTask } from "@/app/actions"

function addtask() {
  return (
        <section className="bg-white/5 border border-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Quick Launch Task</h2>
          <form action={createTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                name="title"
                type="text"
                placeholder="What is your primary focus?"
                className="w-full bg-black/20 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <select 
                name="energyLevel" 
                className="w-full bg-black/20 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                defaultValue="medium"
              >
                <option value="high">🔥 High Energy</option>
                <option value="medium">⚡ Medium Energy</option>
                <option value="low">🌱 Low Energy</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 rounded-xl transition-colors shadow-lg shadow-blue-900/20"
            >
              Add to Queue
            </button>
          </form>
        </section>
  )
}
export default addtask