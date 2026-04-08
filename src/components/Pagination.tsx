import RightSvg from "../assets/right.svg"
import LeftSvg from "../assets/left.svg"
import { Button } from "./Button";

type Props = {
    current: number,
    total: number,
    onNext: () => void,
    onPrevious: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props) {
    return (
        <div className="flex flex-1 justify-center items-center gap-2">
            <Button
                variant="iconSmall"
                disabled={current === 1}
                onClick={onPrevious}>
                <img
                    src={LeftSvg}
                    alt="icone de voltar uma página"
                />
            </Button>

            <span className="text-sm text-gray-200">
                {current}/{total}
            </span>

            <Button
                variant="iconSmall"
                disabled={current === total}
                onClick={onNext}>
                <img
                    src={RightSvg}
                    alt="icone de avançar uma página"
                />
            </Button>
        </div>
    )
}