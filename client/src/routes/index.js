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
  MyReviewPage,
  EditReview,
 
} from "../pages";

const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignUpPage },
  { path: "/detail/:id", component: DetailPage, layout: DefaultLayout },
  { path: "/search", component: ResultPage, layout: DefaultLayout },
];

const privateRoutes = [
  { path: "/favourite", component: FavouritePage, layout: DefaultLayout },
  { path: "/profile", component: ProfilePage, layout: DefaultLayout },
  { path: '/review', component: MyReviewPage, layout: DefaultLayout },
  { path: "/upload", component: UploadPage, layout: DefaultLayout },
  { path: "/myupload", component: MyUploadPage, layout: DefaultLayout },
  { path: '/EditReview', component: EditReview, layout: DefaultLayout },
 
];

export { publicRoutes, privateRoutes };
