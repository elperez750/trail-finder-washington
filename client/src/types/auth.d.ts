export interface User {
    id: string;
    name: string
    email: string;
}


export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}