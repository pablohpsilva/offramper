import { getUserProfile } from "@/lib/api";
import { UserProfile } from "@/types";
import { useAccount } from "wagmi";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userProfile: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        try {
          const profile = await getUserProfile(address);

          if (profile) {
            setUserProfile(profile);
          } else {
            // Create a new profile if first time user
            const newProfile: UserProfile = {
              address,
              completedTransactions: 0,
              rating: 0,
              joinedAt: new Date(),
            };
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [address, isConnected]);

  const value = {
    isAuthenticated: isConnected && !!userProfile,
    isLoading,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
