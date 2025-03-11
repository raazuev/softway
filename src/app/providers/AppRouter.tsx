import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { appRoutes } from "./Routes";
import { Spinner } from "@/shared/ui/spinner/Spinner";

export const AppRouter = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};
