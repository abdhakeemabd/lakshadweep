import React, { useState, useMemo } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { HiChevronDown, HiCheck, HiSearch } from 'react-icons/hi'

const SearchableSelect = ({ options, value, onChange, placeholder = 'Select Option', searchPlaceholder = 'Search...', align = 'left' }) => {
  const [query, setQuery] = useState('');
  const filteredOptions = useMemo(() =>
    query === ''
      ? options
      : options.filter((option) =>
        option.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
      ), [query, options]);

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all h-[45px] flex items-center px-4 min-w-[130px]">
            <span className={`block truncate text-sm pr-6 ${value ? 'text-gray-900' : 'text-gray-400'}`}>
              {value || placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <HiChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </span>
          </ListboxButton>
          <Transition show={open} as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
            <ListboxOptions static className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} z-110 mt-1 max-h-72 w-full min-w-[220px] rounded-xl bg-white py-1 text-base shadow-2xl focus:outline-none sm:text-sm border border-gray-100`}>
              <div className="p-3 sticky top-0 bg-white border-b border-gray-50 z-10" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <HiSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input type="text" autoFocus className="w-full rounded-lg border border-gray-100 py-2 pl-9 pr-3 text-sm leading-5 text-gray-900 focus:border-orange-500 outline-none transition-all" placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      e.stopPropagation();
                    }
                  }} />
                </div>
              </div>
              <div className="overflow-auto max-h-[220px] custom-scrollbar">
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-3 px-4 text-sm text-gray-500">
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <ListboxOption
                      key={option}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm transition-colors ${active ? 'bg-orange-50 text-orange-900' : 'text-gray-700'
                        }`
                      }
                      value={option}>
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                            {option}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                              <HiCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))
                )}
              </div>
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default SearchableSelect;
