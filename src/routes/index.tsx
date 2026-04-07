import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { ManagerRoutes } from "./manager-routes";
import { EmployeeRoutes } from "./employee-routes";

export function Routes() {
    return (
        <BrowserRouter>
            <ManagerRoutes />
        </BrowserRouter>
    );
}