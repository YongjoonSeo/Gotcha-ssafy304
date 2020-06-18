import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import cookies from 'vue-cookies'
import scrollMonitor from 'scrollmonitor'
import router from '@/router'
import SERVER from '@/api/drf'

Vue.use(Vuex)

const moduleMovies = {
  namespaced: true,
  state: {
    moviesDefault: null,
    moviesByWeather: null,
    moviesByBestgenre: null,
    selectedMovie: null,
    viewportState: null,
    reducedNumMoviesDefault: null,
    reducedNumMoviesByWeather: null,
    reducedNumMoviesByBestgenre: null,
    weatherListRoute: null,
    listRoute: null,
    searchedMovies: null,
  },
  getters: {
    movie(state) {
      return state.selectedMovie
    },
    movieDirectors(state) {
      const restructuredString = state.selectedMovie.director.split("|").join(", ");
      return restructuredString.slice(0, restructuredString.length - 2);
    },
    movieActors(state) {
      const restructuredString = state.selectedMovie.actor.split("|").join(", ");
      return restructuredString.slice(0, restructuredString.length - 2);
    }
  },
  mutations: {
    SET_MOVIES_DEFAULT(state, movies) {
      state.moviesDefault = movies
    },
    SET_MOVIES_BY_WEATHER(state, movies) {
      state.moviesByWeather = movies
    },
    SET_MOVIES_BY_BESTGENRE(state, movies) {
      state.moviesByBestgenre = movies
    },
    SET_MOVIE(state, movie) {
      state.selectedMovie = movie
    },
    SET_VIEWPORT_STATE(state, viewportWidth) {
      if (viewportWidth < 600) { 
        state.viewportState = 'xs'
      } else if (viewportWidth < 960) {
        state.viewportState = 'sm'
      } else if (viewportWidth < 1264) {
        state.viewportState = 'md'
      } else if (viewportWidth < 1904) {
        state.viewportState = 'lg'
      } else {
        state.viewportState = 'xl'
      }
    },
    SET_REDUCED_NUM_MOVIES(state) {
      if (state.moviesDefault) {
        if (state.viewportState === 'xs') {
          state.reducedNumMoviesDefault = state.moviesDefault.slice(0, 2)
        } else if (state.viewportState === 'sm') {
          state.reducedNumMoviesDefault = state.moviesDefault.slice(0, 4)
        } else if (state.viewportState === 'md') { 
          state.reducedNumMoviesDefault = state.moviesDefault.slice(0, 6)
        } else if (state.viewportState === 'lg') {
          state.reducedNumMoviesDefault = state.moviesDefault.slice(0, 8)
        } else {
          state.reducedNumMoviesDefault = state.moviesDefault
        }
      } else {
        state.reducedNumMoviesDefault = null
      }
      if (state.moviesByWeather) {
        if (state.viewportState === 'xs') {
          state.reducedNumMoviesByWeather = state.moviesByWeather.slice(0, 2)
        } else if (state.viewportState === 'sm') {
          state.reducedNumMoviesByWeather = state.moviesByWeather.slice(0, 4)
        } else if (state.viewportState === 'md') { 
          state.reducedNumMoviesByWeather = state.moviesByWeather.slice(0, 6)
        } else if (state.viewportState === 'lg') {
          state.reducedNumMoviesByWeather = state.moviesByWeather.slice(0, 8)
        } else {
          state.reducedNumMoviesByWeather = state.moviesByWeather
        }
      } else {
        state.reducedNumMoviesByWeather = null
      }
      if (state.moviesByBestgenre) {
        if (state.viewportState === 'xs') {
          state.reducedNumMoviesByBestgenre = state.moviesByBestgenre.slice(0, 2)
        } else if (state.viewportState === 'sm') {
          state.reducedNumMoviesByBestgenre = state.moviesByBestgenre.slice(0, 4)
        } else if (state.viewportState === 'md') { 
          state.reducedNumMoviesByBestgenre = state.moviesByBestgenre.slice(0, 6)
        } else if (state.viewportState === 'lg') {
          state.reducedNumMoviesByBestgenre = state.moviesByBestgenre.slice(0, 8)
        } else {
          state.reducedNumMoviesByBestgenre = state.moviesByBestgenre
        }
      } else {
        state.reducedNumMoviesByBestgenre = null
      }
    },
    SET_WEATHER_LIST_ROUTE(state, response) {
      state.weatherListRoute = {
        commitName: 'SET_MOVIES_BY_WEATHER',
        prev: response.previous,
        next: response.next
      }
    },
    SET_LIST_ROUTE(state, response) {
      state.listRoute = {
        commitName: 'SET_MOVIES_DEFAULT',
        prev: response.previous,
        next: response.next
      }
    },
    SET_SEARCHED_MOVIES(state, movies) {
      state.searchedMovies = movies
    }
  },
  actions: {
    fetchMovies({ commit }, info) {
      axios.get(info.route)
      // {
      //   params: {
      //     page: 1
      //   }
      // }
        .then(res => {
          if (info.commitName === 'SET_MOVIES_BY_BESTGENRE') {
            commit(info.commitName, res.data)
          } else {
            if (info.commitName === 'SET_MOVIES_BY_WEATHER') {
              commit('SET_WEATHER_LIST_ROUTE', res.data)
            } else {
              commit('SET_LIST_ROUTE', res.data)
            }
            commit(info.commitName, res.data.results)
          }
          window.scroll(window.scrollX, window.scrollY+1)
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.scroll(window.scrollX, window.scrollY-1)
          }
        })
        .catch(err => console.error(err))
    },
    fetchMovie({ commit }, id) {
      axios.get(SERVER.URL + SERVER.ROUTES.movies.default + String(id) + '/')
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => console.error(err))
    },
    setData({ commit, state }, viewportWidth) {
      commit('SET_VIEWPORT_STATE', viewportWidth)
      commit('SET_REDUCED_NUM_MOVIES', state.viewportState)
    },
    fetchList({ state, dispatch }, elementId) {
      const info = {
        route: null,
        commitName: null,
      }
      if (!state.moviesByBestgenre && elementId === 'list-by-bestgenre') {
        info.route = SERVER.URL + SERVER.ROUTES.movies.listByBestgenre
        info.commitName = 'SET_MOVIES_BY_BESTGENRE'
        dispatch('fetchMovies', info)
      } else if (!state.moviesByWeather && elementId === 'list-by-weather') {
        info.route = SERVER.URL + SERVER.ROUTES.movies.listByWeather
        info.commitName = 'SET_MOVIES_BY_WEATHER'
        dispatch('fetchMovies', info)
      } else if (!state.moviesDefault && elementId === 'list-default') {
        info.route = SERVER.URL + SERVER.ROUTES.movies.default
        info.commitName = 'SET_MOVIES_DEFAULT'
        dispatch('fetchMovies', info)
      }
    },
    fetchScrollTriggeredMovies({ dispatch }, elementId) {
      const element = document.querySelector(`#${elementId}`)
      const watcher = scrollMonitor.create(element)
      watcher.enterViewport(() => {
        dispatch('fetchList', elementId)
      })
    },
    fetchButtonTriggeredMovies({ dispatch }, inputData) {
      const info = {
        route: inputData.route,
        commitName: inputData.commitName
      }
      dispatch('fetchMovies', info)
    },
    ratingMovie({ rootGetters, dispatch }, data) {
      const path = SERVER.URL + SERVER.ROUTES.movies.rating + String(data.movieId) + '/'
      const config = rootGetters['accounts/config']
      axios.put(path, data, config)
        .then(() => {
          alert('평점이 등록되었습니다.')
          dispatch('fetchMovie', data.movieId)
        })
        .catch(err => console.error(err))
    },
    searchMovie({ rootGetters, commit }, query) {
      if (query !== '') {
        const config = {
          headers: rootGetters['accounts/config'].headers,
          params: {
            query: query
          }
        }
        axios.get(SERVER.URL + SERVER.ROUTES.movies.search, config)
          .then(res => {
            commit('SET_SEARCHED_MOVIES', null)
            commit('SET_SEARCHED_MOVIES', res.data)
          })
          .catch(err => console.error(err))
      }
    },
    likeMovie({ rootGetters, commit }, movieId) {
      const path = SERVER.URL + SERVER.ROUTES.movies.like + String(movieId) + '/'
      const config = rootGetters['accounts/config']
      axios.post(path, null, config)
        .then(res => {
          commit('SET_MOVIE', res.data)
        })
        .catch(err => console.error(err))
    }
  },
}

