
import React from 'react';
import { Filter, Search } from 'lucide-react';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  showSearch = true,
  onSearch
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 text-sm rounded-full ${
              activeFilter === filter ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {showSearch && (
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
          <div className="relative">
            <Search className="h-4 w-4 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-2 py-1 text-sm border rounded-md w-40 focus:outline-none focus:border-blue-500" 
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
