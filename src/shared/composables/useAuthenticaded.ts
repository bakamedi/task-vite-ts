
export const useAuthenticaded = () => {
  const token = localStorage.getItem('token');
  return {
    isAuthenticated: token !== null,
  };
}

export const authenticadedService = useAuthenticaded();
