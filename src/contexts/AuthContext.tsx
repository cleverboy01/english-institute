/* cSpell:disable */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  phone?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id'> & { password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const sessionUser = sessionStorage.getItem('currentUser');
    const rememberUser = localStorage.getItem('rememberedUser');
    
    if (sessionUser) {
      setUser(JSON.parse(sessionUser) as User);
    } else if (rememberUser) {
      const userData = JSON.parse(rememberUser) as User;
      setUser(userData);
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
    }
  }, []);

  const register = (userData: Omit<User, 'id'> & { password: string }) => {
    const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find((u: StoredUser) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar,
      phone: userData.phone,
    };

    const storedUser: StoredUser = {
      ...newUser,
      password: userData.password, // In real app, this would be hashed
    };

    users.push(storedUser);

    localStorage.setItem('users', JSON.stringify(users));
    
    // Initialize user-specific data
    localStorage.setItem(`cart_${newUser.id}`, JSON.stringify([]));
    localStorage.setItem(`wishlist_${newUser.id}`, JSON.stringify([]));
    localStorage.setItem(`enrollments_${newUser.id}`, JSON.stringify([]));
    
    return true;
  };

  const login = (email: string, password: string) => {
    const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
        phone: foundUser.phone,
      };

      setUser(userData);
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