const moduleAccounts = {
  namespaced: true,
  state: {
    authToken: cookies.get('auth-token'),
    detailUser: null,
    authUser: cookies.get('auth-user'),
  },
  getters: {
    isLoggedIn(state) {
      return !!state.authToken
    },
    config(state) {
      return { headers: { Authorization: `Token ${state.authToken}` } }
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token
    },
    SET_DETAILUSER(state, user) {
      state.detailUser = user
    },
    SET_AUTHUSER(state, user) {
      state.authUser = user
    }
  },
  actions: {
    postAuthData({ commit, getters }, info) {
      axios.post(SERVER.URL + info.route, info.data)
        .then(res => {
          const token = res.data.key
          commit('SET_TOKEN', token)
          cookies.set('auth-token', token)
          if (info.data.password2) {
            alert('회원가입이 완료되었습니다.')
          }
          return axios.get(SERVER.URL + SERVER.ROUTES.accounts.mypage, getters.config)
        })
        .then((res) => {
          commit('SET_AUTHUSER', res.data)
          cookies.set('auth-user', res.data)
          router.push({ name: 'MovieView' })
        })
        .catch(err => {
          console.error(err.response)
          alert(err)
        })
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        route: SERVER.ROUTES.accounts.signup
      }
      dispatch('postAuthData', info)
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        route: SERVER.ROUTES.accounts.login
      }
      dispatch('postAuthData', info)
    },
    logout({ commit, getters }) {
      axios.post(SERVER.URL + SERVER.ROUTES.accounts.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_AUTHUSER', null)
          cookies.remove('auth-token')
          cookies.remove('auth-user')
          router.push({ name: 'MovieView' })
        })
        .catch(err => console.error(err))
    },
    changepassword({ getters }, changepasswordData) {
      axios.post(SERVER.URL + SERVER.ROUTES.accounts.changePassword, changepasswordData, getters.config)
        .then(() => {
          alert('비밀번호가 변경되었습니다.')
          router.push({ name: 'UserDetailView'})
        })
        .catch(err => console.error(err))
    },
    fetchUser({ commit, getters }, id) {
      let fetchUserRoute = null
      if (id) {
        fetchUserRoute = SERVER.URL + SERVER.ROUTES.accounts.detail + String(id) + '/'
      } else {
        fetchUserRoute = SERVER.URL + SERVER.ROUTES.accounts.mypage
      }
      axios.get(fetchUserRoute, getters.config)
        .then(res => {
          commit('SET_DETAILUSER', res.data)
        })
        .catch(err => console.error(err))
    },
    fetchDetailUser({ dispatch }, id) {
      dispatch('fetchUser', id)
    },
    fetchAuthUser({ dispatch }) {
      dispatch('fetchUser', null)
    },
    deleteUser({ commit, getters }) {
      const ans = confirm('정말 삭제하시겠습니까?\n한 번 삭제한 계정은 되돌릴 수 없습니다.')
      if (ans) {
        axios.delete(SERVER.URL + SERVER.ROUTES.accounts.deleteUser, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_AUTHUSER', null)
          cookies.remove('auth-token')
          cookies.remove('auth-user')
          alert('계정이 삭제되었습니다.')
          router.push({ name: 'MovieView'})
        })
      }
    },
    followUser({ getters }, id) {
      axios.post(SERVER.URL + String(id) + SERVER.ROUTES.accounts.followUser, null, getters.config)
        .then((res) => {
          console.log(res)
          router.push({ name: 'UserDetailView'})
        })
    },
  },
}

