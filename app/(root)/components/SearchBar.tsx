import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
      <div className="relative w-full ">
        <Search className="absolute top-3 left-3 w-4 h-4 text-slate-600" />
        <Input
          className="w-full pl-9 bg-slate-50"
          placeholder="Search For a Product..."
        />
      </div>
  );
};

export default SearchBar;
