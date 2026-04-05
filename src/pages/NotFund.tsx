export function NotFound() {
    return (
        <div className="w-screen h-screen bg-gray-400 flex justify-center flex-col items-center text-gray-100">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg text-gray-600">The page you are looking for does not exist.😢</p>
            <p className="text-sm text-gray-600">(A página que você está procurando não existe.)</p>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Voltar</a>
        </div>
    );
}