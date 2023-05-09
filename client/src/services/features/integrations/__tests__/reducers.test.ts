import { reducer, actions, initialState } from "../slicer";
import type { IntegrationState } from "../slicer";
import type { Integration } from "@atptalos/common";

describe("reducers", () => {
    let state: IntegrationState;

    beforeEach(() => {
        state = {
            integrations: {},
            loading: false,
        };
    });

    describe("loading state", () => {
        test("validate loading is updated in store", () => {
            const { loading } = reducer(state, actions.startLoading);
            expect(loading).toBeTruthy();
        });
        test("should set loading to false when loading cache", () => {
            expect(reducer(state, actions.loadCached).loading).toBeFalsy();
        });
    });
    describe("fetchSuccess", () => {
        test("should add the received integration and store it", () => {
            //validate the store doesnt have new I
            expect(state.integrations).toEqual({});

            // add i
            const integration: Integration = {
                title: "customInterface",
                description: "test i",
                logo: "logo url",
                prerequisites: {
                    desc: "",
                    list: [],
                },
                connect: [],
                linkDomain: {
                    desc: "",
                    steps: [],
                },
                uploadAtts: {
                    desc: "",
                    alert: "",
                    steps: [],
                },
                getAtts: {
                    desc: "",
                    steps: [],
                    note: "",
                },
                unlink: {
                    steps: [],
                    note: "",
                },
                unlinkProject: [],
                knownIssues: {
                    step: {
                        desc: "",
                        image: "",
                    },
                    note: "",
                },
            };
            const newState = reducer(state, actions.fetchSuccess(integration));

            // validate i exist
            const { custominterface } = newState.integrations;
            expect(custominterface).toBeDefined();
            expect(custominterface.description).toBe(integration.description);
        });
    });
});
