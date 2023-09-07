"use client";
import { useRef, FC, FocusEvent } from "react";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const clickPoint = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (clickPoint.current) {
      clickPoint.current.style.display = "none";
    }
  };

  const handleBlur = () => {
    if (clickPoint.current) {
      clickPoint.current.style.display = "block";
    }
  };

  return (
    <div className="relative lg:my-0">
      <div className="absolute top-3 right-3 items-center" ref={clickPoint}>
        <svg
          className="w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        className="p-2 pl-3 pr-10 text-gray-900 bg-gray-50 rounded-full border-2 border-primary focus:pl-3"
        placeholder="Rechercher un joueur: "
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default SearchBar;
