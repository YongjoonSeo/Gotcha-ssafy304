# SSAFY 3기 종합 프로젝트 - 영화 추천 사이트

## - DRF API server documentations





- ### HOST: https://serene-garden-95240.herokuapp.com





### 1. 계정 정보

#### 1. API 기본 정보

|  NUM  | PATH                        | METHOD                                      | 기능            | 비고                   |
| --- | --------------------------- | ------------------------------------------- | --------------- | ---------------------- |
| **1** | /rest-auth/signup/          | <font style="color: orange">**POST**</font> | 회원가입        | signupData 必          |
| **2** | /rest-auth/login/           | <font style="color: orange">**POST**</font> | 로그인          | loginData 必           |
| **3** | /rest-auth/logout/          | <font style="color: orange">**POST**</font> | 로그아웃        | token 必               |
| **4** | /accounts/mypage/           | <font style="color: green">**GET**</font>   | 마이페이지      | token 必               |
| **5** | /rest-auth/password/change/ | <font style="color: orange">**POST**</font> | 비밀번호 변경   | token 必 changeData 必 |
| **6** | /accounts/delete/           | <font style="color: red">**DELETE**</font>  | 계정 삭제       | token 必               |
| **7** | /accounts/:user_id/         | <font style="color: green">**GET**</font>   | 유저 상세페이지 | token 必 user_id: integer |
| **8** | /accounts/:user_id/follow/  | <font style="color: orange">**POST**</font> | 유저 팔로우     | token 必 user_id: integer |



#### 2. 요청 변수

##### 1. Headers

- token
  - `Authorization: 'Token {key value}'`

##### 2. Data (body)

1. signupData

   | 요청 변수명 | 타입   | 필수 여부 | 기본값 | 설명                                                         |
   | ----------- | ------ | --------- | ------ | ------------------------------------------------------------ |
   | username    | String | Y         | -      | 사용할 아이디를 기입한다.                                    |
   | password1   | String | Y         | -      | 사용할 비밀번호를 기입한다.                                  |
   | password2   | String | Y         | -      | 사용할 비밀번호를 다시 한 번 기입한다. <br />password1과 내용이 같아야 한다. |

2. loginData

   | 요청 변수명 | 타입   | 필수 여부 | 기본값 | 설명                                 |
   | ----------- | ------ | --------- | ------ | ------------------------------------ |
   | username    | String | Y         | -      | 로그인할 계정의 아이디를 기입한다.   |
   | password    | String | Y         | -      | 로그인할 계정의 비밀번호를 기입한다. |

3. changeData

   | 요청 변수명   | 타입   | 필수 여부 | 기본값 | 설명                                                         |
   | ------------- | ------ | --------- | ------ | ------------------------------------------------------------ |
   | new_password1 | String | Y         | -      | 계정의 새로운 비밀번호를 기입한다.                           |
   | new_password2 | String | Y         | -      | 사용할 비밀번호를 다시 한 번 기입한다.<br />new_password1과 내용이 같아야 한다. |
   | old_password  | String | Y         | -      | 기존에 사용하고 있던 비밀번호를 기입한다.                    |



#### 3. 응답

1. 회원가입, 로그인

   | 필드 | 타입   | 설명                                                |
   | ---- | ------ | --------------------------------------------------- |
   | key  | String | 회원가입 한 계정을 로그인하고, 토큰 키 값을 받는다. |

2. 로그아웃, 비밀번호 변경

   | 필드   | 타입   | 설명                         |
   | ------ | ------ | ---------------------------- |
   | detail | String | 결과에 대한 메시지를 받는다. |

