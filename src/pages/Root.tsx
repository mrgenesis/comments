import LoaderStorage from "../storage/loader";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Home';
import Comments from './Comments';


export default function Root() {
  return (
    <LoaderStorage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="comments/:clientId" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </LoaderStorage>
  );
}



