# SSAFY 3기 종합 프로젝트 - 영화 추천 사이트

## - DRF API server documentations



- ### HOST: https://serene-garden-95240.herokuapp.com



### 1. 계정 정보

#### 1. API 기본 정보

|  NUM  | PATH                        | METHOD                                      | 기능            | 비고                   |
| :---: | --------------------------- | ------------------------------------------- | --------------- | ---------------------- |
<<<<<<< HEAD
| **1** | /rest-auth/signup/          | POST{: .gitlab-orange}                      | 회원가입        | signupData 必          |
| **2** | /rest-auth/login/           | **POST**{: style="color: orange"}           | 로그인          | loginData 必           |
=======
| **1** | /rest-auth/signup/          | POST {: .gitlab-orange}                     | 회원가입        | signupData 必          |
| **2** | /rest-auth/login/           | <font style="color: orange">**POST**</font> | 로그인          | loginData 必           |
>>>>>>> 689b25847854a7c1a9c50b910de60d189675fb18
| **3** | /rest-auth/logout/          | <font style="color: orange">**POST**</font> | 로그아웃        | token 必               |
| **4** | /accounts/mypage/           | <font style="color: green">**GET**</font>   | 마이페이지      | token 必               |
| **5** | /rest-auth/password/change/ | <font style="color: orange">**POST**</font> | 비밀번호 변경   | token 必 changeData 必 |
| **6** | /accounts/delete/           | <font style="color: red">**DELETE**</font>  | 계정 삭제       | token 必               |
| **7** | /accounts/:user_id/         | <font style="color: green">**GET**</font>   | 유저 상세페이지 | user_id: integer       |
| **8** | /accounts/:user_id/follow/  | <font style="color: orange">**POST**</font> | 유저 팔로우     | user_id: integer       |



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

2. 로그아웃

   | 필드   | 타입   | 설명                                  |
   | ------ | ------ | ------------------------------------- |
   | detail | String | 로그아웃 결과에 대한 메시지를 받는다. |

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

4. 비밀번호 변경

5. 계정 삭제

6. 유저 팔로우



### 2. 영화 정보

#### 1. API 기본 정보

#### 2. 요청 변수

#### 3. 응답





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













<font style="color: green">**GET**</font> 

<font style="color: orange">**POST**</font>

<font style="color: blue">**PUT**</font>

<font style="color: red">**DELETE**</font>