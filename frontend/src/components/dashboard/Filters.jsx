function Filters({ filters, setFilters }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-wrap gap-4 items-center">
            <select
                value={filters.month}
                onChange={(e) =>
                    setFilters({ 
                        ...filters, 
                        month: e.target.value ? parseInt(e.target.value): "" // Need to convert to integer for reference
                    })
                }
                className="border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Months</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="4">Apr</option>
            </select>

            <input 
                type="number"
                value={filters.year}
                onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
        </div>
    )
}

export default Filters;
