/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

export const ConnectContext = createContext();

export function ConnectionProvider({ children }) {
    const [Connect, setConnect] = useState(false);
    return (
        <ConnectContext.Provider value={{ Connect, setConnect }}>
            {children}
        </ConnectContext.Provider>
    );
}
