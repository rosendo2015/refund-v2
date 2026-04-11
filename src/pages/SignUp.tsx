import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AxiosError } from "axios";
import { api } from "../services/api"
import { z, ZodError } from "zod"
import { useNavigate } from "react-router";


const signUpSchema = z.object({
    name: z.string().trim().min(6, { message: "O nome deve conter pelo menos 6 caracteres" }),
    email: z.string().email({ message: "e-mail inválido" }),
    password: z.string().min(6, { message: "A senha deve conter pelo menos 6 digitos" }),
    passwordConfirm: z.string({ message: "Confirme a senha" })
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Confirmação de senha não confere.",
    path: ["passwordConfirm"]
})

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setIsLoading(true)
            const data = signUpSchema.parse({
                name, email, password, passwordConfirm
            })
            await api.post("/users", data)
            if (confirm("Cadastro realizado com sucesso.")) {
                navigate("/")
            }

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }
            alert("Não foi possível cadastrar.")
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <Input
                legend="Nome"
                type="text"

                placeholder="Seu nome completo"
                required onChange={(e) => setName(e.target.value)} />

            <Input
                legend="Email"
                type="email"

                placeholder="seu@ email.com"
                required onChange={(e) => setEmail(e.target.value)} />

            <Input
                legend="Password"
                type="password"

                required
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)} />

            <Input
                legend="Confirme a senha"
                type="password" required
                placeholder="******"
                onChange={(e) => setPasswordConfirm(e.target.value)} />

            <Button type="submit" isLoading={isLoading}>
                Cadastrar
            </Button>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
    );
}