import React, { createContext, useState, useEffect } from 'react'
import { AuthContextType, User } from '../types/auth'


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

    }, [])


    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        else{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

    }, [token, user])
    


    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user)
    }


    const logout = () => {
        setToken(null);
        setUser(null);
    }


    return(
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;

}



