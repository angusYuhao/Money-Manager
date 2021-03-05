import React from 'react';
import {useCanvas} from 'Draw';

class ReactPie extends React.Component {

    state = {
        data :[
            {name:'GOOGL', amount:4},
            {name:'APPL', amount:5},
            {name:'GME', amount:6},
            {name:'BABA', amount:7},
            {name:'MSFT', amount:8}
        ],
        
    }

    

    render(){
        const [canvasRef] = useCanvas();
        return(
            <canvas 
            data = {this.state.data}
            ref = {canvasRef}
            />
        )
    }

}
export default ReactPie;