import { Link } from "react-router-dom";
import { useControl } from "../context/ControlContext";
import { useParams } from "react-router-dom";
import BoardLayout from "../layouts/BoardLayout";
import { useState } from "react";

function Board() {
    const { create } = useControl();
    const { category } = useParams();

    const pictograms = [
        {
            image: "ejemplo.png",
            name: "Ejemplo 1"
        },
        {
            image: "ejemplo.png",
            name: "Ejemplo 2"
        },
        {
            image: "ejemplo.png",
            name: "Ejemplo 3"
        }
    ];

    const [focusedPictogramIndex, setFocusedPictogramIndex] = useState(0);

    const handlePictogramSelection = (pictogram) => {
        create(pictogram);
    };

    return (
        <BoardLayout
            pictograms={category === "1" ? pictograms : [{ image: "ejemplo.png", name: "Prueba", link: "/board/1" }]}
            focusedPictogramIndex={focusedPictogramIndex}
            setFocusedPictogramIndex={setFocusedPictogramIndex}
            onPictogramSelect={handlePictogramSelection}
        />
    );
}

export default Board;
