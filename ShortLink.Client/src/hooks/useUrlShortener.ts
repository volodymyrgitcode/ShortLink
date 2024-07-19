import { useState, useCallback } from 'react';
import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/config/config';


interface ShortenedUrl {
    id: string;
    userId: string;
    originalUrl: string;
    shortUrlCode: string;
}

interface UseUrlShortenerReturn {
    urls: ShortenedUrl[];
    isLoading: boolean;
    error: string | null;
    shortenUrl: (url: string) => Promise<void>;
    deleteUrl: (id: string) => Promise<void>;
    fetchUrls: () => Promise<void>;
}


export const useUrlShortener = (): UseUrlShortenerReturn => {
    const [urls, setUrls] = useState<ShortenedUrl[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUrls = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.get<ShortenedUrl[]>(API_ENDPOINTS.URLS.FETCH);
            setUrls(response.data);
        } catch (err) {
            setError('Failed to fetch URLs');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const shortenUrl = useCallback(async (url: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.post<ShortenedUrl>(API_ENDPOINTS.URLS.CREATE, { originalUrl: url });
            setUrls(prevUrls => [...prevUrls, response.data]);
        } catch (err) {
            setError('Failed to shorten URL');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteUrl = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiClient.delete(`${API_ENDPOINTS.URLS.DELETE}/${id}`);
            setUrls(prevUrls => prevUrls.filter(url => url.id !== id));
        } catch (err) {
            setError('Failed to delete URL');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { urls, isLoading, error, shortenUrl, deleteUrl, fetchUrls };
};