import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoaderStorage from "../storage/loader";

export default function Root() {
  return (
    <LoaderStorage>
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
    </LoaderStorage>
  );
}



