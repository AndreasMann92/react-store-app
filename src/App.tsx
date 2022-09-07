import "./App.scss";
import { Home } from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./routes/navigation/navigation.component";
import { Authentication } from "./components/auth/auth.component";

const Shop = () => {
  return <h1>Hi I am the shop!</h1>;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="authentication" element={<Authentication />} />
      </Route>
    </Routes>
  );
};
