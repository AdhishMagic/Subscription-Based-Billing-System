import { useSearch } from '../../../context';
import { HiOutlineMagnifyingGlass, HiOutlineArrowRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import './GlobalSearch.css';

const SearchResultGroup = ({ category, items, query, closeSearch }) => {
    const navigate = useNavigate();

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        <span key={i} className="search-highlight">{part}</span> : part
                )}
            </span>
        );
    };

    return (
        <div className="global-search__group">
            <h4 className="global-search__group-title">{category}</h4>
            <div className="global-search__group-items">
                {items.map(item => (
                    <button
                        key={item.id}
                        className="global-search__item"
                        onClick={() => {
                            navigate(`${item.path}/${item.id}`);
                            closeSearch();
                        }}
                    >
                        <div className="global-search__item-left">
                            <span className="global-search__item-id">{highlightText(item.id, query)}</span>
                            <span className="global-search__item-label">{highlightText(item.label, query)}</span>
                        </div>
                        <div className="global-search__item-right">
                            <span className="global-search__item-badge">{item.status}</span>
                            <HiOutlineArrowRight className="global-search__item-arrow" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const GlobalSearchDropdown = () => {
    const { isOpen, query, results, isSearching, closeSearch } = useSearch();

    if (!isOpen || !query) return null;

    const hasResults = Object.keys(results).length > 0;

    return (
        <div className="global-search__dropdown">
            {isSearching ? (
                <div className="global-search__loading">
                    <div className="spinner"></div>
                    <span>Searching...</span>
                </div>
            ) : hasResults ? (
                Object.entries(results).map(([category, items]) => (
                    <SearchResultGroup
                        key={category}
                        category={category}
                        items={items}
                        query={query}
                        closeSearch={closeSearch}
                    />
                ))
            ) : (
                <div className="global-search__no-results">
                    <HiOutlineMagnifyingGlass size={24} />
                    <p>No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
};

export default GlobalSearchDropdown;
