//Tutorials followed:

// import { createStyles } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import React, { useRef, useEffect, useReducer } from 'react'
import { deepPurple, grey } from '@material-ui/core/colors';

class BarChart extends React.Component {
    state = {
        canvasWidth: 1400,
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

    drawBars = (barIndex,labelIndex, ) => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
        const {listToDisplay, numDatasets} = this.props
        if(listToDisplay === undefined || listToDisplay.length == 0){
            return;
        }

        let total = listToDisplay.reduce( (ttl, entry) => {
            console.log(entry[barIndex])
            return ttl + Math.round( (entry[barIndex]  * 100)/ 100 )
        }, 0);
        // console.log(total);

        //get the max and min gain loss stocks or spendings
        // console.log(listToDisplay);
        let keyComponentsArray =[];
        // console.log(typeof(keyComponentsArray))
        keyComponentsArray = listToDisplay.map(function (obj) {
            // console.log(obj[indexName])
            return obj[barIndex];
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
        let unitHeight = this.state.canvasHeight /proportionalHeight;
        
        let barWidth = (sectionWidth/numDatasets)- (2*sectionBorder);
        let centerHoritzonalAxis = maxAmount * unitHeight;
        unitHeight *= 0.85;  //Make it slightly smaller than the canvas to look a bit better
        console.log(centerHoritzonalAxis);
        console.log(maxAmount * (this.state.canvasHeight /proportionalHeight));

        

        let currentSection = 0;

        let colourForThisList = this.randomPastelColourCode();
        listToDisplay.forEach(element => {
            //draw bar
            let x = (currentSection*sectionWidth) + sectionBorder;
            let y;
            let barHeight = unitHeight * Math.abs(element[barIndex]);
            if(element[barIndex] > 0)y = centerHoritzonalAxis - barHeight;
            else y = centerHoritzonalAxis;
            this.context.fillStyle = colourForThisList;
            this.context.fillRect(x, y, barWidth, barHeight);

            //draw the label
            let labelString = element[labelIndex];
            let amountString = element[barIndex];
            if(element[barIndex] >= 0)amountString = '$' + amountString;
            else amountString = '-$' + amountString;

            //put the amountString just above the bar
            this.context.fillStyle = '#85929E';
            this.context.font = '20px Poppins, sans-serif';
            this.context.textAlign = 'center';
            let text_x=x+(barWidth/2.1); 
            let text_y=y*0.97;
            this.context.fillText(amountString,text_x, text_y);

            //put the labelString in a legend thingy



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
        this.drawBars("Gain/Loss", "Name");
        Object.preventExtensions(this);
    
    }


    componentDidUpdate(){
        this.context = this.barChartRef.current.getContext('2d');
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        const context = this.context;
        //clear canvas
        context.clearRect(0, 0, rect.width, rect.height);
        context.beginPath();

        //clear bars
        //this.state.slices = [];

        //redraw
        this.drawBars("Gain/Loss","Name");
    }
    
    render() {
        return (
          <canvas id = "barChartCanvas" ref={this.barChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight}/>
        )
    }
}

export default BarChart