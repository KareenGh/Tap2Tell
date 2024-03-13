import { useEffect, useRef, useState } from "react";

export const useSafeState = (initialState) => {
    const [state, setState] = useState(initialState);
    const unmounted = useRef(false)

    useEffect(() => {
        unmounted.current = false
        return () => {
            unmounted.current = true
        }
    }, [])

    const setSafeState = (newState) => {
        if (!unmounted.current) {
            setState(newState)
        }
    }

    return [state, setSafeState]
}