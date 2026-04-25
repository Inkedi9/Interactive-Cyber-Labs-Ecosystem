import { createContext, useContext, useMemo, useState } from "react";

const CyberModeContext = createContext(null);

export function CyberModeProvider({ children }) {
    const [rootMode, setRootMode] = useState(false);
    const [matrixMode, setMatrixMode] = useState(false);
    const [lastCommand, setLastCommand] = useState("none");

    const value = useMemo(
        () => ({
            rootMode,
            matrixMode,
            lastCommand,
            enableRootMode: () => {
                setRootMode(true);
                setLastCommand("/root");
            },
            toggleMatrixMode: () => {
                setMatrixMode((current) => !current);
                setLastCommand("/matrix");
            },
            setCommand: (command) => setLastCommand(command),
            resetModes: () => {
                setRootMode(false);
                setMatrixMode(false);
                setLastCommand("reset");
            },
        }),
        [rootMode, matrixMode, lastCommand]
    );

    return (
        <CyberModeContext.Provider value={value}>
            {children}
        </CyberModeContext.Provider>
    );
}

export function useCyberMode() {
    const context = useContext(CyberModeContext);

    if (!context) {
        throw new Error("useCyberMode must be used inside CyberModeProvider");
    }

    return context;
}