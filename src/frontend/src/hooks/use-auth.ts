import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export type AuthStatus = "initializing" | "anonymous" | "authenticated";

export interface UseAuthReturn {
  isAuthenticated: boolean;
  isInitializing: boolean;
  loginStatus: AuthStatus;
  principalId: string | undefined;
  login: () => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const { loginStatus, identity, login, clear } = useInternetIdentity();

  const isInitializing = loginStatus === "initializing";
  const isAuthenticated = loginStatus === "success";

  const principalId = isAuthenticated
    ? identity?.getPrincipal().toText()
    : undefined;

  const status: AuthStatus = isInitializing
    ? "initializing"
    : isAuthenticated
      ? "authenticated"
      : "anonymous";

  return {
    isAuthenticated,
    isInitializing,
    loginStatus: status,
    principalId,
    login,
    logout: clear,
  };
}
