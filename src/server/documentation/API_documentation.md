# API Documentation

## **API Base URL:** [http://bist.spalmurray.com](http://bist.spalmurray.com)

[USER](#USER) \
[PROFILE](#PROFILE) \
[APPOINTMENT](#APPOINTMENT) \
[EVENT](#EVENT) \
[ADMIN](#ADMIN)

- ### USER

  - <ins>**GET** /api/user</ins>
    - **Description:** Get user info corresponding to the given authentication token.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None
    - **Response:** JSON Object
      ```json
      {
        "_id": "String: Current user ID",
        "firstName": "String: User's first name",
        "lastName": "String: User's last name",
        "email": "String: User's email",
        "date": "Datetime: Registration date"
      }
      ```
  - <ins>**POST** /api/user/register</ins>
    - **Description:** Register a new user and generate an authorization token.
    - **Access:** Public
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "firstName": "String: User's first name",
        "lastName": "String: User's last name",
        "email": "String: User's email",
        "password": "String: User's account password"
      }
      ```
    - **Response:** JSON Object
      ```json
      {
        "token": "String: User authentication token"
      }
      ```
  - <ins>**POST** /api/user/login</ins>
    - **Description:** User login and generate an authentication token.
    - **Access:** Public
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "email": "String: User's email",
        "password": "String: User's account password"
      }
      ```
    - **Response:** JSON Object
      ```json
      {
        "token": "String: User authentication token"
      }
      ```
  - <ins>**DELETE** /api/user</ins>
    - **Description:** Delete user account and all associated information from database.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None.
    - **Response:** JSON Object
      ```json
      {
        "msg": "User Deleted"
      }
      ```

- ### PROFILE

  - <ins>**GET** /api/profile</ins>

    - **Description:** Get current user's profile.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None
    - **Response:** JSON Object
      ```json

      ```

  - <ins>**POST** /api/profile</ins>
    - **Description:** Create or update current user's profile.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json

      ```
    - **Response:** JSON Object
      ```json

      ```

- ### APPOINTMENT

  - <ins>**GET** /api/appointment</ins>
    - **Description:** Get all of the current user’s appointments.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None
    - **Response:** List[JSON Object]
      ```json
      [{
          "_id": "String: Appointment id",
          "_user": "String: User id of appointment owner",
          "host": "String: Appointment host",
          "date": "Date: Date of appointment",
          "time": "Time: Time of appointment",
          "phone": "String: Appointment host's phone number",
          "location": "String: Location of appointment",
          "about": "String: Description of appointment",
          "bring": "String: Items to bring to appointment",
          "creationTime": "Datetime: Appointment creation time"
      }, ...]
      ```
  - <ins>**POST** /api/appointment</ins>
    - **Description:** Create a new appointment.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "host": "String: Appointment host",
        "date": "Date: Date of appointment",
        "time": "Time: Time of appointment",
        "phone": "String: Phone number of appointment",
        "location": "String: Location of appointment",
        "about": "String: Description of appointment",
        "bring": "String: Items to bring to appointment"
      }
      ```
    - **Response:** JSON Object
      ```json
      {
        "_id": "String: Appointment id",
        "_user": "String: User id of appointment owner",
        "host": "String: Appointment host",
        "date": "Date: Date of appointment",
        "time": "Time: Time of appointment",
        "phone": "String: Appointment host's phone number",
        "location": "String: Location of appointment",
        "about": "String: Description of appointment",
        "bring": "String: Items to bring to appointment",
        "creationTime": "Datetime: Appointment creation time"
      }
      ```
  - <ins>**PUT** api/appointment/:id</ins>

    - **Description:** Modify an appointment with given ID.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "host": "String: Appointment host",
        "date": "Date: Date of appointment",
        "time": "Time: Time of appointment",
        "phone": "String: Phone number of appointment",
        "location": "String: Location of appointment",
        "about": "String: Description of appointment",
        "bring": "String: Items to bring to appointment"
      }
      ```
    - **Response:** JSON Object

      **Successful update:**

      ```json
      {
        "_id": "String: Appointment id",
        "_user": "String: User id of appointment owner",
        "host": "String: Appointment host",
        "date": "Date: Date of appointment",
        "time": "Time: Time of appointment",
        "phone": "String: Appointment host's phone number",
        "location": "String: Location of appointment",
        "about": "String: Description of appointment",
        "bring": "String: Items to bring to appointment",
        "creationTime": "Datetime: Appointment creation time"
      }
      ```

      **Invalid Appointment ID:**

      ```json
      {
        "msg": "Appointment not found"
      }
      ```

  - <ins>**GET** api/appointment/:id</ins>
    - **Description:** Get an appointment information by ID.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None.
    - **Response:** JSON Object
      ```json
      {
        "_id": "String: Appointment id",
        "_user": "String: User id of appointment owner",
        "host": "String: Appointment host",
        "date": "Date: Date of appointment",
        "time": "Time: Time of appointment",
        "phone": "String: Appointment host's phone number",
        "location": "String: Location of appointment",
        "about": "String: Description of appointment",
        "bring": "String: Items to bring to appointment",
        "creationTime": "Datetime: Appointment creation time"
      }
      ```
  - <ins>**DELETE** api/appointment/:id</ins>

    - **Description:** Delete an appointment by ID.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None
    - **Response:** JSON Object

      **Invalid ID:**

      ```json
      {
        "msg": "Appointment not found"
      }
      ```

      **Invalid Authorization:**

      ```json
      {
        "msg": "User not authorized"
      }
      ```

      **Successful Deletion:**

      ```json
      {
        "msg": "Post removed"
      }
      ```

- ### EVENT

  - <ins>**GET** /api/event</ins>
    - **Description:** Get all events information.
    - **Access:** Private (user/admin)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User/Admin authentication token |
    - **Body:** None
    - **Response:** JSON Object
      ```json
      [
        {
          "_id": "String: Event ID",
          "type": "String: Event type, 'inPerson' or 'online'",
          "title": "String: Event title",
          "host": "String: Event host",
          "date": "Datetime: Event date",
          "startTime": "Datetime: Event start time",
          "endTime": "Datetime: Event end time",
          "location": "String: Event Location",
          "zoomLink": "String: Zoom meeting link",
          "zoomPassword": "String: Zoom Meeting password",
          "desc": "String: Description",
          "specialInst": "String: Special instruction",
          "attendees": [
            {
              "user": "String: User ID",
              "_id": "String: Subdoc ID"
            }
          ],
          "creationTime": "Datetime: Creation time"
        }
      ]
      ```
  - <ins>**GET** /api/event/:id</ins>

    - **Description:** Get an event by ID.
    - **Access:** Private (user/admin)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User/Admin authentication token |

    - **Body:** None
    - **Response:** JSON Object
      ```json
      {
          "_id": "String: Event ID",
          "type": "String: Event type, 'inPerson' or 'online'",
          "title": "String: Event title",
          "host": "String: Event host",
          "date": "Datetime: Event date",
          "startTime": "Datetime: Event start time",
          "endTime": "Datetime: Event end time",
          "location": "String: Event Location",
          "zoomLink": "String: Zoom meeting link",
          "zoomPassword": "String: Zoom Meeting password",
          "desc": "String: Description",
          "specialInst": "String: Special instruction",
          "attendees": [
              {
                  "user": "String: User ID",
                  "_id": "String: Subdoc ID"
              },
          ],
          "creationTime": "Datetime: Creation time"
      },
      ```

  - <ins>**GET** /api/event/enrolled</ins>

    - **Description:** Get all events the user currently enrolled.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User/Admin authentication token |
    - **Body:** None
    - **Response:** JSON Object
      ```json
      [
        {
          "_id": "String: Event ID",
          "type": "String: Event type, 'inPerson' or 'online'",
          "title": "String: Event title",
          "host": "String: Event host",
          "date": "Datetime: Event date",
          "startTime": "Datetime: Event start time",
          "endTime": "Datetime: Event end time",
          "location": "String: Event Location",
          "zoomLink": "String: Zoom meeting link",
          "zoomPassword": "String: Zoom Meeting password",
          "desc": "String: Description",
          "specialInst": "String: Special instruction",
          "attendees": [
            {
              "user": "String: User ID",
              "_id": "String: Subdoc ID"
            }
          ],
          "creationTime": "Datetime: Creation time"
        }
      ]
      ```

  - <ins>**PUT** /api/event/register/:id</ins>

    - **Description:** Register an event by ID.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User authentication token |
    - **Body:** None
    - **Response:** JSON Object

      ```json

      ```

  - <ins>**PUT** /api/event/deregister/:id</ins>

    - **Description:** Deregister an event by ID.
    - **Access:** Private (user)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: User/Admin authentication token |
    - **Body:** None
    - **Response:** JSON Object

      ```json

      ```

- ### ADMIN

  - <ins>**POST** /api/admin/login</ins>

    - **Description:** Admin login and generate an authentication token.
    - **Access:** Public
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "admin": "String: Admin name",
        "password": "String: Admin password"
      }
      ```
    - **Response:** JSON Object
      ```json
      {
        "token": "String: Admin authentication token"
      }
      ```

  - <ins>**POST** /api/admin/register</ins>

    - **Description:** Register a new admin and generate an authorization token.
    - **Access:** Public
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | Content-Type | application/json |
    - **Body:** JSON Object
      ```json
      {
        "admin": "String: Admin name",
        "password": "String: Admin password"
      }
      ```
    - **Response:** JSON Object
      ```json
      {
        "token": "String: Admin authentication token"
      }
      ```

  - <ins>**POST** /api/admin/event</ins>

    - **Description:** Create a new event.
    - **Access:** Private (admin)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: Admin authentication token |
      | Content-Type | application/json |

    - **Body:** JSON Object

      ```json
      {
        "type": "String: Event type, must be 'inPerson' or 'online'",
        "title": "String: Event title",
        "host": "String: Event host",
        "date": "Datetime: Event date",
        "startTime": "Datetime: Event start time",
        "endTime": "Datetime: Event end time",
        "location": "[Optional] String: Event Location",
        "zoomLink": "[Optional] String: Zoom meeting link",
        "zoomPassword": "[Optional] String: Zoom Meeting password",
        "desc": "[Optional] String: Description",
        "specialInst": "[Optional] String: Special instruction"
      }
      ```

    - **Response:** JSON Object
      ```json
      {
        "_id": "String: Event ID",
        "type": "String: Event type, 'inPerson' or 'online'",
        "title": "String: Event title",
        "host": "String: Event host",
        "date": "Datetime: Event date",
        "startTime": "Datetime: Event start time",
        "endTime": "Datetime: Event end time",
        "location": "String: Event Location",
        "zoomLink": "String: Zoom meeting link",
        "zoomPassword": "String: Zoom Meeting password",
        "desc": "String: Description",
        "specialInst": "String: Special instruction",
        "attendees": [],
        "creationTime": "Datetime: Creation time"
      }
      ```

  - <ins>**PUT** /api/admin/event/:id</ins>

    - **Description:** Update an event by ID.
    - **Access:** Private (admin)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: Admin authentication token |
      | Content-Type | application/json |

    - **Body:** JSON Object

      ```json
      {
        "type": "[Optional] String: Event type, must be 'inPerson' or 'online'",
        "title": "[Optional] String: Event title",
        "host": "[Optional] String: Event host",
        "date": "[Optional] Datetime: Event date",
        "startTime": "[Optional] Datetime: Event start time",
        "endTime": "[Optional] Datetime: Event end time",
        "location": "[Optional] String: Event Location",
        "zoomLink": "[Optional] String: Zoom meeting link",
        "zoomPassword": "[Optional] String: Zoom Meeting password",
        "desc": "[Optional] String: Description",
        "specialInst": "[Optional] String: Special instruction"
      }
      ```

    - **Response:** JSON Object

      ```json

      ```

  - <ins>**DELETE** /api/admin/event/:id</ins>

    - **Description:** Delete an event by ID.
    - **Access:** Private (admin)
    - **Header:**
      | KEY | VALUE |
      | --- | ----- |
      | x-auth-token | String: Admin authentication token |
    - **Body:** None
    - **Response:** JSON Object

      ```json

      ```
