import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  return useMutation({
    mutationFn: loginUser,
  });
};