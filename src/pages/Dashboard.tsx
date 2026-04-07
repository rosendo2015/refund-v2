import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import SearchSvg from "../assets/search.svg"
import { RefundItem } from "../components/RefundItem";
import { CATEGORIES } from "../utils/categories";

const REFUND_EXAMPLE = {
    id: "123",
    name: "Rosendo",
    category: "Transporte",
    amount: "152.25",
    categoryImg: CATEGORIES["transport"].icon
}

export function Dashboard() {
    const [name, setName] = useState("")
    function fetchRefunds(e: React.FormEvent) {
        e.preventDefault()
        console.log(name)
    }
    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

            <form action="" onSubmit={fetchRefunds} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6">
                <Input placeholder="Pesquisar pelo nome"
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" variant="icon">
                    <img src={SearchSvg} alt="icon search" className="w-5 h-5" />
                </Button>
            </form>
            <div className="mt-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
                <RefundItem data={REFUND_EXAMPLE} />
                <RefundItem data={REFUND_EXAMPLE} />
                <RefundItem data={REFUND_EXAMPLE} />

            </div>
        </div>
    )
}