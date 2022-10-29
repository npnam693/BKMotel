import DefaultLayout from "../layouts/DefaultLayout";

import {HomePage, ProfilePage, DetailPage, FavouritePage, LoginPage, SignupPage} from '../pages'

const publicRoutes = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/profile/:id', component: ProfilePage, layout: DefaultLayout },
    { path: '/detail/:id', component: DetailPage, layout: DefaultLayout },
    { path: '/favourite/:id', component: FavouritePage, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };