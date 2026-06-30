export interface LoginRequest {
  loginID: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    userId: number; // API তে userId আছে
    loginID: string;
    fullName: string; // fullName আছে
  };
}