3. 마이페이지, 유저 상세 페이지

   | 필드             | 타입    | 설명                                             |
   | ---------------- | ------- | ------------------------------------------------ |
   | id               | Integer | 데이터베이스에 기록된 유저의 기본 키값을 받는다. |
   | password         | String  | 유저의 비밀번호를 암호화 한 해시값을 받는다.     |
   | last_login       | String  | 유저가 마지막으로 로그인 한 시점을 받는다.       |
   | is_superuser     | Boolean | 유저가 관리자 계정인지 여부를 받는다.            |
   | username         | String  | 유저의 ID를 받는다.                              |
   | first_name       | String  | 유저의 이름을 받는다.                            |
   | last_name        | String  | 유저의 성을 받는다.                              |
   | email            | String  | 유저의 이메일을 받는다.                          |
   | is_staff         | Boolean | 유저가 스태프인지 여부를 받는다.                 |
   | is_active        | Boolean | 유저가 활성화된 유저인지 여부를 받는다.          |
   | date_joined      | String  | 유저가 가입한 시점을 받는다.                     |
   | groups           | Array   | 유저가 속한 그룹의 배열을 받는다.                |
   | user_permissions | Array   | 유저에게 허가된 권한 범위를 배열로 받는다.       |
   | followers        | Array   | 유저를 팔로우하는 유저들을 배열로 받는다.        |
   | nickname         | String  | 유저의 닉네임을 받는다.                          |


4. 계정 삭제, 유저 팔로우
   - 성공시 200 OK 응답을 받는다.









### 2. 영화 정보

#### 1. API 기본 정보

|  NUM  | PATH                            | METHOD                                      | 기능                  | 비고                       |
| :---: | ------------------------------- | ------------------------------------------- | --------------------- | -------------------------- |
| **1** | /movies/                        | <font style="color: green">**GET**</font>   | 평점순 영화 목록      | page                       |
| **2** | /movies/recommend_by_weather/   | <font style="color: green">**GET**</font>   | 날씨별 영화 목록      | page                       |
| **3** | /movies/recommend_by_bestgenre/ | <font style="color: green">**GET**</font>   | 베스트 장르 영화 목록 |                            |
| **4** | /movies/like/:movie_id/         | <font style="color: orange">**POST**</font> | 영화 좋아요 기능      | token 必 movie_id: integer |
| **5** | /movies/rating/:movie_id/       | <font style="color: blue">**PUT**</font>    | 영화 평점 매기기      | token 必 movie_id: integer |
| **6** | /movies/search/                 | <font style="color: green">**GET**</font>   | 영화 검색             | token 必 query             |
| **7** | /movies/:movie_id/              | <font style="color: green">**GET**</font>   | 영화 상세페이지       | movie_id: integer          |

1. 평점순 영화 목록: 평점이 높은 순으로 영화들을 받는다.
2. 날씨별 영화 목록: 네이버 날씨정보를 바탕으로 현재 날씨와 어울리는 영화들을 받는다.
3. 베스트 장르 영화 목록: 유저가 좋아요 한 영화를 기반으로 가장 선호할 장르의 영화들을 받는다.
4. 영화 좋아요 기능: 유저가 원하는 영화를 좋아요 할 수 있다.
5. 영화 평점 매기기: 유저가 지정한 영화의 평점을 매길 수 있다.
6. 영화 검색: 유저가 원하는 검색어로 영화를 찾아 그 검색어를 제목에 포함하는 영화 5개를 받는다.
7. 영화 상세페이지: 특정한 영화의 세부정보를 받는다.



#### 2. 요청 변수

##### 1. Headers

- token
  - `Authorization: 'Token {key value}'`

##### 2. Params

1. page

   | 필수 여부 | 타입    | 기본값 | 설명                                                   |
   | --------- | ------- | ------ | ------------------------------------------------------ |
   | N         | Integer | 1      | 페이지 번호를 입력하여 원하는 페이지를 불러올 수 있다. |

2. query

   | 필수 여부 | 타입   | 기본값 | 설명                                                        |
   | --------- | ------ | ------ | ----------------------------------------------------------- |
   | Y         | String | blank  | 값으로 넘긴 검색어가 제목에 포함된 영화들을 불러올 수 있다. |



#### 3. 응답

