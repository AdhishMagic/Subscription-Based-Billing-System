import { createContext, useContext } from 'react';
import { SearchProvider } from './SearchContext';
import { NotificationProvider } from './NotificationContext';
import { CommandProvider } from './CommandContext';

/**
 * IntelligenceContext acts as the global wrapper/dispatcher for cross-module features.
 * When real WebSockets are added, this context will initialize socket.io and dispatch 
 * events to Notifications, Alerts, etc.
 */
const IntelligenceContext = createContext(null);

export const IntelligenceProvider = ({ children }) => {
    // In future: setup WebSocket connection here
    // socket.on('message', (event) => { if(event.type === 'ALERT') addNotification(...) })

    return (
        <IntelligenceContext.Provider value={{ /* socket status or global settings */ }}>
            <NotificationProvider>
                <SearchProvider>
                    <CommandProvider>
                        {children}
                    </CommandProvider>
                </SearchProvider>
            </NotificationProvider>
        </IntelligenceContext.Provider>
    );
};

export const useIntelligence = () => useContext(IntelligenceContext);
