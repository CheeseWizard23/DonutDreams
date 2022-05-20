import { Link } from "react-router-dom";
import "./PageNotFound.css"

const PageNotFound = () => {
  return (
    <div>
        <h1 className="text title">Error 404: Page Not Found</h1>
        <div className="link">
            <Link className="text" to="/">Go Back to Menu</Link>
        </div>
    </div>
  )
}

export default PageNotFound