import React from 'react';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AddArticlePage from './pages/AddArticlePage';
import CategoryPage from './pages/Category/CategoryPage';
// import EditArticlePage from './pages/EditArticlePage';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import EditCategoryPage from './pages/Category/EditCategoryPage';
import TypeNewsPage from './pages/TypeNews/TypeNewsPage';
import EditTypeNewPage from './pages/TypeNews/EditTypeNewPage';
import AddTypeNewPage from './pages/TypeNews/AddTypeNewPage';
import ImagePage from './pages/Images/ImagePage';
import QuestionPage from './pages/Question/QuestionPage';
import AddQuestion from './pages/Question/AddQuestion';
const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/articles',
        exact: true,
        main: () => <ArticlePage />
    },
    {
        path: '/articles/add',
        exact: false,
        main: () => <AddArticlePage />
    },
    {
        path: '/categories',
        exact: true,
        main: () => <CategoryPage />
    },
    {
        path: '/categories/edit/:id',
        exact: true,
        main: ({ match, history }) => <EditCategoryPage match={match} history={history} />
    },
    {
        path: '/categories/add',
        exact: true,
        main: ({ history }) => <AddCategoryPage history={history} />
    },
    {
        path: '/typenews',
        exact: true,
        main: () => <TypeNewsPage />
    },
    {
        path: '/typenews/edit/:id',
        exact: true,
        main: ({ history, match }) => <EditTypeNewPage history={history} match={match} />
    },
    {
        path: '/typenews/add',
        exact: true,
        main: ({ history }) => <AddTypeNewPage history={history} />
    },
    {
        path: '/images',
        exact: true,
        main: () => <ImagePage />
    },
    {
        path: '/question',
        exact: true,
        main: () => <QuestionPage />
    },
    {
        path: '/question/add',
        exact: true,
        main: () => <AddQuestion />
    }
];
export default routes;