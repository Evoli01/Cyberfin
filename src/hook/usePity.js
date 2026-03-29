import { useEffect, useState } from "react";

export function usePity() {
    const [pityCounter, setPityCounter] = useState(0);

    useEffect(() => {
        const sauvegarde = localStorage.getItem("pity");
        if (sauvegarde) setPityCounter(Number(sauvegarde));
    }, []);

    useEffect(() => {
        localStorage.setItem("pity", String(pityCounter));
    }, [pityCounter]);

    return { pityCounter, setPityCounter };
}
