"use client";

import React, { useState } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
} from "react-international-phone";
import "react-international-phone/style.css";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";

interface PhoneInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (phone: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  isDark?: boolean;
  isInvalid?: boolean;
}

export const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  isDark = true,
  isInvalid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { country, setCountry, phone, handlePhoneValueChange } = usePhoneInput({
    defaultCountry: "us",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  const filteredCountries = defaultCountries.filter((c) => {
    const parsed = parseCountry(c);
    const searchTerm = search.toLowerCase().trim();
    return (
      parsed.name.toLowerCase().includes(searchTerm) ||
      parsed.dialCode.includes(searchTerm) ||
      parsed.iso2.toLowerCase().includes(searchTerm)
    );
  });

  const selectedCountryParsed = country || parseCountry(defaultCountries[0]);

  const inputClassName = isDark
    ? "bg-black/30 border-outline/30 input-blur text-white placeholder:text-white/30 focus-visible:border-white/50 focus-visible:ring-white/20 rounded-[0.75rem] h-16"
    : "bg-black/2 border-black/10 text-black placeholder:text-black/30 focus-visible:border-blue/50 focus-visible:ring-blue/20";

  return (
    <div className="relative flex items-center w-full">
      {/* Country Selector Button */}
      <div className="relative z-10 flex items-center h-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex items-center gap-2 px-3.5 pt-4 border-r transition-colors cursor-pointer focus:outline-none h-16",
            isDark ? "border-white/20 text-white " : "border-black/20 text-black ",
          )}
        >
          <FlagImage
            iso2={selectedCountryParsed.iso2}
            className="w-5 h-3.5 object-cover rounded-sm"
          />
          <span className="text-sm font-semibold">{selectedCountryParsed.iso2.toUpperCase()}</span>
          <span className="text-sm opacity-75">+{selectedCountryParsed.dialCode}</span>
          <ChevronDown className="w-4 h-4 opacity-60 ml-0.5" />
        </button>

        {/* Search & Country List Dropdown */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-99" onClick={() => setIsOpen(false)} />
            <div
              className={cn(
                "absolute left-0 top-full mt-2 w-72 max-h-64 z-100 rounded-xl shadow-2xl border overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150",
                isDark
                  ? "bg-neutral-900 border-white/20 text-white"
                  : "bg-white border-black/10 text-black",
              )}
            >
              {/* Search Header */}
              <div className="p-2 border-b border-white/10 flex items-center gap-2">
                <Search className="w-4 h-4 opacity-50 ml-1" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full bg-transparent text-xs outline-none py-1 placeholder:opacity-50"
                  autoFocus
                />
              </div>

              {/* Country List */}
              <div className="overflow-y-auto flex-1 divide-y divide-white/5 scrollbar-thin">
                {filteredCountries.length === 0 ? (
                  <div className="p-3 text-xs text-center opacity-50">No country found</div>
                ) : (
                  filteredCountries.map((c) => {
                    const parsed = parseCountry(c);
                    const isSelected = parsed.iso2 === selectedCountryParsed.iso2;
                    return (
                      <button
                        key={parsed.iso2}
                        type="button"
                        onClick={() => {
                          setCountry(parsed.iso2);
                          setIsOpen(false);
                          setSearch("");
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors cursor-pointer",
                          isDark ? "hover:bg-white/10" : "hover:bg-black/5",
                          isSelected &&
                            (isDark ? "bg-white/15 font-semibold" : "bg-black/10 font-semibold"),
                        )}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FlagImage
                            iso2={parsed.iso2}
                            className="w-5 h-3.5 object-cover rounded-sm"
                          />
                          <span className="truncate">{parsed.name}</span>
                        </div>
                        <span className="opacity-60 font-mono text-[11px] ml-2">
                          +{parsed.dialCode}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Phone Input field */}
      <input
        id={id}
        name={name}
        type="tel"
        value={phone}
        onChange={handlePhoneValueChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          inputClassName,
          "flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-3 rounded-none",
          className,
        )}
        aria-invalid={isInvalid}
      />
    </div>
  );
};
