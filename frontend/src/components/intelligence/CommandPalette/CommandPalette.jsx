import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
    HiOutlineDocumentText,
    HiOutlineChartBar,
    HiOutlineCube,
    HiOutlineMoon
} from 'react-icons/hi2';
import { useCommand, useTheme } from '../../../context';
import useHotkeys from '../../../hooks/useHotkeys';
import './CommandPalette.css';

// Simple icon mapper based on string names from mock data
const IconMap = {
    Plus: HiOutlinePlus,
    DocumentText: HiOutlineDocumentText,
    ChartBar: HiOutlineChartBar,
    Cube: HiOutlineCube,
    Moon: HiOutlineMoon
};

const CommandPalette = () => {
    const { isOpen, closeCommandPalette, toggleCommandPalette, commands } = useCommand();
    const { toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const inputRef = useRef(null);

    // Global hotkey to toggle (Ctrl + Shift + P or Cmd + K)
    useHotkeys('p', toggleCommandPalette, { ctrlKey: true, shiftKey: true, preventDefault: true });
    useHotkeys('k', toggleCommandPalette, { ctrlKey: true, preventDefault: true });

    // Close on Escape mapped natively in component when open to avoid re-triggering hooks
    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setActiveIndex(0);
        } else {
            // Need a slight timeout to focus because of react mount
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Local keydown for list navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeCommandPalette();
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            setActiveIndex(prev => (prev + 1) % filteredCommands.length);
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            executeCommand(filteredCommands[activeIndex]);
            e.preventDefault();
        }
    };

    const executeCommand = (cmd) => {
        if (!cmd) return;

        if (cmd.action === 'NAVIGATE' && cmd.path) {
            navigate(cmd.path);
        } else if (cmd.action === 'TOGGLE_THEME') {
            toggleTheme();
        }

        closeCommandPalette();
    };

    if (!isOpen) return null;

    const lowerQuery = query.toLowerCase();
    const filteredCommands = commands.filter(c =>
        c.label.toLowerCase().includes(lowerQuery) ||
        c.group.toLowerCase().includes(lowerQuery)
    );

    // Grouping for render
    const groups = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.group]) acc[cmd.group] = [];
        acc[cmd.group].push(cmd);
        return acc;
    }, {});

    let globalIndex = 0;

    return (
        <div className="command-palette__overlay" onClick={closeCommandPalette}>
            <div
                className="command-palette__dialog"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Command Palette"
            >
                <div className="command-palette__header">
                    <HiOutlineMagnifyingGlass className="command-palette__icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="command-palette__input"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="command-palette__body">
                    {Object.keys(groups).length === 0 ? (
                        <div className="command-palette__empty">No commands found.</div>
                    ) : (
                        Object.entries(groups).map(([groupName, groupCommands]) => (
                            <div key={groupName} className="command-palette__group">
                                <div className="command-palette__group-title">{groupName}</div>
                                {groupCommands.map(cmd => {
                                    const Icon = IconMap[cmd.icon] || HiOutlineCube;
                                    const currentIndex = globalIndex++;
                                    const isActive = currentIndex === activeIndex;

                                    return (
                                        <button
                                            key={cmd.id}
                                            className={`command-palette__item ${isActive ? 'is-active' : ''}`}
                                            onClick={() => executeCommand(cmd)}
                                            onMouseEnter={() => setActiveIndex(currentIndex)}
                                        >
                                            <Icon className="command-palette__item-icon" />
                                            <span className="command-palette__item-label">{cmd.label}</span>
                                            {isActive && <span className="command-palette__item-hint">⏎ to execute</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>

                <div className="command-palette__footer">
                    <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                    <span><kbd>Enter</kbd> to select</span>
                    <span><kbd>Esc</kbd> to close</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
