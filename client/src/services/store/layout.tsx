import { PropsWithChildren } from "react";
import { StoreProvider } from "./provider";

export default function Layout({ children }: PropsWithChildren) {
    return <StoreProvider>{children}</StoreProvider>;
}
