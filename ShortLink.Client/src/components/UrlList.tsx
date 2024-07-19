import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { ShortenedUrl, useUrlShortener } from '@/hooks/useUrlShortener';
import { useAuth } from "@/hooks/useAuth"


interface UrlListProps {
    urls: ShortenedUrl[];
    onDelete: (id: string) => void;
    onCopy: (shortUrl: string) => void;
    getFullShortUrl: (shortUrlCode: string) => string;
}

export const UrlList: React.FC<UrlListProps> = ({ urls, onDelete, onCopy, getFullShortUrl }) => {

    const { authUser } = useAuth();
    const { isLoading } = useUrlShortener();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Shortened URLs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Original URL</TableHead>
                            <TableHead>Short URL</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {urls.map((url) => (
                            <TableRow key={url.id}>
                                <TableCell className="font-medium">{url.originalUrl}</TableCell>
                                <TableCell>{getFullShortUrl(url.shortUrlCode)}</TableCell>
                                <TableCell>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => onCopy(getFullShortUrl(url.shortUrlCode))}>
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
                                                <Button variant="ghost" size="icon" onClick={() => window.open(getFullShortUrl(url.shortUrlCode), '_blank')}>
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Open shortened URL</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {authUser && url.userId === authUser.id && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => onDelete(url.id)} disabled={isLoading}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Delete URL</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    );
};