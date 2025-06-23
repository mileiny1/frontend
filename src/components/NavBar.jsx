import { Link } from "react-router-dom"


function NavBar() {
  return (
    //bootraps style
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> 
        <div className="container-fluid">
            <Link className="navbar-brand"to="/">Traditional Dominican Dessert</Link>
            <button className="navbar-toggler" 
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>

            <div className="collapse navbar-collapse" id="navbarNav" >
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/mission">Mission</Link>
                    </li>
                   <li className="nav-item">
                        <Link className="nav-link" to="/dessertorders">Dessert</Link>
                    </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/orders">My Orders</Link>
                    </li>

                        <li className="nav-item">
                        <Link className="nav-link" to="/register">SignUp</Link>
                    </li>


                   
                    <li className="nav-item">
                        <Link className="nav-link" to="/signin">Login</Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Log Out</Link>

                    </li>
     
                   




                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar