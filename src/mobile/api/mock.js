// An API implementation with dummy data for testing

import AppointmentsScreen from "../screens/AppointmentsScreen";

const initApi = (url) => {
    let email = '';
    
    const accounts = [
    {
        email: "admin@email.com",
        password: "admin",
        token: "admin"
    }, {
        email: "user@email.com",
        password: "user",
        token: "user"
    }]

    const events = [];
    // const events = [
    //     {
    //         id: 1,
    //         programId: 1,
    //         title: "Event 1",
    //         subheading: "Event 1 Subheading",
    //         date: "Event 1 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 1 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
    //     {
    //         id: 2,
    //         programId: 1,
    //         title: "Event 2",
    //         subheading: "Event 2 Subheading",
    //         date: "Event 2 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 2 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
    //     {
    //         id: 3,
    //         programId: 2,
    //         title: "Event 3",
    //         subheading: "Event 3 Subheading",
    //         date: "Event 3 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 3 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
    //     {
    //         id: 4,
    //         programId: 2,
    //         title: "Event 4",
    //         subheading: "Event 4 Subheading",
    //         date: "Event 4 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 4 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
    //     {
    //         id: 5,
    //         programId: 3,
    //         title: "Event 5",
    //         subheading: "Event 5 Subheading",
    //         date: "Event 5 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 5 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
    //     {
    //         id: 6,
    //         programId: 3,
    //         title: "Event 6",
    //         subheading: "Event 6 Subheading",
    //         date: "Event 6 date",
    //         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque",
    //         location: "Event 6 Location",
    //         slots: 10,
    //         enrolledUsers: []
    //     },
        
    // ];

    const getSmallestFreeId = (arr) => {
        const ids = new Set(arr.map(item => item.id));
    
        let i = 1;
        while (ids.has(i)) {
            i++;
        }
    
        return i;
    };

    const programs = [
        {
            id: 1,
            title: "Program 1",
            subheading: "Program 1 Subheading",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque"
        },
        {
            id: 2,
            title: "Program 2",
            subheading: "Program 2 Subheading",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque"
        },
        {
            id: 3,
            title: "Program 3",
            subheading: "Program 3 Subheading",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet pellentesque"
        },
    ];
    const appointments = [
        {
            id: 1,
            user: "Admin",
            host: "doctor",
            date: new Date(),
            time: new Date(),
            phone: '416-112-8754',
            location: "clinic",
            about: "checkup",
            bring: "healthcard"
        },
        {
            id: 2,
            user: "Admin",
            host: "doctor2",
            date: new Date(),
            time: new Date(),
            phone: '416-321-9867',
            location: "clinic",
            about: "checkup2",
            bring: "healthcard"
        },
        {
            id: 3,
            user: "Admin",
            host: "doctor3",
            date: new Date(),
            time: new Date(),
            phone: '416-775-2156',
            location: "clinic",
            about: "checkup3",
            bring: "healthcard"
        },
        {
            id: 4,
            user: "User",
            host: "optometrist",
            date: new Date(),
            time: new Date(),
            phone: '416-132-6356',
            location: "Eye Clinic",
            about: "checkup3",
            bring: "healthcard"
        },
        {
            id: 5,
            user: "User",
            host: "optometrist",
            date: new Date(),
            time: new Date(),
            phone: '416-522-8923',
            location: "Eye Clinic",
            about: "checkup3",
            bring: "healthcard"
        },
        {
            id: 6,
            user: "User",
            host: "optometrist",
            date: new Date(),
            time: new Date(),
            phone: '416-578-3489',
            location: "49 St. George Street",
            about: "checkup3",
            bring: "healthcard"
        },
    ]

    let idc = 7;

    return {
        setToken(token) {
            email = token.email;
        },
        async createAppointment(appointment) {
            idc = idc + 1;
            appointment.id = idc;
            appointments.push(appointment);
        },
        async getAppointments(user) {
            return Promise.resolve(appointments.filter(appointment => appointment.user.includes(user)));
        },
        async updateAppointment(appointment) {
            for (const appoint of appointments) {
                if (appoint.id == appointment.id) {
                    appoint.host = appointment.host;
                    appoint.date = appointment.date;
                    appoint.time = appointment.time;
                    appoint.phone = appointment.phone;
                    appoint.location = appointment.location;
                    appoint.about = appointment.about;
                    appoint.bring = appointment.bring;
                    return Promise.resolve(appoint);
                }
            }
            return Promise.reject({ errors: { msg: "Failed to Update." }});
        },
        async deleteAppointment(appointmentArg) {
            for (const appointment of appointments) {
                if (appointmentArg.id == appointment.id) {
                    appointments.pop(appointment);
                    return Promise.resolve({ success: true, msg: "Deleted."});
                }
            }
            return Promise.reject({ errors: { message: "Failed to Delete." }});
        },
        async login(email, password) {
            for (const account of accounts) {
                if (email.trim().toLowerCase() !== account.email) {
                    continue;
                }

                if (password !== account.password) {
                    return Promise.reject({ success: false, errors: { password: "Incorrect password." } });
                }

                return Promise.resolve({ success: true, message: "Logged in.", token: account.token });
            }

            return Promise.reject({ success: false, errors: { email: "No account associated with this email exists." } });
        },
        async register() {

        },
        async getEvents() {
            return Promise.resolve(events);
        },
        async getPrograms() {
            return Promise.resolve(programs);
        },
        async getProgramDetails(programId) {
            if (programs.some(p => p.id === programId)) {
                const found = programs.find(p => p.id === programId);
                // console.log("API CALL");
                // console.log(found);
                return Promise.resolve(found);
            } else {
                return Promise.reject({ errors: { programId: "No program with this ID exists." } });
            }

        },
        async getProgramEvents(progId) {
            // This should return the events specifically for this program...
            // console.log("API");
            // console.log(progId);
            const result = events.filter(e => e.programId === progId);
            return Promise.resolve(result);
        },
        async getEnrolledEvents() {
            return Promise.resolve(events.filter(event => event.enrolledUsers.includes(email)));
        },
        async enrollInEvent(eventId) {
            const event = events.find(event => event.id === eventId);

            if (!event) {
                return Promise.reject({ message: "Could not find event with id " + eventId + "." });
            }

            if (event.enrolledUsers.includes(email)) {
                return Promise.reject({ message: "You are already enrolled in " + event.title + "." });
            }

            if (event.enrolledUsers.length >= event.slots) {
                return Promise.reject({ message: "Event " + event.title + " is full." });
            }

            event.enrolledUsers = [...event.enrolledUsers, email];
            return Promise.resolve({ message: "Enrolled in event " + event.title + "." });
        },
        async unenrollInEvent(eventId) {
            const event = events.find(event => event.id === eventId);

            if (!event) {
                return Promise.reject({ message: "Could not find event with id " + eventId + "." });
            }

            if (!event.enrolledUsers.includes(email)) {
                return Promise.reject({ message: "You are not enrolled in event " + event.title + "." });
            }

            event.enrolledUsers = event.enrolledUsers.filter(e => e !== email);
            return Promise.resolve({ message: "Unenrolled from event " + event.title + "." });
        },
        async createEvent(title, description, host, date, startTime, endTime, location, notes) {
            const id = getSmallestFreeId(events);

            if (!title.length) {
                return Promise.reject({ message: "Please enter a title." });
            }

            if (!host.length) {
                return Promise.reject({ message: "Please enter a host." });
            }

            if (!date) {
                return Promise.reject({ message: "Please enter a date." });
            }

            const event = { id, title, description, host, date, startTime, endTime, location, notes, enrolledUsers: [], slots: 10 };
            events.push(event);
        },
        async decodeToken(token) {
            switch (token) {
                case "admin":
                    return Promise.resolve({
                        _id: 1,
                        name: 'Admin',
                        lastName: 'Admin',
                        email: "admin@email.com",
                        permissions: ["admin"]
                    });
                case "user":
                    return Promise.resolve({
                        _id: 2,
                        name: 'User',
                        lastName: 'User',
                        email: 'user@email.com',
                        permissions: []
                    });
                default:
                    return null;
            }
        }
    };
};

export default initApi;