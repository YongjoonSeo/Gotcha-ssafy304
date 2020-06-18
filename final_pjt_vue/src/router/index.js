import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import SignupView from '@/views/accounts/SignupView.vue'
import LoginView from '@/views/accounts/LoginView.vue'
import LogoutView from '@/views/accounts/LogoutView.vue'
import MyPageView from '@/views/accounts/MyPageView.vue'
import UserDetailView from '@/views/accounts/UserDetailView.vue'
import ChangePasswordView from '@/views/accounts/ChangePasswordView.vue'

import ArticleView from '@/views/articles/ArticleView.vue'
import ArticleDetailView from '@/views/articles/ArticleDetailView.vue'
import ArticleCreateView from '@/views/articles/ArticleCreateView.vue'
import ArticleUpdateView from '@/views/articles/ArticleUpdateView.vue'
import ArticleDeleteView from '@/views/articles/ArticleDeleteView.vue'

import MovieView from '@/views/movies/MovieView.vue'
import MovieDetailView from '@/views/movies/MovieDetailView.vue'

import NotFound from '@/views/NotFound.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: {
      title: 'GOTCHA 회원가입'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: '로그인'
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPageView,
    meta: {
      title: '마이페이지'
    }
  },
  {
    path: '/accounts/:userId',
    name: 'UserDetailView',
    component: UserDetailView,
  },
  {
    path: '/accounts/changepassword',
    name: 'ChangePasswordView',
    component: ChangePasswordView
  },
  // accounts
  {
    path: '/articles/',
    redirect: '/articles/list'
  },
  {
    path: '/articles/list',
    name: 'ArticleView',
    component: ArticleView,
    meta: {
      title: 'GOTCHA 게시글 목록'
    }
  },
  {
    path: '/articles/create',
    name: 'ArticleCreateView',
    component: ArticleCreateView,
    meta: {
      title: 'GOTCHA 새 글 작성'
    }
  },
  {
    path: '/articles/:articleId',
    name: 'ArticleDetailView',
    component: ArticleDetailView,
  },
  {
    path: '/articles/:articleId/update',
    name: 'ArticleUpdateView',
    component: ArticleUpdateView
  },
  {
    path: '/articles/:articleId/delete',
    name: 'ArticleDeleteView',
    component: ArticleDeleteView
  },
  // articles
  {
    path: '/movies',
    name: 'MovieView',
    component: MovieView,
    meta: {
      title: 'GOTCHA PLAY 메인'
    }
  },
  {
    path: '/movies/:movieId',
    name: 'MovieDetailView',
    component: MovieDetailView,
  },
  // movies
  {
    path: '/',
    redirect: '/movies'
  },
  {
    path: '*',
    component: NotFound
  },
  // basic setting
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name === to.name && to.name === 'MovieDetailView') {
    const fetchMovie = store._actions['movies/fetchMovie'][0]
    fetchMovie(to.params.movieId)
    next()
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }
  const publicPages = [
    'Signup', 'Login', 'ArticleView', 'MovieView', 'MovieDetailView',
  ]
  const needNotAuthPages = ['Signup', 'Login']
  
  const authRequired = !publicPages.includes(to.name)
  const unauthRequired = needNotAuthPages.includes(to.name)
  const isLoggedIn = !!window.$cookies.isKey('auth-token')

  if (unauthRequired && isLoggedIn) {
    next('/')
  }
  authRequired && !isLoggedIn ? next({ name: 'Login' }) : next()
})

// router.afterEach((to, from) => {
//   console.log('to: ', to)
//   console.log('from: ', from)
//   console.log(store)
//   console.log(store._actions)
// })

export default router