1. 영화 상세페이지, 영화 좋아요 기능, 영화 평점 매기기

   | 필드                | 타입    | 설명                                         |
   | ------------------- | ------- | -------------------------------------------- |
   | id                  | Integer | 영화의 기본 키값을 받는다.                   |
   | like_users          | Array   | 해당 영화를 좋아하는 유저들의 목록을 받는다. |
   | title               | String  | 영화의 제목을 받는다.                        |
   | description         | String  | 영화의 설명 내용을 받는다.                   |
   | link                | String  | 영화의 네이버 영화 페이지 url을 받는다.      |
   | thumbnail_url       | String  | 영화의 썸네일 이미지 url을 받는다.           |
   | poster_url          | String  | 영화 포스터 이미지 url을 받는다.             |
   | subtitle            | String  | 영화의 영문 제목을 받는다.                   |
   | pub_date            | String  | 영화의 개봉년도를 받는다.                    |
   | director            | String  | 영화의 감독 정보를 받는다.                   |
   | actor               | String  | 영화의 출연진 정보를 받는다.                 |
   | fetched_user_rating | Float   | 영화의 네이버 평점 정보를 받는다.            |
   | user_rating         | Float   | 영화의 Gotcha play 평점 정보를 받는다.       |
   | genre               | String  | 영화의 장르를 받는다.                        |
   | rating_users        | Array   | 영화에 평점을 매긴 유저들의 목록을 받는다.   |

2. 평점순 영화 목록, 날씨별 영화 목록

   | 필드     | 타입    | 설명                                                         |
   | -------- | ------- | ------------------------------------------------------------ |
   | count    | Integer | 전체 영화의 개수를 받는다.                                   |
   | next     | String  | 다음 페이지에 해당하는 url을 받는다. 다음 페이지가 없으면 null을 받는다. |
   | last     | String  | 마지막 페이지에 해당하는 url을 받는다.                       |
   | previous | String  | 이전 페이지에 해당하는 url을 받는다. 이전 페이지가 없으면 null을 받는다. |
   | first    | String  | 첫 페이지에 해당하는 url을 받는다.                           |
   | results  | Array   | 해당 페이지의 영화들을 받는다. 각 영화는 영화 상세페이지 정보와 같은 구조로 구성된다. |

3. 베스트 장르 영화 목록, 영화 검색

   - 영화들의 목록을 받는다. 각 영화는 영화 상세페이지 정보와 같은 구조로 구성된다.









### 3. 게시글 정보

#### 1. API 기본 정보

|  NUM  | PATH                                      | METHOD                                                       | 기능              | 비고                    |
| :---: | ----------------------------------------- | ------------------------------------------------------------ | ----------------- | ----------------------- |
| **1** | /articles/                                | <font style="color: green">**GET**</font>                    | 게시글 목록       |                         |
| **2** | /articles/create/                         | <font style="color: orange">**POST**</font>                  | 게시글 생성       | token 必 articleData 必 |
| **3** | /articles/update/:article_id/             | <font style="color: blue">**PUT**</font>, <font style="color: green">**GET**</font> | 게시글 수정       | token 必 articleData 必 |
| **4** | /articles/:article_id/                    | <font style="color: green">**GET**</font>                    | 게시글 상세페이지 | token 必                |
| **5** | /articles/delete/:article_id/             | <font style="color: red">**DELETE**</font>                   | 게시글 삭제       | token 必                |
| **6** | /articles/create/:article_id/             | <font style="color: orange">**POST**</font>                  | 댓글 생성         | token 必commentData 必  |
| **7** | /articles/update/:article_id/:comment_id/ | <font style="color: blue">**PUT**</font>, <font style="color: green">**GET**</font> | 댓글 수정         | token 必commentData 必  |
| **8** | /articles/delete/:article_id/:comment_id/ | <font style="color: red">**DELETE**</font>                   | 댓글 삭제         | token 必                |



#### 2. 요청 변수

##### 1. Headers

- token
  - `Authorization: 'Token {key value}'`

##### 2. Data (body)

