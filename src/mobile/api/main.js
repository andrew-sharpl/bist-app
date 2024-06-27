// An API implementation that connects to a live backend
import axios from 'axios';
import decode from 'jwt-decode';

const initApi = (url) => {
    const api = axios.create({ baseURL: url });

    let token = '';

    api.interceptors.request.use(req => {
        // req.headers.Accept = 'application/json';
        if (token) {
            // req.headers.Authorization = `Bearer ${token}`;
            req.headers['x-auth-token'] = token;
        }
        return req;
    });

    // Takes an array of error objects, an array of backup keys and returns an object with error
    // params as keys, and messages as values
    const formatErrorResponse = (errors, keys) => {
        // if any error object is missing a `param` key, assign its `msg` value to every key in `keys`
        return errors.reduce((o, curr) => curr.hasOwnProperty('param') ? ({
            ...o,
            [curr.param]: curr.msg
        }) : ({
            ...o,
            ...Object.assign({}, ...keys.map(key => ({ [key]: curr.msg }))) })
        , {});
    }

    const handleError = (error, keys = []) => {
        if (error.response) {
            const res = error.response.data;
            console.log(res);

            return Promise.reject({
                success: false,
                errors: formatErrorResponse(res?.errors ? res.errors : [{ msg: "Server error" }], keys)
            });
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
    }

    // Parses a list of events from API into format for frontend
    const parseEvents = data => data.map(e => {
        const {_id, desc, attendees, specialInst, ...rest} = e;

        return {
            ...rest,
            id: _id,
            description: desc,
            enrolledUsers: attendees,
            notes: specialInst
        }
    });

    return {
        async login(email, password) {
            try {
                const res = await api.post(`/api/user/login/`, { email, password });
                return Promise.resolve({ success: true, message: "Logged in.", token: res.data.token });
            } catch (error) {
                return handleError(error, ["email", "password"]);
            }
        },
        async register(firstName, lastName, email, password) {
            const data = { firstName, lastName, email, password };
            try {
                const res = await api.post(`/api/user/register/`, data);
                return Promise.resolve({ success: true, message: "Successfully registered.", token: res.data.token });
            } catch (error) {
                return handleError(error, ["firstName", "lastName", "email", "password"]);
            }
        },
        setToken(newToken) {
            token = newToken;
        },
        async decodeToken(token) {
            const decoded = decode(token);

            if (!decoded || !decoded.user || !decoded.user.id) {
                return Promise.reject({ error: "Invalid token." });
            }

            try {
                const res = await api.get(`/api/user/`, { headers: { 'x-auth-token': token }});
                const userData = res.data;
                return Promise.resolve({
                    _id: userData._id,
                    name: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    permissions: []
                })
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async getAppointments(user) {
            try {
                const res = await api.get(`api/appointment/`);
                const appointments = res.data.map(apt => ({ ...apt, user }));
                return appointments;
            } catch (error) {
                return handleError(error);
            }
        },
        async createAppointment(appointment) {
            try {
                const res = await api.post(`api/appointment/`, appointment);
                return res.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async updateAppointment(appointment) {
            try {
                const res = await api.put(`api/appointment/`.concat(appointment._id), appointment);
                return res.data;
            } catch (error) {
                return handleError(error);
            }
        },
        async deleteAppointment(appointmentId) {
            try {
                const res = await api.delete(`api/appointment/${appointmentId}/`);
                return res.msg;
            } catch (error) {
                return handleError(error);
            }
        },
        // TODO API endpoints for events and programs
        async getEvents() {
            try {
                const res = await api.get(`api/event/`);
                const events = res.data;
                return parseEvents(events);
            } catch (error) {
                return handleError(error);
            }
        },
        async getPrograms() {
            return [];
        },
        async getProgramDetails(programId) {
            return Promise.reject({ errors: { programId: "No program with this ID exists." } });
        },
        async getProgramEvents(progId) {
            return [];
        },
        async getEnrolledEvents() {
            try {
                const res = await api.get(`api/event/enrolled/`);
                const events = res.data;
                return parseEvents(events);
            } catch (error) {
                return handleError(error, ['message']);
            }
        },
        async enrollInEvent(eventId) {
            try {
                const res = await api.put(`api/event/register/${eventId}`);
                return res.data;
            } catch (error) {
                return handleError(error, ['message']);
            }
        },
        async unenrollInEvent(eventId) {
            try {
                const res = await api.put(`api/event/deregister/${eventId}`);
                return res.data;
            } catch (error) {
                return handleError(error, ['message']);
            }
        }
    };
};

export default initApi;