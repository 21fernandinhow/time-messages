import CreateUser from "./CreateUser";
import Logo from "./Logo";

export default function Header () {
    return(
        <header className="navbar sticky top-0 bg-base-100 z-10">
            <div className="flex-1">
                <a className="p-2 text-xl" href="#">
                    <Logo width={40} height={40} />
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><CreateUser/></li>
                </ul>
            </div>
        </header>
    )
}