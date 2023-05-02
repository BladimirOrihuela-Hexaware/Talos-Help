"use client";
import { Provider } from "react-redux";
import { setupStore } from "@services/store";
import { PropsWithChildren } from "react";

export function StoreProvider({ children }: PropsWithChildren) {
    return <Provider store={setupStore()}>{children}</Provider>;
}
