import React, { useState, useEffect, useRef } from 'react';
import draw from 'currentSlices'

class Current extends React.Component {

    state = {
        data :[
            {name:'GOOGL', amount:4},
            {name:'APPL', amount:5},
            {name:'GME', amount:6},
            {name:'BABA', amount:7},
            {name:'MSFT', amount:8}
        ],
        
    }

    randomHexColorCode = () => {
        return "#" + Math.random().toString(16).slice(2, 8)
    };


    
    export function useCanvas(){
        const canvasRef = useRef(null);
        useEffect(() =>{
            const canvasObj = canvasRef.current;
            const ctx = canvasObj.getContext('2d');
            // clear the canvas area before rendering the coordinates held in state
            ctx.clearRect( 0,0, canvasWidth, canvasHeight );
    
            // draw all coordinates held in state
            coordinates.forEach((coordinate)=>{draw(ctx, coordinate)});
        });
    }
}

export default Current;