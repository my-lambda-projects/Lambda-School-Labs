# house_cup

CS5 Capstone Project

Housecups is an app for tailoring and tracking the consolidated performance of various school houses.

It has following features.

1.  As an admin, you can activate your school on platform and add various Houses and Teachers to the platform
2.  As student users you have public access to current standing of various houses in the school
3.  As a Teacher, you can award performance points to various houses based on performance of students of a particular house.

# UserModel
* The user model contains following field. 
  1. username
  2. email
  3. passwordHash
  4. isAdmin - To determine if user has purchased the product and can add schools and teachers
  5. isTeacher - To provide user to increment or decrement the scores of school houses
  6. createdAt
  7. updatedAt 
  8. schoolId - Currently pending this will be foreign key from Schools model to determine the school affiliation of user.


# Auth Routes

POST`\signup`
Errors: This route goes through following middleware validations from top to bottom

1. Checks username length. Error `Your username must contain between 5 to 60 characters`
2. Checks password and confirm password. Error `Password and confirm password don't match`
3. Checks if password is strong enough.
Error `Your password must contain between 6 to 60 characters`
4. Checks if email is valid
Error `Please enter a valid email id`
5. Checks if username is unavailable
Error `Username Unavailable`.
6. Checks if email is already registered
Error `Email already registered`

The above errors pop up on top form for 4 seconds only.

Once the user signs in, he is taken directly to siginin page with autofilled username field.

POST`\signin`
A user can sign in with either username or email.

Additional Features
* If user is coming directly after signup. The signup success is shown on signin page
* If user has reset his password. He is shown reset password success on signin page.

Success: 
* The user is redirected to home/schools page(pending, currently user gets redirected to forgotpassword as a mark of success)
* The user is sent a JWT to be stored in localstorage. This JWT can be decoded to check user's username,isAdmin, isTeacher fields to give access to protected routes further.


Errors: This route goes through following middleware validations from top to bottom

1. Checks username or email. Error `Sorry, we could not find an account with this username or email`
2. Checks password and confirm password. Error `Incorrect Password`



POST`\forgotpassword`

A user can request to reset his password via forgotpassword. He will receive a reset request with a token valid for two hours. Although user is asked to submit email id to reset password. This route will work if user puts in his username instead of email id.

Success
* If users email/username is available in email is sent to user and email success message is shown.

Errors:

1. Checks username or email. Error `No such user found`.
2. If error occurs because of smtpclient
Error `Email could note be sent`.


POST`\reset`

A user can reset his password via this route. User fills in newpassword and confirmPassword for same

Success
* The user is redirected to signin page 
* The user is sent an email that password has been reset.

Errors:
1. Checks password and confirm password. Error `Password and confirm password don't match`.

POST`\settings`

A user can reset his password via this route. User fills in newpassword and confirmPassword for same

Success
* The user is shown settings change success. 
* The user is sent an email that email and password has been reset.

Errors:
1. Authentication error. `You are not authorized. Please login`.
2. Checks password and confirm password. Error `Password and confirm password don't match`.
3. Checks if email is valid
Error `Please enter a valid email id`

GET`\signout`

Success
* The JWT in localstorage is deleted. 
* The user is redirected to signin page.


# Admin Routes

GET`\superadmin`

* Can be shown when clicked on `SuperAdmin Dashboard` in Headerbar/Schoolbar (if user has school admin rights. Will be represented by `isSuperAdmin: true` in auth state)
This can be default page where a superadmin lands after signin.
Pending- Creating isSuperAdmin action in auth and corresponding reducer.

Success
A route which gives admin dashboard for company/housecups admin. Has following Features
1. List of current plans, maxAllowedTeachers/school ,maxAllowedHouses/school number of schools for each plan.
2. Ability to delte and update each plan.
3. Ability to add new pricing plans.
4. List of schools that are due payment and their current plan.

Errors:
1. Authentication error. `You are not authorized as superadmin. Please login as superadmin`.

GET`\schooladmin`
* Can be shown when clicked on `Admin Dashboard` in Headerbar (if user has school admin rights. Will be represented by `isAdmin: true` in auth state). 
This can be default page where a schooladmin lands after signin.

Success
A route which gives admin dashboard for company/housecups admin. Following Features
1. List of current added Teachers, their emailid and whether teacher has completed signup process or not.
2. Ability to delte and update teachers.
3. Ability to add teachers and handle their sigup process by sending temporary JWT (similar to `reset`) to their emailid. 
3. List of current added houses, house colors, house mascots.
4. Ability to add teachers.
5. Ability to delete/update teachers.

Errors:
1. Authentication error. `You are not authorized as schooladmin. Please login as schooladmin`.

GET`\getuserroles`
* This can be utilized to tailor frontend components as per user role

Success
1. Adds auth properties of `isSchoolAdmin`, `isSuperAdmin` and `isTeacher` to the store.
2. Please make a call for each protected route like `/scorecard` and `/schooladmin` at time of mounting of the component.

Errors:
1. Authentication error. `You are not signed in. Please sign in`.


# School Routes

GET`\api\schools` Type: `public`
Rendered when user/non-user/teachers/schooladmin/superadmin clicks on `schools` in side bar

Success
1. List of all the schools which can be clicked to see house scorecard of each school.

POST `\api\schools` Type: `Protected`
Rendered when `signed up user` clicks on `Add School` in side bar.

This can be default page when a signed up user lands after signin.

Success
1. Ability to add a school. Refere to schools model to see the details needed for adding a school.

Erros
1. If user is not signed up `You are not signedup. Please Signup`. and redirect to signup page.

GET`\api\schools\:id` Type: `public`
Rendered when user/non-user/teachers/schooladmin/superadmin clicks on a particular school in list of schools.

Success
1. List of school houses color and their corresponding scores (in sorted manner).

# Teachers/ House Routes
These are simple CRUD routes. If there are any points of cofusion please refer to 
corresponding teachers/houses folder on backend.
