const moduleArticles = {
  namespaced: true,
  state: {
    articles: null,
    selectedArticle: null,
    nextLink: null,
    prevLink: null,
    totalPages: null,
    articleSelectedMovie: null,
  },
  getters: {
    article(state) {
      return state.selectedArticle
    }
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_ARTICLE(state, article) {
      state.selectedArticle = article
    },
    SET_LINKS(state, links) {
      state.prevLink = links.prev
      state.nextLink = links.next
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages
    },
    SET_ARTICLE_SELECTED_MOVIE(state, movie) {
      state.articleSelectedMovie = movie
    }
  },
  actions: {
    postForm({ rootGetters, commit }, info) {
      let notValid = false
      Object.keys(info.body.data).forEach(key => {
        const datus = info.body.data[key]
        if (key !== 'movieId') {
          if (datus === null || datus === '') {
            notValid = true
          }
        }
      })
      if (notValid) {
        alert('유효하지 않은 형식입니다.')
      } else {
        const form = new FormData()
        if (info.body.data.title) {
          form.append('title', info.body.data.title)
          if (info.body.data.movieId) {
            form.append('movieId', info.body.data.movieId)
          }
        }
        form.append('content', info.body.data.content)
        const config = rootGetters['accounts/config']
        if (info.action === 'create') {
          axios.post(SERVER.URL + info.body.route, form, config)
          .then(res => {
            if (info.body.data.title) {
              alert('게시글이 등록되었습니다.')
              router.push({ name: 'ArticleDetailView', params: { articleId: res.data.id} })
            } else {
              alert('댓글이 등록되었습니다.')
            }
            commit('SET_ARTICLE', res.data)
          })
          .catch(err => console.error(err))
        } else {
          axios.put(SERVER.URL + info.body.route, form, config)
          .then(res => {
            if (info.body.data.title) {
              alert('게시글이 수정되었습니다.')
              commit('SET_ARTICLE', res.data)
              router.push({ name: 'ArticleDetailView', params: { articleId: res.data.id} })
            } else {
              alert('댓글이 수정되었습니다.')
            }
          })
          .catch(err => console.error(err))
        }
      }
    },
    createArticle({ dispatch }, articleData) {
      const info = {
        action: 'create',
        body: {
          data: articleData,
          route: SERVER.ROUTES.articles.create
        }
      }
      dispatch('postForm', info)
    },
    createComment({ dispatch }, commentData) {
      const info = {
        action: 'create',
        body: {
          data: commentData,
          route: SERVER.ROUTES.articles.create + String(commentData.articleId) +'/'
        }
      }
      dispatch('postForm', info)
    },
    // update({ rootGetters, commit }, info, action) {
      // let notValid = false
      // Object.values(info.data).forEach(datus => {
      //   if (datus === null || datus === '') {
      //     notValid = true
      //   }
      // })
      // if (notValid) {
      //   alert('유효하지 않은 형식입니다.')
      // } else {
      //   const form = new FormData()
      //   if (info.data.title) {
      //     form.append('title', info.data.title)
      //   }
      //   form.append('content', info.data.content)
      //   const config = rootGetters['accounts/config']
      //   axios.put(SERVER.URL + info.route, form, config)
      //     .then(res => {
      //       if (info.data.title) {
      //         alert('게시글이 수정되었습니다.')
      //         commit('SET_ARTICLE', res.data)
      //         router.push({ name: 'ArticleDetailView', params: { articleId: res.data.id } })
      //       } else {
      //         alert('댓글이 수정되었습니다.')
      //       }
      //     })
      //     .catch(err => console.error(err))
      // }
    // },
    updateArticle({ dispatch }, data) {
      const info = {
        action: 'update',
        body: {
          data: data,
          route: SERVER.ROUTES.articles.update + String(data.articleId) + '/'
        }
      }
      dispatch('postForm', info)
    },
    updateComment({ dispatch }, data) {
      const info = {
        action: 'update',
        body: {
          data: data,
          route: SERVER.ROUTES.articles.update + `${String(data.articleId)}/${String(data.commentId)}/`
        }
      }
      dispatch('postForm', info)
      dispatch('fetchArticle', data.articleId)
    },
    deleteArticle({ rootGetters }, id) {
      const ans = confirm('정말 삭제하시겠습니까?')
      if (ans) {
        const path = SERVER.URL + SERVER.ROUTES.articles.delete + String(id) + '/'
        const config = rootGetters['accounts/config']
        axios.delete(path, config)
          .then(() => {
            alert('게시글이 삭제되었습니다.')
            router.push({ name: 'ArticleView'})
          })
          .catch(err => console.error(err))
      }
    },
    deleteComment({ rootGetters, commit }, idInfo) {
      const ans = confirm('정말 삭제하시겠습니까?')
      if (ans) {
        const path = SERVER.URL + SERVER.ROUTES.articles.delete + `${String(idInfo.article)}/${String(idInfo.comment)}/`
        const config = rootGetters['accounts/config']
        axios.delete(path, config)
          .then(res => {
            commit('SET_ARTICLE', res.data)
            alert('댓글이 삭제되었습니다.')
          })
          .catch(err => console.error(err))
      }
    },
    fetchArticles({ commit, state }, path=null) {
      let route = SERVER.URL + SERVER.ROUTES.articles.default
      if (path) {
        route = path
      }
      axios.get(route)
        .then(res => {
          commit('SET_ARTICLES', res.data.results)
          commit('SET_LINKS', { prev: res.data.previous, next: res.data.next })
          if (!state.totalPages) {
            commit('SET_TOTAL_PAGES', res.data.countpages)
          }
        })
        .catch(err => console.error(err))
    },
    fetchArticle({ commit, rootGetters }, id) {
      const route = SERVER.URL + SERVER.ROUTES.articles.default + id + '/'
      const config = rootGetters['accounts/config']
      axios.get(route, config)
        .then(res => {
          commit('SET_ARTICLE', res.data)
        })
        .catch(err => console.error(err))
    },
    fetchNextPrevPage({ dispatch }, path) {
      dispatch('fetchArticles', path)
    },
    fetchSpecificPage({ dispatch }, page) {
      if (page) {
        let path = SERVER.URL + SERVER.ROUTES.articles.default
        path += `?page=${page}`
        dispatch('fetchArticles', path)
      }
    }
  },
}

