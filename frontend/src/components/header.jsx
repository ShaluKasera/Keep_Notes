import { Link } from "react-router-dom";
import Style from './header.module.css'
function Header() {
  return (
    <header className="p-3 text-bg-light">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/createNotes" className="nav-link px-2 text-dark">
                Create notes
              </Link>
            </li>
            <li>
              <Link to="/ShowNotes" className="nav-link px-2 text-dark">
                Show notes
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="nav-link px-2 text-dark">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 text-dark">
                About
              </Link>
            </li>
          </ul>
          <div className="text-end">
            <Link to="/login" className={`${Style.login} btn`}>
              Login
            </Link>
            <Link to="/Signup" className={`${Style.signup} btn`}>
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
