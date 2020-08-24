import React, {
  createContext,
  useCallback,
  FC,
  useContext,
  useState,
} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  zipCode: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  latitude: string;
  longitude: string;
  phone: string;
}

interface AuthContextState {
  isAuthenticated: boolean;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

interface User {
  id: string;
  name: string;
}

interface DecodedUser {
  [key: string]: string;
  _id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');

    if (token) {
      // @ts-ignore
      const decodedUser: DecodedUser | null = decode(token);

      if (!decodedUser) {
        return {} as AuthState;
      }

      const user: User = {
        id: String(decodedUser._id),
        name: decodedUser.name,
      };

      api.defaults.headers.authorization = token;

      return { token, user };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('@GoBarber:token', token);

    // @ts-ignore
    const decodedUser: DecodedUser = decode(token);

    const user: User = {
      id: String(decodedUser._id),
      name: decodedUser.name,
    };

    api.defaults.headers.authorization = token;

    setData({ token, user });
  }, []);

  const signUp = useCallback(
    async ({
      email,
      password,
      city,
      latitude,
      longitude,
      name,
      neighborhood,
      number,
      phone,
      street,
      zipCode,
      complement,
    }: SignUpCredentials) => {
      const response = await api.post('user', {
        email,
        password,
        city,
        latitude: Number(latitude),
        longitude: Number(longitude),
        name,
        neighborhood,
        number: Number(number),
        phone: phone.replace(/[^\d]/g, ''),
        street,
        zip_code: zipCode.replace(/[^\d]/g, ''),
        complement,
      });

      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso!');
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');

    api.defaults.headers.authorization = '';

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        user: data.user,
        isAuthenticated: !!data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
