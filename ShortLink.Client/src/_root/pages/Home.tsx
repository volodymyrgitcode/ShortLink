import { useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUrlShortener } from '@/hooks/useUrlShortener';
import { API_BASE_URL } from '@/config/config';
import { UrlShortenerForm } from '@/components/UrlShortenerForm';
import { UrlList } from '@/components/UrlList';
import { useToast } from '@/components/ui/use-toast';

const Home: React.FC = () => {
    const { urls, error, isLoading, shortenUrl, deleteUrl, fetchUrls } = useUrlShortener();
    const { toast } = useToast();

    useEffect(() => {
        fetchUrls();
    }, [fetchUrls]);

    const copyToClipboard = (shortUrl: string) => {
        navigator.clipboard.writeText(shortUrl);
        toast({
            title: 'Copied to clipboard.',
            description: `${shortUrl}`,
        });
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

            {isLoading && (
                <>
                    LOADING...
                </>
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