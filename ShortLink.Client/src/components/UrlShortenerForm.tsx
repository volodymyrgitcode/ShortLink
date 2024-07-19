import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UrlValidationSchema } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";


type UrlFormValues = z.infer<typeof UrlValidationSchema>;

interface UrlShortenerFormProps {
    onSubmit: (url: string) => Promise<void>;
}

export const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ onSubmit }) => {

    const { authUser } = useAuth();
    const navigate = useNavigate();

    const form = useForm<UrlFormValues>({
        resolver: zodResolver(UrlValidationSchema),
        defaultValues: { url: '' },
    });

    const handleSubmit = async (values: UrlFormValues) => {
        if (!authUser) {
            navigate('/login');
        } else {
            await onSubmit(values.url);
            form.reset();
        }
    };

    return (
        <Card className="mb-8 mt-10">
            <CardHeader>
                <CardTitle>URL Shortener</CardTitle>
                <CardDescription>Enter a long URL and get a shortened version instantly!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="https://www.example.com" {...field} />
                                    </FormControl>
                                    <FormMessage className='pt-1' />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Shorten</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};