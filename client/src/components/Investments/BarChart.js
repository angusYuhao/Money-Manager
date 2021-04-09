//Tutorials followed:

// import { createStyles } from '@material-ui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import React, { useRef, useEffect, useReducer } from 'react'
import { deepPurple, grey } from '@material-ui/core/colors';

class BarChart extends React.Component {
    state = {
        canvasWidth: 1400,
        canvasHeight: 600,
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

    drawBars = () => {
        const {indices, labelIndex, listToDisplay, numDatasets} = this.props
        let colourForThisList = [];
        let keyComponentsArray = [];
        let labelsForAboveBars = [];
        let xPosForAboveBars = [];
        let yPosForABoveBars = [];
        // expand labelsForAboveBars, xPosForAboveBars, yPosForABoveBars to have the correct amount or rows
        for(let i=0; i<numDatasets; i++ ) {
            labelsForAboveBars[i] = new Array();
            xPosForAboveBars[i] = new Array();
            yPosForABoveBars[i] = new Array();
        }
        if(numDatasets == 0) return;//error
        else if(numDatasets == 2){
            //for 2 categories: comparing spendings nad earnings so use green and red
            colourForThisList.push('#AECEA5');
            colourForThisList.push('#E6A0AA');
        }else{
            //for 1 || >2 categories: use randome pastel colours
            for (let i = 0 ; i < numDatasets;i++){
                colourForThisList.push(this.randomPastelColourCode());
            }
        }
        
        for(let i = 0; i < numDatasets; i++){
            keyComponentsArray[i] = listToDisplay.map(function (obj) {
                return obj[indices[i]];
            });
        }

        //Get the max and min values out of all of the key components arrays.
        //This is used for knowing the proportions of the canvas like the minimum pixel and maximum pixel and 
        //how it's supposed to fit inside
        let maxAmount;
        let minAmount;
        if(keyComponentsArray[0][0].constructor === Array){
            maxAmount=keyComponentsArray[0][0];
            minAmount=keyComponentsArray[0][0];
        }else{
            maxAmount=keyComponentsArray[0];
            minAmount=keyComponentsArray[0];
        }
        

        //get the max and mins interms of the amounts
        for(let j = 0; j < numDatasets; j++){
            for(let i = 0; i < keyComponentsArray[0].length; i++){
                if(maxAmount < keyComponentsArray[j][i])maxAmount = keyComponentsArray[j][i];
                if(minAmount > keyComponentsArray[j][i])minAmount = keyComponentsArray[j][i];            
            }
        }

        //get proportionalHeight:
        //kinda like the number of pixels to be in that section vertically
        let proportionalHeight = 0;
        if(maxAmount > 0 && minAmount < 0){
            proportionalHeight = maxAmount - minAmount;
        }else if(maxAmount > 0 && minAmount > 0){
            proportionalHeight = maxAmount;
        }else if(maxAmount < 0 && minAmount < 0){
            proportionalHeight = minAmount;
        }else{
            //error cuz maxAmount < 0 && minAmount > 0 which is impossible unless I majorily messed up...
            console.log("ERROR in maxAmount and minAmount");
        }

        //s.t. that the bar chart isn't growing all the way to the edge of the canvas
        proportionalHeight *= 1.1;

        //For some of the properties needed for drawing the bars such as the bar widths and unit height per dollar amount...
        //Note: take out the rightmost 170 for the legend
        let left_border = 10; //leave a left border
        let right_border = 170;
        let sectionWidth = (this.state.canvasWidth - right_border)/ keyComponentsArray[0].length;
        let sectionBorder = 0.05*sectionWidth;
        let unitHeight = this.state.canvasHeight /proportionalHeight;
        let barWidth = (sectionWidth/numDatasets)- (2*sectionBorder);
        let centerHoritzonalAxis = maxAmount * unitHeight;
        unitHeight *= 0.85;  //Make it slightly smaller than the canvas to look a bit better so it doesn't get cut off or anything
        for(let i = 0; i < numDatasets; i++){
            let currentSection = 0;
            listToDisplay.forEach(element => {
                //Draw the bar
                let x = (currentSection*sectionWidth+(barWidth * i)) + sectionBorder + left_border;
                let y;
                let barHeight = unitHeight * Math.abs(element[indices[i]]);
                if(element[indices[i]] > 0)y = centerHoritzonalAxis - barHeight;
                else y = centerHoritzonalAxis;
                this.context = this.barChartRef.current.getContext('2d');
                this.context.fillStyle = colourForThisList[i];
                this.context.fillRect(x, y, barWidth, barHeight);
    
                //Add the amount text s.t. it's right above the bars
                //Save this to the corresponding arrays and don't draw yet just in case if any of the adjacent
                //bars are taller and covers it
                let amountString = element[indices[i]];
                if(element[indices[i]] >= 0)amountString = '$' + amountString;
                else amountString = '-$' + Math.abs(amountString);
                
                let amount_x=x+(barWidth/2.1) +(0.5*left_border); 
                let amount_y=y*0.97;
                labelsForAboveBars[i].push(amountString);
                xPosForAboveBars[i].push(amount_x);
                yPosForABoveBars[i].push(amount_y);

    
                //Add the labelString just below the horizontal axis
                //ONLY add it for the time in this section
                
                if(i == numDatasets -1){
                    let labelString = element[labelIndex];
                    this.context.fillStyle = '#616A6A';
                    this.context.font = '15px Poppins, sans-serif';
                    this.context.textAlign = 'center';
                    let label_x = (currentSection*sectionWidth) + (sectionWidth / 2.5 )+left_border;
                    let label_y=centerHoritzonalAxis *1.05;
                    this.context.fillText(labelString,label_x, label_y);                    
                }
                currentSection+=1;
            });
        }

        //Add the bar labels
        labelsForAboveBars.reverse();
        xPosForAboveBars.reverse();
        yPosForABoveBars.reverse();
        for(let i = 0; i < numDatasets; i++){
            for(let j = 0; j < keyComponentsArray[0].length; j++){
                this.context = this.barChartRef.current.getContext('2d');
                this.context.fillStyle = '#616A6A';
                this.context.font = '15px Poppins, sans-serif';
                this.context.textAlign = 'center';
                this.context.fillText(labelsForAboveBars[i][j],xPosForAboveBars[i][j], yPosForABoveBars[i][j]);
            }
            
        }
        

        //Draw the horizontal line for the axis
        this.context = this.barChartRef.current.getContext('2d');
        this.context.beginPath();
        this.context.moveTo(0, centerHoritzonalAxis);
        this.context.lineTo(this.state.canvasWidth-right_border, centerHoritzonalAxis);
        this.context.stroke();


        //Add legends for the coloured bars
        for(let i = 0; i < numDatasets; i++){
            let legend_x = this.state.canvasWidth - 175;
            let legend_y = 30 + (i * 30);    //20 offset to the right and 20 for height offset
            this.context.fillStyle = colourForThisList[i];
            this.context.fillRect(legend_x, legend_y, 10, 10);
            this.context.fillStyle = '#616A6A';
            this.context.font = '15px Poppins, sans-serif';
            this.context.textAlign = 'left';
            this.context.fillText(indices[i],legend_x + 13, legend_y+10, 175);
        }
    }

  

    componentDidMount() {
        this.drawBars();
    }


    componentDidUpdate(){
        this.context = this.barChartRef.current.getContext('2d');
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        const context = this.context;
        //clear canvas
        context.clearRect(0, 0, rect.width, rect.height);
        context.beginPath();
        //redraw
        this.drawBars();
    }
    
    render() {
        return (
          <canvas id = "barChartCanvas" ref={this.barChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight}/>
        )
    }
}

export default BarChart