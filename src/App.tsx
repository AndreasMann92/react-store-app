import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authentication } from "./components/auth/auth.component";
import { Home } from "./routes/home/home.component";
import { Navigation } from "./routes/navigation/navigation.component";
import { Shop } from "./routes/shop/shop.component";

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
