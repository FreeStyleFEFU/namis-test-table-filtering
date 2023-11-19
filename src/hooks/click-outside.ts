import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (ref: MutableRefObject<any>, action: () => void) => {
    useEffect(() => {
        if (ref.current !== null) ref.current.focus();

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current !== null && !ref.current.contains(event.target)) action();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [action, ref]);
};
