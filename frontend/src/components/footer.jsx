import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
          <Link to="/" className="nav-link px-2 text-dark">
                Home
              </Link>
          </li>
          <li className="nav-item">
          <Link to="/createNotes" className="nav-link px-2 text-dark">
               Create notes
              </Link>
          </li>
          <li className="nav-item">
          <Link to="/ShowNotes" className="nav-link px-2 text-dark">
          Show notes
              </Link>
          </li>
          <li className="nav-item">
          <Link to="/faqs" className="nav-link px-2 text-dark">
                FAQs
              </Link>
          </li>
          <li className="nav-item">
          <Link to="/about" className="nav-link px-2 text-dark">
                About
              </Link>
          </li>
        </ul>
        <p className="text-center text-body-secondary">© Made by Shalu</p>
      </footer>
    </div>
  );
};

export default footer;
