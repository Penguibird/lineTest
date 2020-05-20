import css from './index.css'
import React, { useState, useEffect, useRef, } from 'react';

const xMod = 100;
const yMod = 100;
const radius = 10;

export default function Map(props) {
    const canvasRef = useRef();
    const [state, setState] = useState() // the canvas 2d context
    const context = useRef()
    const handleClick = (e) => {
        // drawLine()
    }

    useEffect(() => {
        context.current = canvasRef.current.getContext('2d'); //sets the context
        // drawLine();
        connectPositions(cleanPositions(positions))
    }, [setState])


    const drawLine = (x1, y1, x2, y2) => {
        console.log('line', { x1, y1, x2, y2 })
        let ctx = context.current;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(x1, y1);

        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    const drawCircle = (x, y, r) => {
        let ctx = context.current;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 3.0;
        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke()
    }

    const drawConnectingLine = (x1, y1, x2, y2) => {
        // if(y2 > y1) { // If the second node is below the first 
        //     //"normal shaped line"
        // } else if (y2 < y1)
        let distance = 20
        drawLine(x1, y1 + radius, x1, y1 + radius + distance);
        drawLine(x2, y2 - radius, x2, y2 - radius - distance);
        
    }

    const drawNode = (x, y) => {
        drawCircle(x, y, radius)
    }

    const cleanPositions = (positions) => { //makes sure that no two positions have the same horizontal position and tier and that horPos can therefore be converted into an xCoord
        positions.forEach((pos1) => {
            positions.forEach((pos2) => {
                if (pos1.tier == pos2.tier && pos1.horPoz == pos2.horPoz && pos1.id != pos2.id) {
                    pos2.horPoz++; //this assumes that position 2 will always be later in the array then pos1. If this doesn't happen we're fucked
                }
            })
        })
        return positions
    }

    const connectPositions = (positions) => {

        positions.forEach((pos, i) => {
            drawNode((pos.horPoz + 1) * xMod, (pos.tier + 1) * yMod);
            console.log(pos.children);
            pos.children.forEach((childId, i) => {
                let child = positions.find(pos => pos.id === childId)
                console.log(child);
                drawConnectingLine((pos.horPoz + 1) * xMod, (pos.tier + 1) * yMod, (child.horPoz + 1) * xMod, (child.tier + 1) * yMod);
            })
        })
    }

    return (
        <canvas
            ref={canvasRef}
            height={window.innerHeight}
            width={window.innerWidth}
            onClick={(e) => handleClick(e)}
        />)
}

class Position {
    constructor(id, tier, horPoz, name, desc, parents, children) {
        this.id = id;
        this.tier = tier;
        this.horPoz = horPoz;
        this.name = name;
        this.desc = desc;
        this.parents = parents;
        this.children = children;
    }
}

const positions = [
    new Position(1641, 0, 0, "Position", "Description of a position", [], [4230]),
    new Position(456, 0, 1, "Position", "Description of a position", [], [713]),
    new Position(4530334, 0, 2, "Position", "Description of a position", [], [713]),
    new Position(4230, 1, 0, "Position", "Description of a position", [1641], [3745]),
    new Position(713, 1, 1, "Position", "Description of a position", [4530334, 456], [378353, 57463]),
    new Position(378353, 2, 0, "Position", "Description of a position", [713], []),
    new Position(57463, 2, 1, "Position", "Description of a position", [713], []),
    new Position(3745, 3, 0, "Position", "Description of a position", [4230], [78634]),
    new Position(78634, 1, 5, "Position", "Description of a position", [3745], []),
]


