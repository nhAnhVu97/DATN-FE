import React from 'react';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/Article/ArticlePage';
import AddArticlePage from './pages/Article/AddArticlePage';
import CategoryPage from './pages/Category/CategoryPage';
import EditArticlePage from './pages/Article/EditArticlePage';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import EditCategoryPage from './pages/Category/EditCategoryPage';
import TypeNewsPage from './pages/TypeNews/TypeNewsPage';
import EditTypeNewPage from './pages/TypeNews/EditTypeNewPage';
import AddTypeNewPage from './pages/TypeNews/AddTypeNewPage';
// import ImagePage from './pages/Images/ImagePage';
import QuestionPage from './pages/Question/QuestionPage';
import AddQuestion from './pages/Question/AddQuestion';
import EditQuestion from './pages/Question/EditQuestion';
import AddGroup from './pages/GroupAnswer/AddGroup';
import GroupAnswerPage from './pages/GroupAnswer/GroupAnswerPage';
import EditGroup from './pages/GroupAnswer/EditGroup';
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
        main: ({ history }) => <AddArticlePage history={history} />
    },
    {
        path: '/articles/edit/:id',
        exact: false,
        main: ({ history, match }) => <EditArticlePage history={history} match={match} />
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
    // {
    //     path: '/images',
    //     exact: true,
    //     main: () => <ImagePage />
    // },
    {
        path: '/question',
        exact: true,
        main: () => <QuestionPage />
    },
    {
        path: '/question/add',
        exact: true,
        main: ({history}) => <AddQuestion history={history} />
    },
    {
        path: '/question/edit/:id',
        exact: true,
        main: ({ history, match }) => <EditQuestion history={history} match={match} />
    },
    {
        path: '/group/add',
        exact: false,
        main: ({ history }) => <AddGroup history={history} />
    },
    {
        path: '/group',
        exact: true,
        main: () => <GroupAnswerPage />
    },
    {
        path: '/group/edit/:id',
        exact: true,
        main: ({ history, match }) => <EditGroup history={history} match={match} />
    }

];
export default routes;