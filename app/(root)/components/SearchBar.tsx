"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchBar = () => {
  const [value, setValue] = useState<string | null>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = () => {
    console.log("hello worlf")
    const url = qs.stringifyUrl(
      {
        url: "/products",
        query: {
          key: value,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    if (value?.trim() !== "") {
      router.push(`${url}&page=1`);
    } else {
      router.push("/products?page=1"); // Redirect to the default URL when the search bar is empty
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative w-full ">
      <button type={"submit"} className="absolute top-0 right-0 cursor-pointer bg-yellow-500 p-3 rounded-r-md">
        <Search
          className=" w-4 h-4 text-slate-100"
          onClick={onSubmit}
        />
      </button>
      <Input
        className="w-full pl-4 bg-slate-50 text-slate-800"
        placeholder="Search For a Product..."
        value={value || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
