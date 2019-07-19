import { postRequest, secureRequest, securePostRequest } from '../utils/requests';

export const login = (values) => postRequest('/sessions/create')(values);

export const createUser = (values) => postRequest('/users')(values);

export const getTransactionsList = () => secureRequest('/api/protected/transactions');

export const getUserInfoApi = () => secureRequest('/api/protected/user-info');

export const getUsersForTransactions = (filter) => securePostRequest('/api/protected/users/list')(filter);

export const makeTransaction = (values) => securePostRequest('/api/protected/transactions')(values)
