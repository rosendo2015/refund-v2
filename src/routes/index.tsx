import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { ManagerRoutes } from "./manager-routes";
import { EmployeeRoutes } from "./employee-routes";

import { Loading } from "../components/Loadding";
const isLoading = false

const session = {
    user: {
        role: "manager"
    }
}

export function Routes() {
    function Route() {
        switch (session.user.role) {
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