1. articleData

   | 요청 변수명 | 타입   | 필수 여부 | 기본값 | 설명                      |
   | ----------- | ------ | --------- | ------ | ------------------------- |
   | title       | String | Y         | -      | 게시글의 제목을 기입한다. |
   | content     | String | Y         | -      | 게시글의 내용을 기입한다. |

2. commentData

   | 요청 변수명 | 타입   | 필수 여부 | 기본값 | 설명                    |
   | ----------- | ------ | --------- | ------ | ----------------------- |
   | content     | String | Y         | -      | 댓글의 내용을 기입한다. |



#### 3. 응답

1. 게시글 상세페이지, 게시글 생성, 댓글 생성, 댓글 삭제

   | 필드       | 타입    | 설명                                                         |
   | ---------- | ------- | ------------------------------------------------------------ |
   | id         | Integer | 게시글의 기본 키값을 받는다.                                 |
   | user       | Object  | 게시글을 쓴 작성자의 정보를 유저 상세페이지와 같은 구조로 받는다. |
   | comments   | Array   | 게시글에 달린 댓글 목록을 받는다.                            |
   | movie      | Object  | 게시글이 가리키는 영화 정보를 영화 상세페이지와 같은 구조로 받는다. 영화를 지정하지 않았다면 null을 받는다. |
   | title      | String  | 게시글의 제목을 받는다.                                      |
   | content    | String  | 게시글의 내용을 받는다.                                      |
   | created_at | String  | 게시글의 작성 시간을 받는다.                                 |
   | updated_at | String  | 게시글의 수정 시간을 받는다.  |

   - 댓글 응답 구조

     | 필드       | 타입    | 설명                                                         |
     | ---------- | ------- | ------------------------------------------------------------ |
     | id         | Integer | 댓글의 기본 키값을 받는다.                                   |
     | content    | String  | 댓글의 내용을 받는다.                                        |
     | created_at | String  | 댓글이 작성된 시간을 받는다.                                 |
     | updated_at | String  | 댓글이 수정된 시간을 받는다.                                 |
     | user       | Object  | 댓글을 쓴 작성자의 정보를 유저 상세페이지와 같은 구조로 받는다. |
   
2. 게시글 목록

   | 필드       | 타입    | 설명                                                         |
   | ---------- | ------- | ------------------------------------------------------------ |
   | count      | Integer | 총 게시글의 수를 받는다.                                     |
   | countpages | Integer | 총 게시글 페이지의 수를 받는다.                              |
   | next       | String  | 다음 페이지에 해당하는 url을 받는다. 다음 페이지가 없으면 null을 받는다. |
   | last       | String  | 마지막 페이지에 해당하는 url을 받는다.                       |
   | previous   | String  | 이전 페이지에 해당하는 url을 받는다. 이전 페이지가 없으면 null을 받는다. |
   | first      | String  | 마지막 페이지에 해당하는 url을 받는다.                       |
   | results    | Array   | 해당 페이지의 게시글들을 받는다. 각 게시글은 게시글 상세페이지 정보와 같은 구조로 구성된다. |

3. 게시글 수정

   - 게시글 상세페이지 정보 중 comments만 제외하고 받는다.

4. 댓글 수정

   | 필드       | 타입    | 설명                                                         |
   | ---------- | ------- | ------------------------------------------------------------ |
   | id         | Integer | 댓글의 기본 키값을 받는다.                                   |
   | user       | Object  | 댓글을 쓴 작성자의 정보를 유저 상세페이지와 같은 구조로 받는다. |
   | article    | Object  | 댓글이 달린 게시글의 정보를 게시글 수정 응답과 같은 구조로 받는다. |
   | content    | String  | 댓글의 내용을 받는다.                                        |
   | created_at | String  | 댓글이 작성된 시간을 받는다.                                 |
   | updated_at | String  | 댓글이 수정된 시간을 받는다.                                 |

5. 게시글 삭제

   - 성공시 200 OK 응답을 받는다.