//Tutorials followed:

// import { createStyles } from '@material-ui/styles';
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
        const {listToDisplay, numDatasets} = this.props
        if(listToDisplay === undefined || listToDisplay.length == 0){
            return;
        }

        let total = listToDisplay.reduce( (ttl, entry) => {
            console.log(entry[indexName])
            return ttl + Math.round( (entry[indexName]  * 100)/ 100 )
        }, 0);
        // console.log(total);

        //get the max and min gain loss stocks or spendings
        // console.log(listToDisplay);
        let keyComponentsArray =[];
        // console.log(typeof(keyComponentsArray))
        keyComponentsArray = listToDisplay.map(function (obj) {
            // console.log(obj[indexName])
            return obj[indexName];
        });

        //use min = -15, max = 220 for now to ensure drawings are right for now, NEED TO INITIALIZE TO 1st element later
        // let maxAmount= keyComponentsArray[0];
        // let minAmount= keyComponentsArray[0];
        let maxAmount=keyComponentsArray[0];
        let minAmount=keyComponentsArray[0];


        for(let i = 0; i < keyComponentsArray.length; i++){
            if(maxAmount < keyComponentsArray[i])maxAmount = keyComponentsArray[i];
            if(minAmount > keyComponentsArray[i])minAmount = keyComponentsArray[i];
        }

        console.log(maxAmount);
        console.log(minAmount);

        //kinda like the number of pixels to be in that section
        let proportionalHeight = 0;
        if(maxAmount > 0 && minAmount < 0){
            proportionalHeight = maxAmount - minAmount;
        }else if(maxAmount > 0 && minAmount > 0){
            proportionalHeight = maxAmount;
        }else if(maxAmount < 0 && minAmount < 0){
            proportionalHeight = minAmount;
        }else{
            //error cuz maxAmount < 0 && minAmount > 0
            console.log("ERROR in maxAmount and minAmount");
        }

        console.log(proportionalHeight);
       

        //For some of the properties needed for drawing the bars.
        let sectionWidth = this.state.canvasWidth / keyComponentsArray.length;
        let sectionBorder = 0.05*sectionWidth;
        let unitHeight = (this.state.canvasHeight /proportionalHeight)*0.9;  //Make it slightly smaller than the canvas to look a bit better
        let barWidth = (sectionWidth/numDatasets)- (2*sectionBorder);
        let centerHoritzonalAxis = maxAmount * unitHeight;

        

        let currentSection = 0;
        listToDisplay.forEach(element => {
            console.log("DRAWING")
            this.context.strokeStyle = "#FF0000";
            console.log(element[indexName]);
            let barHeight = unitHeight * Math.abs(element[indexName]);
            console.log(barHeight);
            let x = (currentSection*sectionWidth) + sectionBorder;
            let y;
            if(element[indexName] > 0)y = centerHoritzonalAxis - barHeight;
            else y = centerHoritzonalAxis;
            this.context.strokeRect(x, y, barWidth, barHeight);
            // ctx.rect(900,900,100,100);
            // ctx.fill();
            //let ctx = {...this.context}
            // amou0ntVertical = maxAmount.gainLoss - minAmount.gainLoss;
            // axisPosition = (maxAmount/amountVertical) * this.state.canvasHeight;
            // this.context.lineWidth = 3;
            // this.context.strokeStyle = '#fafafa';
            // this.context.fillStyle = this.randomPastelColourCode();
            // let barColour = this.context.filStyle;
            // this.context.beginPath();

            // //draw the actual bars
            // let barValue = element[indexName];
            // console.log(barValue);
            // this.context.rect(900,900,100,100);
            // this.context.fill();
            // this.context.beginPath();
            // this.context.moveTo(800, 800);
            // this.context.lineTo(900, 900);
            // this.context.fill();
            // this.context.stroke();
            // this.context.closePath();



            currentSection+=1;
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