import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AxiosError } from "axios";
import { z, ZodError } from "zod"
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
    email: z.string().email({ message: "e-mail inválido" }),
    password: z.string().trim().min(6, { message: "A senha deve ter pelo menos 6 digitos" })
})



export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null)

    const auth = useAuth()

    async function signIn(_: any, formData: FormData) {
        try {
            const data = signInScheme.parse({
                email: formData.get("email"),
                password: formData.get("password")
            })

            const response = await api.post("/sessions", data)
            auth.save(response.data)
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                return { message: error.issues[0].message }
            }
            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }
            return { message: "Não foi possível acessar." }
        }


    }

    return (
        <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
            <Input
                name="email"
                legend="Email"
                type="email"
                placeholder="seu@ email.com"
                required

            />

            <Input
                name="password"
                legend="Password"
                type="password"
                placeholder="******"
                required

            />

            <p className="text-sm text-red-600 text-center my-4 font-medium">
                {state?.message}
            </p>


            <Button type="submit" isLoading={isLoading}>
                Entrar
            </Button>
            <a href="/register" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
        </form>
    );
}