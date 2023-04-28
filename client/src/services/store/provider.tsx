"use client";
import { Provider } from "react-redux";
import { store } from "@services/store";
import { PropsWithChildren } from "react";

export function StoreProvider({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
}
