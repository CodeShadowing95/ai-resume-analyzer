import { FileUser, LogOut } from "lucide-react"
import { Link } from "react-router"
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">Curriqulum.ai</p>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
          <FileUser className="mr-2" />
          Uploader CV
        </Link>

        {auth.isAuthenticated && (
          <button className="p-2 text-white rounded-full bg-gradient-to-r from-red-300 to-purple-300 hover:from-red-400 hover:to-purple-400 transition-all duration-300 shadow-lg" onClick={auth.signOut}>
            <LogOut />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar