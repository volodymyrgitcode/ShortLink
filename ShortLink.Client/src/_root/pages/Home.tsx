import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, Trash2 } from 'lucide-react';

import { useUrlShortener } from '@/hooks/useUrlShortener';
import { API_BASE_URL } from '@/config/config';

import { useAuth } from "@/hooks/useAuth"


function Home() {

    const [url, setUrl] = useState<string>('');
    const { urls, isLoading, error, shortenUrl, deleteUrl, fetchUrls } = useUrlShortener();

    const { authUser } = useAuth();

    useEffect(() => {
        fetchUrls();
    }, [fetchUrls]);

    const handleShorten = async () => {
        await shortenUrl(url);
        setUrl('');
    };

    const copyToClipboard = (shortUrl: string) => {
        navigator.clipboard.writeText(shortUrl);
        // show a toast notification here
    };

    const getFullShortUrl = (shortUrlCode: string) => {
        return `${API_BASE_URL}/${shortUrlCode}`;
    };

    return (
        <>
            <div className="container mx-auto p-4 max-w-4xl">
                <Card className="mb-8 mt-10">
                    <CardHeader>
                        <CardTitle>URL Shortener</CardTitle>
                        <CardDescription>Enter a long URL and get a shortened version instantly!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Input
                                type="url"
                                placeholder="Enter your long URL here"
                                value={url}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={handleShorten}>Shorten</Button>
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {urls.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Shortened URLs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Original URL</TableHead>
                                        <TableHead>Shortened URL</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {urls.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium truncate max-w-xs">{item.originalUrl}</TableCell>
                                            <TableCell>{getFullShortUrl(item.shortUrlCode)}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(getFullShortUrl(item.shortUrlCode))}>
                                                                    <Copy className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Copy shortened URL</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="ghost" size="icon" onClick={() => window.open(getFullShortUrl(item.shortUrlCode), '_blank')}>
                                                                    <ExternalLink className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Open shortened URL</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    {authUser && item.userId === authUser.id && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" onClick={() => deleteUrl(item.id)} disabled={isLoading}>
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Delete URL</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    )
}

export default Home