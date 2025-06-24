import { Link } from "react-router-dom";
 import { IoHome } from "react-icons/io5";

export default function Breadcrumb({name}) {


  return (
    <nav className="my-3 " aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-700">
        <li>
          <Link to="/" className="text-blue-600 hover:underline font-semibold flex items-center justify-center gap-2">
          
<IoHome /> Home
          </Link>
        </li>
        <li>
          <span className="text-gray-400">/</span>
        </li>
        <li>
          <span className="font-medium text-gray-400">{name}</span>
        </li>
      </ol>
    </nav>
  );
}
