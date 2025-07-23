import { FileUser } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">Curriqulum.ai</p>
      </Link>
      <Link to="/upload" className="primary-button w-fit">
        <FileUser className="mr-2" />
        Uploader le CV
      </Link>
    </nav>
  )
}

export default Navbar