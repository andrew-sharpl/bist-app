import { render, screen, fireEvent } from '@testing-library/react-native';
import initApi from "../../api/mock";
import LoginScreen from '../../screens/LoginScreen';
import App from '../../App';
import { act } from '@testing-library/react-native';

// Hide useNativeDriver warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.useFakeTimers();

describe("Login Screen test suites", () => {
    let api;
    
    beforeEach(() => {
        api = initApi();
    });

    afterEach(() => {
        api = null;
    });

    it("should render login form", async () => {
        render(<LoginScreen />);
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });
        expect(emailField).toBeVisible();
        expect(passwordField).toBeVisible();
        expect(loginButton).toBeVisible();
    });

    it("should not log in with incorrect credentials", async () => {
        render(<App api={api} />);
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        fireEvent.changeText(emailField, 'user@email.com');
        fireEvent.changeText(passwordField, 'wrongpassword');
        act(() => fireEvent.press(loginButton));

        // check that an error message has appeared
        // note: since we are using the mock.js api, the error messages may differ
        const error = await screen.findByText("Incorrect password.");
        expect(error).toBeVisible();        
    });

    it("should redirect to home page when logged in successfully", async () => {
        render(<App api={api} />);
        const emailField = screen.getByLabelText("Email");
        const passwordField = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        fireEvent.changeText(emailField, 'user@email.com');
        fireEvent.changeText(passwordField, 'user');
        act(() => fireEvent.press(loginButton));

        const logoutText = await screen.findByText("Logout");
        expect(logoutText).toBeVisible();
    });
});