//Tutorials followed:

import React, { useRef, useEffect, useReducer } from 'react'

class BarChart extends React.Component {
    state = {
        canvasWidth: 1200,
        canvasHeight: 600,
        bars: [],
        graphWidth: 1000,//style this in css to add padding on left and right
        graphHeight: 500,
    }

    constructor(props) {
        super(props);
        this.barChartRef = React.createRef();
    }

    randomPastelColourCode = () => {
        return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (80 + 10 * Math.random()) + '%)'
    }

    drawBars = () => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
        const {listToDisplay, col} = this.props
        
        
        let total = listToDisplay.reduce( (ttl, stock) => {
            return ttl + (parseFloat(stock["Book Cost"]))
        }, 0);

        //get the max and min gain loss stocks
        const maxAmount = listToDisplay.reduce(function(prev, current) {
            return (prev[col] > current[col]) ? prev : current
        })
        console.log(maxAmount)

        const minAmount = listToDisplay.reduce(function(prev, current) {
            return (prev[col] < current[col]) ? prev : current
        })
        console.log(minAmount)
        

        //based on the max and min values, calculate the corresponding ratios for the bar graph
        let amountVertical = 0;
        let axisPosition = 0;
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        if(minAmount.gainLoss < 0){
            console.log("DRAWING")
            amountVertical = maxAmount.gainLoss - minAmount.gainLoss;
            axisPosition = (maxAmount/amountVertical) * this.graphHeight;
            // axisPosition = 1110;
            this.context.lineWidth = 3;
            this.context.strokeStyle = 'rebeccapurple';
            this.context.fillStyle = 'rebeccapurple';
            this.context.beginPath();
            this.context.moveTo(100, 1200);
            this.context.lineTo(1100, 1200);
            this.context.stroke();
            this.context.closePath();
        }else{
            amountVertical = maxAmount.gainLoss; 
        }
        

    }


    componentDidMount() {
        this.context = this.barChartRef.current.getContext('2d');
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        console.log(rect);
        this.drawBars();
    }

    
    render() {
        return (
          <canvas id = "barChartCanvas" ref={this.barChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight}/>
        )
    }
}

export default BarChart