// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getUsuarioMy } from "@/services/usuariosService";


interface User {
  token: string;
  name: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login:  (token: string) => Promise<User>;
  logout: () => void;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();





  useEffect(() => {
    const fetchData = async () => {
      // Verifica si hay un token en sessionStorage
      const token = sessionStorage.getItem("auth_token");
      if (token) {
        const data = await getUsuarioMy();
        setUser({
          token: token,
          name: data.result.name,
          username: data.result.userName,
          role: data.result.role,
        });
      }
      setLoading(false);
    };

    fetchData(); // Llamamos a la función asincrónica

  }, []);

  const login = async (token: string) => {
    sessionStorage.setItem("auth_token", token);
    const data = await getUsuarioMy();

    setUser({
        token: token,
        name: data.result.name,
        username: data.result.userName,
        role: data.result.role,
      });

      return {
        token: token,
        name: data.result.name,
        username: data.result.userName,
        role: data.result.role,
      };

  };

  const logout = () => {
    sessionStorage.removeItem("auth_token");
    setUser(null);
    router.push("/"); 

  };

  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar esto con un spinner o similar
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
