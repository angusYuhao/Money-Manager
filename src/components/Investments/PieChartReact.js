
import React, { useRef, useEffect } from 'react'

const Canvas = props => {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw
        canvas.width = 800;
        canvas.height = 600;
        context.lineWidth = 2;
        context.strokeStyle = '#000000';     
        context.fillStyle = '#ffffff';
        context.globalCompositeOperation = "destination-over";
    
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.globalCompositeOperation = "source-over";
    
        context.strokeRect(0, 0, canvas.width, canvas.height);//for white background
        let startAngle = 0; 
        let radius = 100;
        let cx = canvas.width/2;
        let cy = canvas.height/2;

    }, [])
    
    return <canvas ref={canvasRef} {...props}/>
}
    

export default Canvas