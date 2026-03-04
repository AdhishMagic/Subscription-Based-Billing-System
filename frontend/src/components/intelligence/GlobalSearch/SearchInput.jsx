import { useEffect, useRef } from 'react';
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useSearch } from '../../../context';
import GlobalSearchDropdown from './GlobalSearchDropdown';
import useHotkeys from '../../../hooks/useHotkeys';
import './GlobalSearch.css';

const SearchInput = () => {
    const {
        query,
        setQuery,
        isOpen,
        openSearch,
        closeSearch
    } = useSearch();

    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                closeSearch();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeSearch]);

    // Command + K or Ctrl + K shortcut
    useHotkeys('k', (e) => {
        if (!isOpen) {
            inputRef.current?.focus();
            openSearch();
        }
    }, { ctrlKey: true, preventDefault: true });

    return (
        <div className="global-search__wrapper" ref={containerRef}>
            <div className={`global-search__input-box ${isOpen ? 'is-focused' : ''}`}>
                <HiOutlineMagnifyingGlass className="global-search__icon" size={16} />
                <input
                    ref={inputRef}
                    type="text"
                    className="global-search__input"
                    placeholder="Search anything (Ctrl+K)..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (!isOpen) openSearch();
                    }}
                    onFocus={openSearch}
                    aria-label="Global Search"
                />

                {query && (
                    <button
                        className="global-search__clear-btn"
                        onClick={() => {
                            setQuery('');
                            inputRef.current?.focus();
                        }}
                    >
                        <HiXMark size={14} />
                    </button>
                )}

                {!query && !isOpen && (
                    <div className="global-search__shortcut">
                        <kbd>Ctrl K</kbd>
                    </div>
                )}
            </div>

            <GlobalSearchDropdown />
        </div>
    );
};

export default SearchInput;
