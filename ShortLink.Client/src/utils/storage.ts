export const storage = {
    getToken: (): string | null => localStorage.getItem('_auth'),
    setToken: (token: string): void => localStorage.setItem('_auth', token),
    removeToken: (): void => localStorage.removeItem('_auth'),
};