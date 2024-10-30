import { createContext, useContext, useState } from 'react';

const ControlContext = createContext();

export const useControl = () => useContext(ControlContext);

export default function ControlProvider({ children }) {
    const [pictograms, setPictograms] = useState([]);

    // Funcion para hablar, utilizando la API de SpeechSynthesis de JS
    const speak = (text, speed) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.volume = 1.0
        utterance.rate = speed || 1.0;
        window.speechSynthesis.speak(utterance);
    };

    // Funcion para añadir un pictograma a la lista
    const create = ({ image, name, link }) => {
        const newPictogramStructure = {
            id: Date.now(),
            image,
            name,
            link
        }

        speak(name);

        setPictograms([...pictograms, newPictogramStructure]);
    }

    // Elimina el ultimo pictograma de la lista
    const erase = () => {
        setPictograms(pictograms.slice(0, pictograms.length - 1));
    }

    // Funcion para borrar la lista
    const remove = () => {
        setPictograms([]);
    }

    // Funcion para reproducir todos los pictogramas, para generar una comunicación global
    const play = () => {
        // En caso de que no haya pictogramas, que no inicie la reproducción.
        if (pictograms.length === 0) return;
        const text = pictograms.map(pictogram => pictogram.name).join(' ');
        speak(text, 0.7);
    }

    return (
        <ControlContext.Provider value={{ pictograms, create, erase, remove, play }}>
            {children}
        </ControlContext.Provider>
    )
}