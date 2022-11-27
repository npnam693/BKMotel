import DefaultLayout from "../layouts/DefaultLayout";

import {
  HomePage,
  ProfilePage,
  DetailPage,
  FavouritePage,
  LoginPage,
  SignUpPage,
  UploadPage,
  ResultPage,
  MyUploadPage,
} from "../pages";

const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignUpPage },
  { path: "/detail/:id", component: DetailPage, layout: DefaultLayout },
  { path: "/search/:id", component: ResultPage, layout: DefaultLayout },
];

const privateRoutes = [
  { path: "/favourite", component: FavouritePage, layout: DefaultLayout },
  { path: "/profile", component: ProfilePage, layout: DefaultLayout },
  { path: "/review", component: ProfilePage, layout: DefaultLayout },
  { path: "/upload", component: UploadPage, layout: DefaultLayout },
  { path: "/myupload", component: MyUploadPage, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
