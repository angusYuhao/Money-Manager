//Tutorials followed:

import React, { useRef, useEffect, useReducer } from 'react'

class BarChart extends React.Component {
    state = {
        canvasWidth: 1200,
        canvasHeight: 600,
        bars:[],
    }

    constructor(props) {
        super(props);
        const {barChartWidth, barChartHeight} = this.props;
        this.state.canvasHeight = barChartHeight;
        this.state.canvasWidth = barChartWidth;
        this.barChartRef = React.createRef();
    }

    randomPastelColourCode = () => {
        return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (80 + 10 * Math.random()) + '%)'
    }

    drawBars = (indexName) => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
        const {listToDisplay} = this.props
        if(listToDisplay === undefined || listToDisplay.length == 0){
            return;
        }

        let total = listToDisplay.reduce( (ttl, stock) => {
            console.log(stock["Gain/Loss"])
            return ttl + Math.round( (stock[indexName]  * 100)/ 100 )
        }, 0);
        console.log(total);

        //get the max and min gain loss stocks
        console.log(listToDisplay);
        let gainLossArray =[];
        console.log(typeof(gainLossArray))
        gainLossArray = listToDisplay.map(function (obj) {
            console.log(obj[indexName])
            return obj[indexName];
        });
             
        let maxAmount = gainLossArray[0];
        let minAmount = gainLossArray[0];

        for(let i = 0; i < gainLossArray.length; i++){
            if(maxAmount < gainLossArray[i])maxAmount = gainLossArray[i];
            if(minAmount > gainLossArray[i])minAmount = gainLossArray[i];
        }
     
        listToDisplay.forEach(element => {
            console.log("DRAWING")
            //let ctx = {...this.context}
            // amountVertical = maxAmount.gainLoss - minAmount.gainLoss;
            // axisPosition = (maxAmount/amountVertical) * this.state.canvasHeight;
            this.context.lineWidth = 3;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = this.randomPastelColourCode();
            let barColour = this.context.filStyle;
            this.context.beginPath();

            //draw the actual bars
            let barValue = element[indexName];
            console.log(barValue);

            this.context.beginPath();
            this.context.moveTo(800, 800);
            this.context.lineTo(900, 900);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();




        });
       

            
     

    }

  

    componentDidMount() {
        console.log("did mount");
        this.context = this.barChartRef.current.getContext('2d');
        console.log(this.context)
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        const context = this.context;
        this.drawBars("Gain/Loss");
        Object.preventExtensions(this);
    
    }


    componentDidUpdate(){
        this.context = this.barChartRef.current.getContext('2d');
        console.log(this.context)
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        this.drawBars("Gain/Loss");
    }
    
    render() {
        return (
          <canvas id = "barChartCanvas" ref={this.barChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight}/>
        )
    }
}

export default BarChart