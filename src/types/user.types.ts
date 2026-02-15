
 //User role types in the freelance platform
 
export type UserRole = 'client' | 'freelancer' | 'admin';


  //User profile information
 
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  rating?: number;
  totalJobs?: number;
  totalEarnings?: number;
  createdAt: string;
  updatedAt: string;
}


  //Authentication state for the application
 
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


  //User registration data
 
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}


 //User login credentials
 
export interface LoginCredentials {
  email: string;
  password: string;
}

