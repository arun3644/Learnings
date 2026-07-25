Here is a complete authentication flow from Login → Token Storage → API Calls → Token Expiry Handling → Redirect.


	                USER
                          |
                          |
                    Enter Email/Password
                          |
                          ↓
                    Login Page (React)
                          |
                          |
              POST /api/auth/login
              {
                 email,
                 password
              }
                          |
                          ↓
                    BACKEND SERVER
                          |
              -------------------------
              |                       |
        Validate User            Invalid User
              |                       |
              ↓                       ↓
      Generate JWT Token          Return 401
      {
        accessToken,
        refreshToken(optional),
        expiresIn: 1 hour
      }
              |
              ↓
        Response 200 OK
              |
              |
              ↓
                    FRONTEND
              ----------------
              |
              |
       Store accessToken
              |
              ↓
       localStorage
       {
          token: "eyJhbGci..."
       }
              |
              |
       Update Redux State
       {
          isAuthenticated: true,
          user: {...}
       }
              |
              ↓
       Navigate("/dashboard")
              |
              ↓
       Dashboard Page


After Login: Every API Request Flow


              USER ACTION
                  |
                  |
          Click Profile / Orders
                  |
                  ↓
            React Component
                  |
                  |
          API Request (Axios)
                  |
                  ↓
        Get Token from Storage

        localStorage
             |
             ↓
        "accessToken"

                  |
                  ↓

        Add Authorization Header

        GET /api/profile

        Headers:
        {
          Authorization:
          "Bearer accessToken"
        }

                  |
                  ↓

              BACKEND
                  |
                  |
          Verify JWT Token
                  |
        ---------------------
        |                   |
     Valid Token        Invalid Token
        |                   |
        ↓                   ↓

   Process Request        Return 401
        |                   |
        ↓                   |
   Response 200            |
   User Data               |
        |                   |
        ↓                   ↓

    Show Data        Axios Interceptor
                         |
                         ↓
                 Remove Token
                 from localStorage
                         |
                         ↓
                 Clear Redux Auth State
                         |
                         ↓
                 Redirect User
                         |
                         ↓
                    /login




Where does ProtectedRoute fit?

                User opens:
                /dashboard

                     |
                     ↓

              ProtectedRoute

                     |
          -----------------------
          |                     |
    isAuthenticated=true   false
          |                     |
          ↓                     ↓

       <Outlet />        Navigate("/login")


          |
          ↓

      Dashboard Page



Complete Real-World Flow

LOGIN
 |
 |
 ↓
Backend verifies credentials
 |
 |
 ↓
Generate JWT
 |
 |
 ↓
Frontend stores token
 |
 |
 ↓
Redux: isAuthenticated = true
 |
 |
 ↓
Navigate → /dashboard
 |
 |
 |
 +-----------------------------+
 |                             |
 | User uses application       |
 |                             |
 ↓                             |
API Request                    |
 |                             |
 ↓                             |
Backend verifies JWT           |
 |                             |
 +-------------+---------------+
               |
        Token Valid?
               |
       +-------+-------+
       |               |
      YES             NO
       |               |
       ↓               ↓
Return Data       Return 401
                       |
                       ↓
              Axios Interceptor
                       |
                       ↓
              Remove Token
                       |
                       ↓
              Redux Logout
                       |
                       ↓
              Navigate("/login")
Redirect pages:
Login failed → Stay on /login and show error message
Token missing → Redirect to /login
Token expired (401) → Redirect to /login
User manually opens /dashboard without login → Redirect to /login
Successful login → Redirect to /dashboard





















                +----------------------+
                |      Login Page      |
                +----------+-----------+
                           |
                    Login API
                           |
                           v
              +------------------------+
              | Backend validates user |
              +-----------+------------+
                          |
          Returns:
          - JWT Token
          - User Info
          - Role (Admin/Patient/Doctor)
                          |
                          v
               Store in LocalStorage
                  or HttpOnly Cookie
                          |
                          v
               +---------------------+
               | Frontend App Starts |
               +----------+----------+
                          |
                  Check Token Exists?
                     /            \
                  No               Yes
                  |                 |
             Login Page      Validate Token
                               (optional API
                               or JWT expiry)
                               /          \
                           Invalid       Valid
                              |             |
                          Login Page    Load User
                                            |
                                            v
                                   Check User Role
                                            |
                  +-------------------------+-------------------------+
                  |                         |                         |
               Admin                    Patient                  Doctor
                  |                         |                         |
          Show All Screens         Show Limited Screens      Show Doctor Screens


1. Authentication (Token Validation)

Authentication means "Is the user logged in?"


User Login
    |
    v
Receive JWT Token
    |
Store Token
    |
Every Route Change
    |
Check Token
    |
+-------------------+
| Token Exists ?    |
+---------+---------+
          |
     No -> Login

          |
         Yes
          |
Check Expiry
          |
+-------------------+
| Expired ?         |
+---------+---------+
          |
    Yes -> Logout

          |
         No
          |
Allow Access