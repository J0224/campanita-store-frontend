import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  userFirstName: string | null;
  login: (firstName: string) => void;
  logout: () => void;
  lastActivity: number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// AuthProvider.tsx
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  useEffect(() => {
    const activityInterval = setInterval(() => {
      setLastActivity(Date.now());
    }, 30 * 1000 * 60);

    // Add an event listener to update lastActivity on user interaction
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    // Attach the event listener to the document
    document.addEventListener("mousemove", updateActivity);
    document.addEventListener("keydown", updateActivity);

    return () => {
      clearInterval(activityInterval);

      // Remove the event listener when the component unmounts
      document.removeEventListener("mousemove", updateActivity);
      document.removeEventListener("keydown", updateActivity);
    };
  }, []);

  const login = (firstName: string) => {
    setLoggedIn(true);
    setUserFirstName(firstName);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserFirstName(null);
  };

  const value: AuthContextValue = {
    isLoggedIn,
    userFirstName,
    login,
    logout,
    lastActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
