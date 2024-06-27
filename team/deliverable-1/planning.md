# BIST App by Gecko

<!-- > _Note:_ This document will evolve throughout your project. You commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).
 > **This document will serve as a master plan between your team, your partner and your TA.** -->

## Product Details

### Q1: What is the product?

 <!-- > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Specify if you have a partner and who they are.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app, browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the partner or the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.
 -->

A mobile app to link people with cognitive and communication disorders to
community supports associated with the Brain Injury Society of Toronto (BIST)
and help them keep track of their appointments and required information to
access those services. This application would assist individuals with cognitive,
memory, and communication disorders in discovering and accessing resources they
require to meet their daily needs. Firstly, the app would allow individuals to
be referred to resources (associated with BIST) they are in need of based on
their geographic location. An affected individual would be able to use the app
to identify relevant supports that are available to them. It would also provide
a simplified way of signing up for such supports and keeping track of when and
how to access them. Secondly, the application would assist users in keeping
track of medical appointments and other supports, including sending reminders
and providing transportation plans. Users and support workers can input upcoming
appointments, as well as whatever is necessary for the users to access the
service. Thirdly, this app would provide a way for users to store important
personal information such as identification cards and medical information. This
would allow healthcare and support workers to be able to access any information
necessary for users to receive the services they need.

Link to mock-up:
https://www.justinmind.com/usernote/tests/74507438/74508629/74508636/index.html#/screens/c262665b-3196-4459-bc61-c88fee0f2788

### Q2: Who are your target users?

  <!-- > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free to use personas. You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).** -->

Persons who have cognitive and/or communication challenges and require support
with navigation, communication, memory and planning. In particular, this
application is intended for the population supported by the Brain Injury Society
of Toronto, which includes individuals in the City of Toronto, living with the
effects of Acquired Brain Injury (ABI), who struggle with cognitive, memory and
communication disorders that limit their ability to access resources they
require to meet their daily needs. Furthermore, many of these affected
individuals are from vulnerable communities. Many individuals from the affected
population are unaware of the supports that are available to them and have
difficulty discovering them without assistance. In addition, it can be
challenging to independently manage and keep track of such supports and other
essential services, such as medical appointments. They may also experience
challenges creating transportation plans and keeping track of information
necessary for accessing these supports. As such, many from the affected
population are unable to receive the supports that are available to them,
whether it is because they are unaware of them, they have challenges keeping
track of them, they have difficulty navigating transportation options, or they
do not have the necessary information for accessing those resources.

### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

<!-- > Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how and how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate? -->

The target users of this application have specific challenges that they face on
a daily basis that affect their quality of life. There are assistive supports
for different needs that are available to them, but it can be difficult and
stressful to discover and access them. This application would simplify the
process of identifying and signing up for these supports. It can help users keep
track of these supports, as well as other essential care such as medical
appointments. It would also assist users in accessing these services by sending
reminders and providing transportation plans, and storing essential information
for those services, such as their health card and medical conditions. The app
would therefore support users with memory impairments and planning issues to
remember and problem-solve how to access those supports, and would increase the
likelihood that they can successfully connect with the resources they need.

There are some existing products which satisfy some of the needs of our users,
including applications designed for remembering appointments, making
transportation plans, and storing medical information that can be easily
accessed by healthcare workers. However, most of these products are not
specifically made for individuals with cognitive and/or communication
challenges. Our application will be designed to support the varying
accessibility needs of our target users. Furthermore, the challenges that our
target users face can make it difficult to learn and use multiple different
applications. With our product, users would only need to learn how to use a
single interface which would be able to assist them with their needs.

### Q4: What are the user stories that make up the Minumum Viable Product (MVP)?

 <!-- * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
 * If you have a partner, these must be reviewed and accepted by them. You need to include the evidence of partner approval (e.g., screenshot from email) or at least communication to the partner (e.g., email you sent) -->

1. As a user of the app, I want to be able to view and sign up for relevant
   support programs in order to be aware of resources that are available to me
   and to be able to receive the support that I need.\
   Given that I am logged into the application, when I attempt to register for an
   event that is not full or already completed, it should be recorded without error.

2. As a user of the app, I want to be able to easily keep track of upcoming
   appointments so that I can have an easier time receiving the essential care
   that I need.\
   Given I have registered for one or more events or appointments, when I check my
   personal calendar, I should be able to see all my appointments and their relevant
   information.

