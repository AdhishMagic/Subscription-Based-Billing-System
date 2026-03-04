/* ==========================================================================
   GLOBAL LOADER COMPONENT
   Full-screen loading overlay — reads LoaderContext.
   ========================================================================== */

import useLoader from '../../../hooks/useLoader';
import './GlobalLoader.css';

const GlobalLoader = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="global-loader" aria-busy="true" aria-label="Loading">
            <div className="global-loader__spinner" />
        </div>
    );
};

export default GlobalLoader;
