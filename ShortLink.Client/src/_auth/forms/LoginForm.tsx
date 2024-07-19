import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginValidationSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"


function LoginForm() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const { handleLogin, error, isAuthenticated, authUser } = useAuth();

    const form = useForm<z.infer<typeof LoginValidationSchema>>({
        resolver: zodResolver(LoginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof LoginValidationSchema>) {

        await handleLogin(values);

        if (isAuthenticated) {
            navigate('/');
            toast({
                title: 'Login successful',
                description: `Welcome back, ${authUser?.userName}!`,
            });
        }

        if (error) {
            toast({
                title: 'Login unsuccessful',
                description: `Something went wrong`,
                variant: "destructive"
            });
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-[420px] flex-col">
                <h2 className="mb-5 md:font-bold text-2xl text-center">
                    Log in
                </h2>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        {false ? (
                            <div>
                                Loading...
                            </div>
                        ) : (
                            "Log in"
                        )}
                    </Button>

                    <p className="text-sm text-center mt-5">
                        Don't have account?
                        <Link to={"/register"} className="ml-1 text-purple-500">Register</Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default LoginForm