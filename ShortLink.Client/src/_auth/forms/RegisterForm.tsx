import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterValidationSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"

function RegisterForm() {
    const navigate = useNavigate();

    const { handleRegister, isAuthenticated } = useAuth();

    const form = useForm<z.infer<typeof RegisterValidationSchema>>({
        resolver: zodResolver(RegisterValidationSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [[isAuthenticated, navigate]]);

    async function onSubmit(values: z.infer<typeof RegisterValidationSchema>) {

        await handleRegister(values);
    }

    return (
        <>
            <Form {...form}>
                <div className="sm:w-[420px] flex-col">
                    <h2 className="mb-5 md:font-bold text-2xl text-center">
                        Register
                    </h2>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                "Register"
                            )}
                        </Button>

                        <p className="text-sm  text-center mt-5">
                            Already registered?
                            <Link to={"/login"} className="ml-1 text-purple-500">Log in</Link>
                        </p>
                    </form>
                </div>
            </Form>
        </>
    )
}

export default RegisterForm