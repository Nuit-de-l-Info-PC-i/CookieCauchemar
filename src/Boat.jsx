import React, { useEffect, useState } from 'react';

function Boat({ speed, requiredButton, onBoatClick }) {
    const [boatPosition, setBoatPosition] = useState({
        x: window.innerWidth / 2 - 75, // Center horizontally, assuming boat width is 100px
        y: window.innerHeight / 2 - 75 // Center vertically, assuming boat height is 100px
    });
    const [direction, setDirection] = useState({ dx: 1, dy: 1 });

    useEffect(() => {
        const moveBoat = () => {
            setBoatPosition((pos) => {
                let newX = pos.x + speed * direction.dx;
                let newY = pos.y + speed * direction.dy;

                // Check for horizontal boundaries
                if (newX < 0) {
                    newX = window.innerWidth - 150; // Move to the opposite side
                } else if (newX > window.innerWidth - 150) {
                    newX = 0; // Move to the opposite side
                }

                // Check for vertical boundaries
                if (newY < 0) {
                    newY = window.innerHeight - 150; // Move to the opposite side
                } else if (newY > window.innerHeight - 150) {
                    newY = 0; // Move to the opposite side
                }

                return { x: newX, y: newY };
            });
        };

        const changeDirection = () => {
            if (Math.random() < 0.05) { // 10% probability to change direction
                const angle = Math.random() * 2 * Math.PI; // Random angle in radians
                setDirection({
                    dx: Math.cos(angle),
                    dy: Math.sin(angle),
                });
            }
        };

        const interval = setInterval(() => {
            moveBoat();
            changeDirection();
        }, 50);

        return () => clearInterval(interval);
    }, [speed]);

    return (
        <img
            src="src/boat.png"
            alt="Bateau"
            style={{
                position: 'absolute',
                left: boatPosition.x,
                top: boatPosition.y,
                width: '150px', // Adjust the width as needed
                height: '150px', // Adjust the height as needed
            }}
            onClick={onBoatClick}
            onContextMenu={onBoatClick}
        />
    );
}

export default Boat;