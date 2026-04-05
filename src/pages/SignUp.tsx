import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e: React.FormEvent) {

        e.preventDefault();
        alert(nome + " " + email + " " + password + " " + confirmPassword);
    }
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
            <Input legend="Nome" type="text" placeholder="Seu nome completo" required onChange={(e) => setNome(e.target.value)} />

            <Input legend="Email" type="email" placeholder="seu@ email.com" required onChange={(e) => setEmail(e.target.value)} />

            <Input legend="Password" type="password" required placeholder="******" onChange={(e) => setPassword(e.target.value)} />

            <Input legend="Confirme a senha" type="password" required placeholder="******" onChange={(e) => setConfirmPassword(e.target.value)} />

            <Button type="submit" isLoading={isLoading}>
                Cadastrar
            </Button>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
    );
}