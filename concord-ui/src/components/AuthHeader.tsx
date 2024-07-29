import { Link } from "react-router-dom";

const AuthHeader = () => {
     return (
        <header className="absolute top-12 left-10 cursor-pointer">
            <Link to={'/'}>
            <img src={require("../assets/logo.png")} alt="logo" width={150} height={150} />
            </Link>
        </header>
     )
}

export default AuthHeader;