import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import initApi from "../../api/mock";
import LoginScreen from '../../screens/LoginScreen';
import App from '../../App';
import { act } from 'react-test-renderer';

// Hide useNativeDriver warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.useFakeTimers();

const setDate = async (newDate) => {
    const chooseDateButton = await screen.findByLabelText("Choose Date");
    act(() => fireEvent.press(chooseDateButton));

    const datePicker = (await screen.findByTestId("date-picker-parent")).children[2];
    act(() => fireEvent(datePicker, 'onChange', null, newDate));
}

const setViewType = async (viewType) => {
    const chooseDateButton = await screen.findByLabelText("Choose View");
    act(() => fireEvent.press(chooseDateButton));

    const viewPicker = await screen.findByTestId("picker");

    act(() => fireEvent(viewPicker, 'onValueChange', viewType));
}

describe("Events Screen test suite", () => {
    let api;

    beforeEach(async () => {
        // init api
        api = initApi();
        jest.setTimeout(15000);

        // initialize events
        const date1 = new Date("2023-03-15");
        api.createEvent("Event 1", "Event 1 Description", "Gecko", date1, date1, date1, "UofT", "Bring health card");
        const date2 = new Date("2023-03-17");
        api.createEvent("Event 2", "Event 21 Description", "Gecko", date2, date2, date2, "UofT", "Bring health card");
        const date3 = new Date("2023-05-15");
        api.createEvent("Event 3", "Event 3 Description", "Gecko", date3, date3, date3, "UofT", "Bring health card");
        const date4 = new Date("2024-01-15");
        api.createEvent("Event 4", "Event 4 Description", "Gecko", date4, date4, date4, "UofT", "Bring health card");

        // login and head to Events List screen
        render(<App api={api} />);

        fireEvent.changeText(screen.getByLabelText("Email"), 'user@email.com');
        fireEvent.changeText(screen.getByLabelText("Password"), 'user');
        act(() => fireEvent.press(screen.getByRole("button", { name: "Login" })));
        
        const eventsButton = await screen.findByLabelText("Events");
        act(() => fireEvent.press(eventsButton));
        const eventsListButton = await screen.findByLabelText("Events List");
        act(() => fireEvent.press(eventsListButton));

        // set date to March 15, 2023
        await setDate(new Date('2023-03-15'));
    });

    afterEach(() => {
        api = null;
    });

    // it("should only display events for the current year by default", () => {
    //     expect(screen.getByText("Event 1")).toBeVisible();
    //     expect(screen.getByText("Event 2")).toBeVisible();
    //     expect(screen.getByText("Event 3")).toBeVisible();
    //     expect(screen.queryByText("Event 4")).toBeNull();
    // });

    it("should only display events for current month when view is set to `Month`", async () => {
        await setViewType('month');

        await waitFor(() => {
            expect(screen.getByText("Event 1")).toBeVisible();
            expect(screen.getByText("Event 2")).toBeVisible();
            expect(screen.queryByText("Event 3")).toBeNull();
            expect(screen.queryByText("Event 4")).toBeNull();
        });
    });

    it("should only display events for current date when view is set to `Day`", async () => {
        // set date to January 15, 2024
        await setDate(new Date('2024-01-15'));
        await setViewType('day');

        await waitFor(() => {
            expect(screen.queryByText("Event 1")).toBeNull();
            expect(screen.queryByText("Event 2")).toBeNull();
            expect(screen.queryByText("Event 3")).toBeNull();
            expect(screen.getByText("Event 4")).toBeVisible();
        });
    });

    it("should filter out events whose titles don't match filter value", async () => {
        const filterInput = screen.getByLabelText("Filter Text Input");
        act(() => fireEvent.changeText(filterInput, "Event 1"));
        // const filterButton = screen.getByLabelText("Filter Button");
        // act(() =>  fireEvent.press(filterButton));

        await waitFor(() => {
            expect(screen.getByText("Event 1")).toBeVisible();
            expect(screen.queryByText("Event 2")).toBeNull();
            expect(screen.queryByText("Event 3")).toBeNull();
            expect(screen.queryByText("Event 4")).toBeNull();
        });
    });
});