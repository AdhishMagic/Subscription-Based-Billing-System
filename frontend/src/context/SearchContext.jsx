import { createContext, useState, useEffect, useContext } from 'react';
import { mockSearchIndex } from '../data/mockIntelligenceData';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    const toggleSearch = () => setIsOpen((prev) => !prev);
    const openSearch = () => setIsOpen(true);
    const closeSearch = () => setIsOpen(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults({});
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        // Mock debounce & indexing delay
        const timer = setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            const filteredResults = {};

            Object.entries(mockSearchIndex).forEach(([category, items]) => {
                const matches = items.filter(item =>
                    item.label.toLowerCase().includes(lowerQuery) ||
                    item.id.toLowerCase().includes(lowerQuery)
                );
                if (matches.length > 0) {
                    filteredResults[category] = matches;
                }
            });

            setResults(filteredResults);
            setIsSearching(false);
        }, 150); // fast 150ms mock search

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <SearchContext.Provider value={{
            isOpen,
            query,
            results,
            isSearching,
            setQuery,
            toggleSearch,
            openSearch,
            closeSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
