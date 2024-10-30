import React, { useEffect } from 'react';
import Control from "../components/Control";
import { useControl } from "../context/ControlContext";
import { Link } from 'react-router-dom';

function BoardLayout({ pictograms, focusedPictogramIndex, setFocusedPictogramIndex, onPictogramSelect }) {
    const { create, play } = useControl();

    const personalPronouns = [
        {
            image: "yo.png",
            name: "Yo"
        },
        {
            image: "vos.png",
            name: "Vos"
        },
        {
            image: "ellos.png",
            name: "Ellos"
        },
        {
            image: "Nosotros.png",
            name: "Nosotros"
        },
        {
            image: "ustedes.png",
            name: "Ustedes"
        }
    ];

    const totalItems = personalPronouns.length + pictograms.length + 5; // 5 por los números y palabras

    const handleKeyDown = (event) => {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowUp':
                setFocusedPictogramIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
                break;
            case 'ArrowDown':
                setFocusedPictogramIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
                break;
            case 'Enter':
                handleSelection(focusedPictogramIndex);
                break;
            case ' ':
                play();
                break;
            default:
                break;
        }
    };

    const handleSelection = (index) => {
        if (index < personalPronouns.length) {
            // Selección de pronombres
            const pronoun = personalPronouns[index];
            create(pronoun);
        } else if (index < personalPronouns.length + pictograms.length) {
            // Selección de pictogramas
            const pictogramIndex = index - personalPronouns.length;
            const pictogram = pictograms[pictogramIndex];
            onPictogramSelect(pictogram); // Añadir a la selección
            create(pictogram); // Si quieres añadirlo al contexto
        } else {
            // Manejar la selección de números o palabras
            const words = ['1', '2', '3', 'Palabra 1', 'Palabra 2'];
            const word = words[index - personalPronouns.length - pictograms.length];
            console.log(`Seleccionaste: ${word}`);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focusedPictogramIndex]);

    return (
        <>
            <Control />

            <div className="flex h-screen">
                {/* Menú izquierdo */}
                <div className="w-1/6 bg-gray-200 p-4">
                    <h2 className="text-xl font-bold mb-4">Personas</h2>
                    <ul>
                        {personalPronouns.map((pronoun, index) => (
                            <li
                                className={`py-2 hover:bg-gray-300 cursor-pointer ${focusedPictogramIndex === index ? 'bg-gray-400' : ''}`}
                                key={index}
                                onClick={() => create(pronoun)}
                            >
                                <img src={pronoun.image} alt={pronoun.name} className="w-5 h-5 inline-block mr-2" />
                                {pronoun.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Área de pictogramas en el centro */}
                <div className="flex-1 bg-white p-4">
                    <h2 className="text-xl font-bold mb-4">Pictogramas</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {pictograms.map((pictogram, index) => (
                            <React.Fragment key={index}>
                                {pictogram.link ? (
                                    <Link
                                        className={`pictogram ${focusedPictogramIndex === personalPronouns.length + index ? 'bg-gray-400' : ''}`}
                                        onClick={() => {
                                            onPictogramSelect(pictogram);
                                            create(pictogram); // Añadir a la selección
                                        }}
                                        to={pictogram.link}
                                    >
                                        <img src={pictogram.image} alt={pictogram.name} className="w-20 h-20" />
                                        <p>{pictogram.name}</p>
                                    </Link>
                                ) : (
                                    <div
                                        className={`pictogram ${focusedPictogramIndex === personalPronouns.length + index ? 'bg-gray-400' : ''}`}
                                        onClick={() => {
                                            onPictogramSelect(pictogram);
                                            create(pictogram); // Añadir a la selección
                                        }}
                                    >
                                        <img src={pictogram.image} alt={pictogram.name} className="w-20 h-20" />
                                        <p>{pictogram.name}</p>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Menú derecho */}
                <div className="w-1/6 bg-gray-200 p-4">
                    <h2 className="text-xl font-bold mb-4">Números y Palabras</h2>
                    <div className="flex flex-col">
                        {['1', '2', '3', 'Palabra 1', 'Palabra 2'].map((word, index) => (
                            <div
                                key={index}
                                className={`py-2 hover:bg-gray-300 cursor-pointer ${focusedPictogramIndex === personalPronouns.length + pictograms.length + index ? 'bg-gray-400' : ''}`}
                                onClick={() => console.log(`Seleccionaste: ${word}`)}
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardLayout;
