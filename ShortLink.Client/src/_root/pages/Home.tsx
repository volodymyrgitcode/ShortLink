import { useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUrlShortener } from '@/hooks/useUrlShortener';
import { API_BASE_URL } from '@/config/config';
import { UrlShortenerForm } from '@/components/UrlShortenerForm';
import { UrlList } from '@/components/UrlList';

const Home: React.FC = () => {
    const { urls, error, shortenUrl, deleteUrl, fetchUrls } = useUrlShortener();

    useEffect(() => {
        fetchUrls();
    }, [fetchUrls]);

    const copyToClipboard = (shortUrl: string) => {
        navigator.clipboard.writeText(shortUrl);
        // Show a toast notification here
    };

    const getFullShortUrl = (shortUrlCode: string) => {
        return `${API_BASE_URL}/${shortUrlCode}`;
    };

    return (
        <div className="container mx-auto p-4 xl:max-w-5xl max-w-4xl">
            <UrlShortenerForm onSubmit={shortenUrl} />
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {urls.length > 0 && (
                <UrlList
                    urls={urls}
                    onDelete={deleteUrl}
                    onCopy={copyToClipboard}
                    getFullShortUrl={getFullShortUrl}
                />
            )}
        </div>
    );
};

export default Home;