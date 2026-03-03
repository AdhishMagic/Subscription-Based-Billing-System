import { createContext, useState, useContext, useCallback } from 'react';
import { mockDefaultCommands } from '../data/mockIntelligenceData';

const CommandContext = createContext(null);

export const CommandProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [commands, setCommands] = useState(mockDefaultCommands);

    const openCommandPalette = () => setIsOpen(true);
    const closeCommandPalette = () => setIsOpen(false);
    const toggleCommandPalette = () => setIsOpen(prev => !prev);

    // Allow modules to register their own quick actions dynamically
    const registerCommand = useCallback((command) => {
        setCommands(prev => {
            if (prev.find(c => c.id === command.id)) return prev;
            return [...prev, command];
        });
    }, []);

    const unregisterCommand = useCallback((commandId) => {
        setCommands(prev => prev.filter(c => c.id !== commandId));
    }, []);

    return (
        <CommandContext.Provider value={{
            isOpen,
            openCommandPalette,
            closeCommandPalette,
            toggleCommandPalette,
            commands,
            registerCommand,
            unregisterCommand
        }}>
            {children}
        </CommandContext.Provider>
    );
};

export const useCommand = () => useContext(CommandContext);