3. As a user of the app who has signed up for a support service or is attending
   an appointment, I want to be reminded of when and/or where my
   services/appoints are and get an easy-to-follow transportation plan so that I
   will know exactly what I need to do to get the care that I need.\
   Given I have push notifications enabled and have set up reminders for appointments,
   when it is time to travel to the appointment, I should receive notifications in
   real-time that can be expanded to display the relevant transportation plan.

4. As a user of the app, I want to easily store and access my essential
   information and IDs in order to be able to access them when needed in order
   to receive the support and care that I need.\
   Given I am trying to access a service or attend a medical appointment that I am
   registered for in the app, when I arrive at the location specified in the app
   at the appropriate time, then my necessary personal information, as listed in
   the app, will be easily accessible to be presented to the support/healthcare worker.

5. As a service worker, I want to have an account with higher-level functions so
   that I can be an administrator for normal users.\
   Given I am logged into an account with special permissions and privileges, when
   I search for an existing user, I am able to view or edit information on their
   account.

### Q5: Have you decided on how you will build it? Share what you know now or tell us the options you are considering.

<!-- > Short (1-2 min' read max)
 * What is the technology stack? Specify languages, frameworks, libraries, PaaS products or tools to be used or being considered.
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here.
 * Will you be using third party applications or APIs? If so, what are they? -->

Frontend: React Native

Backend: Node.js (Express), MongoDb

Deployment: We are planning to deploy our app's backend to some VPS. We haven't
ironed out the details fully yet since more discussion with BIST is needed here,
but we do know from our previous conversations that BIST has the budget to put
up to $1500 per year towards hosting this app. The frontend will take advantage
of React Native’s cross-platform support to compile into both an Android and iOS
application.

Architecture: For our mobile app, we will be using the 3-tier architecture
consisting of a separate frontend, backend, and database. For the React Native
frontend, we will follow some elements of Clean Architecture to allow the code
to adapt easily to any changes in the backend, using patterns such as dependency
inversion and dependency injection to create an easily changeable API interface
that communicates with the backend. In addition, we may choose to use
React-Redux in the frontend to conform to the MVC pattern, where the Redux store
represents the Model, the React components represent the View, and the Reducers
represent the Controller.

APIs: The WordPress REST API may be used to query some existing data stored on
our partner’s website, of which our mobile application will be an extension. We
may also need to integrate with APIs from Zoom or Eventbrite, depending on how
we decide to proceed with managing events. The Google Maps API will be used in
order to implement geographic features such as generating transportation plans
and referring users to nearby resources. We will need to keep the budget in mind
as we proceed here also.

---

## Intellectual Property Confidentiality Agreement

<!-- > Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please ask on Piazza.
>
**By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:
1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual.
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.
5. You will only reference the work you did in your resume, interviews, etc. You agree to not share the code or software in any capacity with anyone unless your partner has agreed to it.

**Your partner cannot ask you to sign any legal agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

Briefly describe which option you have agreed to. -->

In our second meeting with BIST we seemed to all agree that making our work
open-source would be preferred. BIST expressed interest in either integrating
other similar organizations with this app OR having the app available to be
deployed and used by others. In our communication, we expressed that sharing the
code under an open-source licence while keeping their deployment private would
be our preference.

In our third meeting, we all agreed upon sharing the code under the MIT licence
on GitHub while keeping the BIST deployment private.

---

## Teamwork Details

### Q6: Have you met with your team?

<!-- Do a team-building activity in-person or online. This can be playing an online game, meeting for bubble tea, lunch, or any other activity you all enjoy.
* Get to know each other on a more personal level.
* Provide a few sentences on what you did and share a picture or other evidence of your team building activity.
* Share at least three fun facts from members of you team (total not 3 for each member). -->

![A screenshot of our skribbl.io game](/skribblio.png)

Our team spent some time playing [skribbl.io](skribbl.io) together while hanging
in Discord! We had some fun drawing and guessing words together (best part was
Katherine's drawing of "arthritis" LOL).

Here are some fun facts we learned about a few of our team members:

- One member has been to the Eiffel Tower in Paris
- Several members are multilingual
- One member has family that lives in Germany
- Some members are better artists than others...

### Q7: What are the roles & responsibilities on the team?

<!-- Describe the different roles on the team and the responsibilities associated with each role.
 * Roles should reflect the structure of your team and be appropriate for your project. One person may have multiple roles.
 * Add role(s) to your Team-[Team_Number]-[Team_Name].csv file on the main folder.
 * At least one person must be identified as the dedicated partner liaison. They need to have great organization and communication skills.
 * Everyone must contribute to code. Students who don't contribute to code enough will receive a lower mark at the end of the term.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * Why did you choose them to take that role? Specify if they are interested in learning that part, experienced in it, or any other reasons. Do no make things up. This part is not graded but may be reviewed later. -->

Role Descriptions

- Project Manager
  - Partner liaison
  - Translating partner requirements into user stories and development tasks
  - Ticket creation and prioritization
  - Keeping the project on track
  - Budget concerns
- Development Manager
  - Scrum Master
  - Team accountability
  - Assisting with collaboration and conflict resolution
- Frontend
  - UI/UX design
  - User testing
  - Engineering the mobile app
- Backend
  - API design and documentation
  - Implementation of API, authentication, and server logic
  - Third-party API integration
- Database
  - Data modelling
  - Persistence API design and documentation
  - API implementation
- DevOps
  - Developer experience improvements
  - Infrastructure provisioning and configuration
  - Engineering CI/CD pipelines

Our Team:

- **Andrew Sharp (@andrew-sharpl)** - Project Manager and Backend
  - Interested in working with APIs and coordinating with project team members
    to rework their event registration system to work seamlessly between their
    website and our app.
- **Spencer Murray (@spalmurray)** - Development Manager and DevOps
  - Some experience with DevOps skillset, is interested in working on these
    skills in this course.
  - Management experience in other project courses (CSC207, CSC404), doesn't
    enjoy management but is willing to take on part of the workload!
  - Experience working and communicating with a non-technical partner.
- **Dexi Nie (@niedexi)** - Backend and Database
  - Has experience with building full-stack web applications, interested in
    backend architecture and database design.
- **Andrei Moshkovsky (@amshk)** - Full-stack
  - Interested in learning node/react and prefer programming work over
    management.
- **Katherine Jelich (@groovytwoshoes)** - Frontend
  - Have some experience in frontend development from coursework and experience
    in the design process from a research project.
  - Interested in the process of thoughtfully designing a UI for users with
    accessibility needs.
- **Kenneth Tran (@kennethtran77)** - Frontend
  - Has some prior work experience in frontend development and testing with
    React.
  - Is interested in further developing that skillset.

### Q8: How will you work as a team?

<!-- Describe meetings (and other events) you are planning to have.
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You should have 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * You must keep track of meeting minutes and add them to your repo under "documents/minutes" folder
   * You must have a regular meeting schedule established for the rest of the term.   -->

Our team will have a recurring weekly meeting from 1-2 pm every Thursday,
starting February 9th, 2023. This will correspond with our weekly sprint
cadence. The purpose of this meeting is to take a look at the previous sprint,
update current progress, discuss any issues, and review the work to be completed
in the following sprint.

As of now, we're planning to meet with our partner, BIST, every Tuesday at 11
am. We've had two of these meetings thus far.

Minutes from all meetings will be kept in the `team/minutes` directory.

### Q9: How will you organize your team?

<!-- List/describe the artifacts you will produce in order to organize your team.

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done? (You must grant your TA and partner access to systems you use to manage work)
   * **How do you prioritize tasks?**
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion? -->

So far, we've created a few GitHub Projects to organize, prioritize, and assign
tasks related to each sub-team. Each project will have a Kanban board where we
can track the tickets for the current sprint.

We also have a Discord server for our team where we have channels for specific
topics to be discussed in.

### Q10: What are the rules regarding how your team works?

<!-- **Communications:**
 * What is the expected frequency? What methods/channels will be used?
 * If you have a partner project, what is your process for communicating with your partner?

**Collaboration: (Share your responses to Q8 & Q9 from A1)**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 * How will you address the issue if one person doesn't contribute or is not responsive?  -->

We'll keep BIST updated through our weekly meetings along with email
communication in between when necessary.

As mentioned previously, we'll operate on a weekly sprint cadence, with a
synchronous meeting on Thursdays. Other than that, we'll keep our teams and
project manager updated through asynchronous Discord communication.

Team members are expected to be communicative, understanding, and above all
else, honest when it comes to meetings and task assignment/completion. It's okay
if someone can't contribute as much as someone else, but they should be upfront
about this for the sake of the team and the project getting completed. Assigning
less upfront is easier than scrambling to adjust project timelines after. Our
project manager will be the one to facilitate this planning and moderation.

If a member fails to meet our team's expectations, the project manager will
first try to reach out and resolve the problem, but we may need to escalate to
the TA or instructor if a problem goes unresolved for too long.
