import { useCallback } from "react";

const clampValue = (value, min, max, defaultVal) => {
    const numericValue = parseInt(String(value).trim(), 10);
    if (isNaN(numericValue)) return defaultVal;
    return Math.max(min, Math.min(max, numericValue));
};

export const useInputHandlers = (setter, min, max, defaultVal) => {

    const handleInput = useCallback((e) => {
        const inputValue = e.target.value;
        if (/^[\d\s]*$/.test(inputValue)) {
            const numericValue = parseInt(inputValue.trim(), 10);
            setter(isNaN(numericValue) ? -1 : numericValue);
        }
    }, [setter]);

    const handleUpdate = useCallback((value) => {
        const clampedValue = clampValue(value, min, max, defaultVal);
        setter(clampedValue);
    }, [setter, min, max, defaultVal]);

    const handleWheel = useCallback((e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setter((prev) => {
            const current = prev === -1 ? defaultVal : prev;
            return Math.max(min, Math.min(max, current + delta));
        });
    }, [setter, min, max, defaultVal]);

    return { handleInput, handleUpdate, handleWheel };
};
