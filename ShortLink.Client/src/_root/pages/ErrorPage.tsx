import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {location.state?.errorMessage || 'An unexpected error occurred.'}
                    </AlertDescription>
                </Alert>
                <div className="text-center">
                    <Button variant={"default"} onClick={() => navigate('/')}>
                        Homepage
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;