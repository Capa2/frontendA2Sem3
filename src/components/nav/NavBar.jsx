
import NavItem from "./NavItem";
import PrivateNavItem from "./PrivateNavItem";
import NavLoginItem from "./NavLoginItem";

export default function NavBar({ loggedIn, user }) {

    return (
        <ul className="navBar">
            <NavItem to="/" text="Home" />
            <NavItem to="/wikipedia" text="Wikipedia" />
            <NavItem to="/dadjokes" text="Dad jokes" />
            <PrivateNavItem to="/funstuff" text="Fun stuff!" allowedRole="any" user={user} />
            <PrivateNavItem to="/user" text="User page" allowedRole="user" user={user} />
            <PrivateNavItem to="admin" text="Admin page" allowedRole="admin" user={user} />
            <NavItem to="/about" text="About" />
            <NavItem to="/bookpage" text="Book Page" />
            <NavLoginItem user={user} loggedIn={loggedIn} />
        </ul>
    );
}
