import { NavLink } from "react-router-dom";

export default function PrivateNavItem({ to, text, allowedRole, user }) {
    function isActive({ isActive }) {
        return isActive ? "activeNavItem" : "";
    }

    function isAllowed() {
        return user && (user.roles.includes(allowedRole) || allowedRole === "any");
    }

    return (
        isAllowed() && <li>
            <NavLink
                className={isActive}
                to={to} end>{text}</NavLink>
        </li>
    );
}