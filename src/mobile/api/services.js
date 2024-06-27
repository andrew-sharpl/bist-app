import { createContext, useContext } from "react";

const ServiceContext = createContext({});

// hook to access api
export const useServices = () => useContext(ServiceContext);

/* context provider component to initialize api
getApi: returns an api object
getGlobalStorage: returns an object to manipulate global storage: {
    set(key, value) - initializes a key-value pari
    get(key) - retrieves the value of a key
}
*/
const ServiceProvider = ({
    getApi,
    getGlobalStorage,
    children
}) => {
    return (
        <ServiceContext.Provider value={{ getApi, getGlobalStorage }}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceProvider;