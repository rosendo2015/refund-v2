import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useEffect, useState } from "react";
import { Upload } from "../components/Upload";
import { useNavigate, useParams } from "react-router";
import fileSvg from "../assets/file.svg"
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
    name: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome deve ter no máximo 100 caracteres"),
    category: z.string().min(1, { message: "Categoria inválida" }),
    amount: z.coerce
        .number({ message: "O valor deve ser maior que zero" })
        .positive({ message: "O valor deve ser maior que zero" }),
})

export function Refund() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileURL, setFileURL] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (params.id) {
            return navigate(-1)
        }
        try {
            setIsLoading(true)
            setErrors({});

            if (!file) {
                return alert("Por favor, envie o comprovante da despesa para solicitar o reembolso")
            }
            const fileUploadForm = new FormData()
            fileUploadForm.append("file", file)

            const uploadResponse = await api.post("/uploads", fileUploadForm, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })



            const data = refundSchema.parse({
                name,
                category,
                amount: Number(amount.replace(",", ".")),
            })


            await api.post("/refunds", {
                ...data,
                filename: uploadResponse.data.filename,
            })

            navigate("/confirm", { state: { fromSubmit: true } })

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {

                        formattedErrors[issue.path[0] as string] = issue.message;
                    }
                });
                setErrors(formattedErrors)
                return

            }
            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }
            return { message: "Ocorreu um erro inesperado" }
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchRefund(id: string) {
        try {
            const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)
            setName(data.name)
            setCategory(data.category)
            setAmount(formatCurrency(data.amount || 0))
            setFileURL(data.filename)

        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }
            return { message: "Ocorreu um erro inesperado" }
        }
    }
    useEffect(() => {
        if (params.id) {
            fetchRefund(params.id)
        }
    }, [params.id])

    return (
        <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
            <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
            <p className="text-sm text-gray-200 mt-2 mb-4">
                Dados da desesa para solicitar o reembolso
            </p>


            <Input
                required
                legend="Nome da solicitação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!params.id}
            />

            {errors.name && <p className="text-sm text-red-600 text-center my-0 font-medium"> {errors.name} </p>}


            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={!!params.id}
                >
                    {
                        CATEGORIES_KEYS.map((category) => (
                            <option key={category} value={category}>
                                {CATEGORIES[category].name}
                            </option>
                        ))
                    }
                </Select>
                <Input
                    required
                    legend="Valor"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!!params.id}
                />
            </div>
            {errors.amount && <p className="text-sm text-red-600 text-center font-medium"> {errors.amount} </p>}
            {errors.category && <p className="text-sm text-red-600 text-center font-medium"> {errors.category} </p>}
            {
                (params.id && fileURL) ? (
                    <a href={`http://localhost:3333/uploads/${fileURL}`}
                        target="_blank"
                        className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
                    >
                        <img src={fileSvg} alt="icon arquivo" />
                        Abrir comprovante
                    </a>
                ) : (
                    <Upload
                        filename={file && file.name}
                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        disabled={!!params.id}
                    />
                )}


            <Button type="submit" isLoading={isLoading}>
                {params.id ? "Voltar" : "Enviar"}
            </Button>
        </form>
    )
}
