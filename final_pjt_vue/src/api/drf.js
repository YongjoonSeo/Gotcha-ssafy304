export default {
    URL: 'https://serene-garden-95240.herokuapp.com',
    ROUTES: {
        accounts: {
            login: '/rest-auth/login/',
            logout: '/rest-auth/logout/',
            signup: '/rest-auth/signup/',
            changePassword: '/rest-auth/password/change/',
            deleteUser: '/accounts/delete/',
            followUser: '/follow/',
            detail: '/accounts/',
            mypage: '/accounts/mypage/'
        },
        movies: {
            default: '/movies/',
            listByWeather: '/movies/recommend_by_weather/',
            listByBestgenre: '/movies/recommend_by_bestgenre/',
            rating: '/movies/rating/',
            search: '/movies/search/',
            like: '/movies/like/',
        },
        articles: {
            default: '/articles/',
            create: '/articles/create/',
            update: '/articles/update/',
            delete: '/articles/delete/',
        }
    },
}