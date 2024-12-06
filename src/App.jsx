import './App.css';
import { useEffect, useState } from "react";
import Boat from './Boat';

function App() {
    const [speed, setSpeed] = useState(1);
    const [requiredButton, setRequiredButton] = useState('left');
    const [wasteRemoved, setWasteRemoved] = useState(0);
    const [totalClickCount, setTotalClickCount] = useState(0);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeElapsed = (now - startTime) / 1000; // in seconds
            const clicksPerSecond = totalClickCount / timeElapsed;

            // Adjust speed proportionnally based on clicks per second
            setSpeed(1 + 8 * clicksPerSecond);
        }, 100);

        return () => clearInterval(interval);
    }, [totalClickCount, startTime]);

    const getRandomButton = () => {
        return Math.random() < 0.5 ? 'left' : 'right';
    };

    const handleClick = (e) => {
        e.preventDefault();

        const buttonClicked = e.type === 'click' ? 'left' : 'right';

        if (buttonClicked === requiredButton) {
            setTotalClickCount(totalClickCount + 1);
            setWasteRemoved(wasteRemoved + 1);
            setRequiredButton(getRandomButton());
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
            <Boat speed={speed} requiredButton={requiredButton} onBoatClick={handleClick} />
        </div>
    );
}

export default App;