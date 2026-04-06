import LogoSvg from "../assets/logo.svg";
import LogoutSvg from "../assets/logout.svg";
export function Header() {
    return (
        <header className="w-full flex items-center justify-between">
            <img src={LogoSvg} alt="Logo" className="my-8" />
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-200">Olá,</span>
                <p className="text-sm text-gray-200">Rosendo</p>
                <img src={LogoutSvg} alt="Logout" className="my-8 cursor-pointer hover:opacity-75 transition ease-linear" />
            </div>
        </header>
    )
}