import { AuthProvider } from "./auth/context/AuthProvider";
import Debugger from "./auth/pages/LoginPage";
import { AppRouter } from "./routes/App.router";
import { AppTheme } from "./theme/AppTheme";

export const RequestEmployeeApp = () => {
  return (
    <AppTheme>
      <AuthProvider>
        <AppRouter />
        <Debugger />
      </AuthProvider>
    </AppTheme>
  );
};
