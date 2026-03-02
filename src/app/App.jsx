/* ==========================================================================
   APP — ROOT COMPONENT
   Wires all providers and the router together.
   
   Separation of Concerns:
   - App.jsx is ONLY responsible for provider composition.
   - It does NOT contain any UI, logic, or state.
   - Provider order matters: Auth → Theme → Loader → Toast → Modal → Router
     (innermost providers can depend on outermost).
   
   Provider Chain:
   ErrorBoundary
    └─ AuthProvider
        └─ ThemeProvider
            └─ LoaderProvider
                └─ ToastProvider
                    └─ ModalProvider
                        └─ AppRouter
                        └─ GlobalLoader
                        └─ Modal
                        └─ ToastContainer
   ========================================================================== */

import {
    AuthProvider,
    ThemeProvider,
    LoaderProvider,
    ToastProvider,
    ModalProvider,
    DataProvider
} from '../context';

import { ErrorBoundary, GlobalLoader, Modal, ToastContainer } from '../components/feedback';
import AppRouter from '../routes/AppRouter';

const App = () => (
    <ErrorBoundary>
        <AuthProvider>
            <DataProvider>
                <ThemeProvider>
                    <LoaderProvider>
                        <ToastProvider>
                            <ModalProvider>
                                <AppRouter />
                                <GlobalLoader />
                                <Modal />
                                <ToastContainer />
                            </ModalProvider>
                        </ToastProvider>
                    </LoaderProvider>
                </ThemeProvider>
            </DataProvider>
        </AuthProvider>
    </ErrorBoundary>
);

export default App;