const moduleNavbar = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    moveToLink({ state }, routeObject) {
      state
      router.push(routeObject)
    },
  },
  modules: {
    drawer: {
      namespaced: true,
      state: {
        drawerListItems: [
          // needAuth: -1(로그인 되지 않은 상태), 0 (상관없음), 1 (로그인 된 상태)
          { id: 1, icon: null, title: '메인페이지', link: '', needAuth: 0 },
          { id: 2, icon: 'mdi-home', title: '영화목록', link: { name: 'MovieView' }, needAuth: 0 },
          { id: 3, icon: null, title: null, link: '', needAuth: 0 },
          { id: 4, icon: null, title: '커뮤니티', link: '', needAuth: 0 },
          { id: 5, icon: 'mdi-card-text', title: '게시판', link: { name: 'ArticleView' }, needAuth: 0 },
          { id: 6, icon: 'mdi-lead-pencil', title: '새 글 작성', link: { name: 'ArticleCreateView' }, needAuth: 1 },
          { id: 7, icon: null, title: null, link: '', needAuth: 1 },
          { id: 8, icon: null, title: '계정정보', link: '', needAuth: 1 },
          { id: 9, icon: 'mdi-account', title: '마이페이지', link: { name: 'MyPage' }, needAuth: 1 },
        ],
      },
      getters: {},
      mutations: {},
      actions: {
      },
    }
  }
}

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies: moduleMovies,
    accounts: moduleAccounts,
    articles: moduleArticles,
    navbar: moduleNavbar
  }
})