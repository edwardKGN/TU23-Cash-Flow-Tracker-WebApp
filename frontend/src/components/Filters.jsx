function Filters({ filters, setFilters }) {
    return (
        <div>
            <select
                value={filters.month}
                onChange={(e) =>
                    setFilters({ 
                        ...filters, 
                        month: e.target.value ? parseInt(e.target.value): "" // Need to convert to integer for reference
                    })
                } 
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
            />
            
        </div>
    )
}

export default Filters;
