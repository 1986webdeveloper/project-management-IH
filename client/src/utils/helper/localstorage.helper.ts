import { TOKEN_KEY } from '@/config/keys.config';

export const setToken = (accessToken: string) => {
	localStorage.setItem(TOKEN_KEY, accessToken);
};

export const getToken = () => {
	const token = localStorage.getItem(TOKEN_KEY) ?? null;
	return token;
};

export const RemoveToken = () => {
	localStorage.clear();
};
