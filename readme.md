# BIST App

## Description

The BIST App links people with cognitive and communication disorders to community supports associated with the Brain Injury Society of Toronto (BIST) and also helps them to keep track of their appointments and relevant identification.

Individuals with brain injuries have different requirements for a scheduling app to be usable and this app aims to fill that hole. Our interface is designed to follow the guidelines laid out by academic research on this topic.

## Key Features

- Create an account to access BIST services.
- Find and register for BIST events and services.
- View upcoming events.
- Keep track of personal appointments.
- Provide easy access to your BIST ID.

## Instructions

A new user begins by creating an account. They can navigate to the register screen by tapping the link on the login screen. In order to register, a new user must provide their first name, last name, and email and create and confirm a strong password. Once they have created an account, they are directed to the home screen of the app.
Returning users are able to log in through the initial screen.

From the home screen, the user is able to navigate to the different sections of the app corresponding to key features of the product.

Firstly, there is the “Appointments” section. When a user selects this icon, they are taken to a menu from which they can either navigate to the screen which allows them to add a new personal appointment or the screen where they can view their upcoming personal appointments. When creating a new appointment, a user must input the following information: Host – a label for who the user is having an appointment with (ex., name of doctor or organization); the date and time of the appointment; Location – the location of the appointment; About – the purpose of the appointment (ex. general medical checkup); Bring – what the user must bring with them to the appointment (ex. health card).
The user can then look at the appointments they have created and view their information. They are also able to remove them if necessary.

Secondly, there is the “Support Services” section. In this section of the app, the user can view all BIST events/services and their details and enroll/unenroll in them. They can also navigate to a screen where they can view all the events in which they are currently enrolled.

In the final product, from the home screen, the user will also be able to access their BIST ID when they select the “ID Cards” icon and access helpful information, such as how to use the app when they select the “Help” icon.

## Development requirements

- Node 18
- `git`
- `npm`

### Running the app locally

1. Clone the repo

    ```bash
    git clone https://github.com/csc301-2023-winter/project-11-bist-t.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run the application

    ```bash
    npm start
    ```


> Running `npm start` in the top level directory will run the backend server and the mobile app. If you just want to run one then run `npm run start:server` or `npm run start:mobile`.
>

## Documentation

Please refer to `src/mobile` for documentation specific to the development
of the mobile application, `src/server` for documentation specific to the
backend, and `scripts` for documentation specific to deployment and automation.

- [Frontend docs](https://github.com/csc301-2023-winter/project-11-bist-t/blob/dev/src/mobile/README.md)
- [Backend docs](https://github.com/csc301-2023-winter/project-11-bist-t/blob/dev/src/server/README.md)
- [Deployment docs](https://github.com/csc301-2023-winter/project-11-bist-t/blob/dev/scripts/deployment.md)

## Deployment and Github Workflow

We use the Gitflow workflow for branching because it was discussed in class as a good option and some of our team members have used it before. We have three core branches: `dev`, `staging`, and `prod` which always exist. When we want to develop a new feature, we create a feature branch off of `dev`. When the feature is done, we create a pull request, automated tests are run, conflicts with `dev` are detected and must be resolved, code review is done by members of the sub-team, and finally we merge into `dev`. Currently, we don’t have tests set up to make great use of `staging`, but the idea is that with some regularity we’d merge to staging and run a more thorough test suite, do QA, etc. and then merge to `prod` when we are satisfied with our release candidate.

Each of the three core branches has automatic deployments of the backend set up and we’re still working on automating our mobile app releases.

All of the automations mentioned are implemented using GitHub Actions.

## Licences

We’ve decided with our partner that we’d apply the MIT Licence to our codebase because we wanted an open source license that would be simple and permissive while protecting us from any liability or expectations of function. MIT is notably shorter then Apache and GPL, so while we think it’s still a great license for us, we also figured we’d have an easier time pitching it to our partner!

