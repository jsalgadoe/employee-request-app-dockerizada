import { AuthProvider } from "./auth/context/AuthProvider";

import { AppRouter } from "./routes/App.router";
import { AppTheme } from "./theme/AppTheme";

export const RequestEmployeeApp = () => {
  return (
    <AppTheme>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppTheme>
  );
};

//* Componente para verificar estado <Debugger />
