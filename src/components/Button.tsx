type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean;
};
export function Button({ children, isLoading, type = "button", ...rest }: Props) {
    return (
        <button type={type} disabled={isLoading} {...rest} className="w-full h-12 rounded-lg bg-green-100 text-sm text-white font-medium hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 cursor-pointer">
            {children}
        </button>
    );
}   