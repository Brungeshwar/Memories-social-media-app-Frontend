import Form from "../components/Form";
import Posts from "../components/Posts";

import { useLocation } from "react-router-dom";
export const Home = () => {
  //const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const searchTags = query.get("tags");
  //console.log(page);
  //console.log(searchQuery);
  return (
    <div>
      <div className="flex flex-row ml-6 pt-8">
        <Posts
          searchQuery={searchQuery}
          page={page}
          searchtagQuery={searchTags}
        />
        <Form />
      </div>
    </div>
  );
};
