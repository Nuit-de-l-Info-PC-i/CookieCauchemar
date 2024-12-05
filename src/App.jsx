import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [boatPosition, setBoatPosition] = useState({ x: 50, y: 50 });
    const [speed, setSpeed] = useState(1);
    const [requiredButton, setRequiredButton] = useState('left');
    const [wasteRemoved, setWasteRemoved] = useState(0);

    useEffect(() => {
        const moveBoat = () => {
            setBoatPosition((pos) => ({
                x: (pos.x + speed) % (window.innerWidth - 100),
                y: (pos.y + speed) % (window.innerHeight - 100),
            }));
        };

        const interval = setInterval(moveBoat, 50);

        return () => clearInterval(interval);
    }, [speed]);

    const handleClick = (e) => {
        e.preventDefault();

        const buttonClicked = e.type === 'click' ? 'left' : 'right';

        if (buttonClicked === requiredButton) {
            setSpeed(speed + 1);
            setWasteRemoved(wasteRemoved + 1);
            setRequiredButton(requiredButton === 'left' ? 'right' : 'left');
        }
    };

    return (
        <div className="App">
            <h1>Clicker Infernal</h1>
            <p>Déchets retirés : {wasteRemoved}</p>
            <p>
                Cliquez sur le bateau avec le bouton{' '}
                <strong>{requiredButton === 'left' ? 'gauche' : 'droit'}</strong> de la souris !
            </p>
            <img
                src="/boat.png"
                alt="Bateau"
                style={{
                    position: 'absolute',
                    left: boatPosition.x,
                    top: boatPosition.y,
                    width: '100px',
                    height: 'auto',
                    cursor: 'pointer',
                }}
                onClick={handleClick}
                onContextMenu={handleClick}
            />
        </div>
    );
}

export default App;
