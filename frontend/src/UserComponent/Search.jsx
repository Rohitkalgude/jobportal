import { CiSearch } from "react-icons/ci";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs"
          className="w-full py-2 pl-4 pr-10 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <CiSearch className="absolute right-3 w-5 h-5 text-gray-500" />
      </div>
    </form>
  );
}
