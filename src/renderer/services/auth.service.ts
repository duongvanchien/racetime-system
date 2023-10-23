import { ApiClient } from '../configs/api.config';
import { ISignInRequest } from '../interfaces/auth.interface';

export const signIn = async (payload: ISignInRequest) => {
  const response = await ApiClient.post(`/api/v1/auth/register`, payload);
  return response.data;
};
