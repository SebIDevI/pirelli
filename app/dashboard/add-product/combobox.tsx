"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";

export function Combobox({
  val,
  types,
  placeholder,
  searchText,
}: {
  val: string;
  types: { value: string; label: string }[];
  placeholder: string;
  searchText: string;
}) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  const { setValue } = useFormContext();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {val
            ? types.find((type) => type.value === val)?.label
            : `${placeholder}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${searchText}...`} />
          <CommandList aria-disabled={false}>
            <CommandEmpty>No family found.</CommandEmpty>
            <CommandGroup>
              {types.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setValue(
                      `${searchText}`,
                      currentValue === val ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                  aria-disabled={false}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      val === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
