import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { ManagerRoutes } from "./manager-routes";
import { EmployeeRoutes } from "./employee-routes";
import { Loading } from "../components/Loadding";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
    const { session, isLoading } = useAuth()

    function Route() {
        switch (session?.user.role) {
            case "employee":
                return <EmployeeRoutes />
                break;
            case "manager":
                return <ManagerRoutes />
                break;
            default:
                return <AuthRoutes />
                break;
        }
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    );
}