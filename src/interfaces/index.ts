export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextType {
  isAuthenticated: boolean;
}

export interface IInitialRegistration {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IGetUser extends IInitialRegistration {
  id: number;
}

export interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}
