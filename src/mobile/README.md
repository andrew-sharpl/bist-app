# Assignment Pair 11.2

## Frontend Sub-team

1. For the frontend sub-team, our choice of language framework was influenced by the need to support both users of iOS and Android devices, as per the request of our partner, the Brain Injury Society of Toronto. As the application is also required to be supported on mobile devices, we initially considered several options, such as a web application that users would connect to through their mobile browser, or developing the same application twice using different technologies, one with Java and Android Studio, and one with Swift for Apple phones. However, since a web application would not provide the best user experience on mobile as it would not have access to any native functionality of mobile devices, such as push notifications, and recreating the same application twice would take too much time, we decided to choose React Native as our framework, as it supports compilation into a form supported by both Android and iOS devices. Also, all members of the frontend sub-team have existing experience using React and JavaScript to build web applications, which reduces the learning curve for the project. In addition, we decided to use the Expo platform to facilitate the development and deployment of the app since this platform supports a development server that responds to changes in source code in real-time and allows for quick application deployment to a remote server.\
\
For this frontend component, we decided to only focus on the UI and simulate the user experience without connecting to any backend or database. However, this required us to communicate with our backend and database sub-teams to establish a common data model and API interface that all components would need to agree on.\
\
Building on the React ecosystem, we decided to use some npm libraries in order to speed up development of the user interface, using React Navigation to support having different screens and the navigation between them, as well as React Native Material and React Native Paper for common UI components, such as text fields and buttons, in Material UI style.\
\
Considering our target users as the population serviced by BIST, our team had to make our UI design decisions according to the needs of the intended users. Many of the target users of this app experience cognitive and/or communication challenges and require support with navigation, communication, memory and planning.\
\
Literature on designing apps for individuals with acquired brain injuries describes how narrow-deep interfaces (i.e. interfaces with more screens and less information per screen) are easier to navigate and understand for our target users than broad-shallow interfaces (i.e. interfaces with fewer screens and more information per screen) (see: link). As such, many of our decisions regarding the app's navigational structure were made with this in mind. Different use cases for the app have been split into different sections where appropriate. There are several layers of menu screens to assist a user in arriving at the exact function of the application which they would like to use without overwhelming the user with too much information per screen.\
\
Furthermore, we designed the appearance of each screen to be easy to understand. We followed standard guidelines for designing for accessibility (see: link). For example, simple colours were used as the app is primarily black and white. Colour is used sparingly in order to bring attention to important information. Additionally, layouts are consistent throughout the app, and actions are easy to identify and follow. As such, the design takes into consideration different accessibility challenges that are relevant to the target users of the app.


2. Kenneth implemented the Login and Home screens, and also set up an initial structure for accessing the dummy API functions, which includes the authentication logic to log in and store user data, as well as access and manipulate data related to Events, which is a data type relevant to our user story.\
\
Katherine implemented the screens for registering/enrolling in events and viewing already enrolled events and also explored how to make the design of the app more accessible and improve ease of use for the target users.\
\
Andrei implemented the appointment view/creation screens that allow each user to add appointments and then view them.



3. In order to access the frontend application, you must scan a QR code which initializes the application on the Expo Go app ([Apple Store](https://apps.apple.com/us/app/expo-go/id982107779) | [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_CA&gl=US&pli=1)), which is a required installation.\
\
Link to QR Code: https://expo.dev/@kennethtran77/bist \
\
You can login with the following credentials:\
Email: user@email.com\
Password: user



## References


  Jamieson, M., Lennon, M., Cullen, B., Brewster, S., & Evans, J. (2022). Supporting People with Acquired Brain Injury to Use a Reminding App; Narrow-deep vs. Broad-shallow User Interfaces. ACM Transactions on Accessible Computing, 15(1), 1–23. https://doi.org/10.1145/3501275
