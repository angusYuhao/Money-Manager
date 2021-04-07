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

   

    drawBars = () => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
        const {index1, index2, labelIndex, listToDisplay,numDatasets} = this.props
        let colourForThisList1 = '';
        let colourForThisList2 = '';
        if(numDatasets == 0) return;
        else if(numDatasets == 1)colourForThisList1 = '#A986CE';
        else if(numDatasets == 2){
            colourForThisList1 = '#AECEA5';
            colourForThisList2 = '#E6A0AA';
        }

        //get an array for only the components, such as gain/loss or spendings needed 
        let keyComponentsArray1 =[];
        let keyComponentsArray2 =[];
        keyComponentsArray1 = listToDisplay.map(function (obj) {
            return obj[index1];
        });

        if(numDatasets == 2){
            keyComponentsArray2 = listToDisplay.map(function (obj) {
                return obj[index2];
            });
        }

        //Get the max and min values out of both of the arrays.
        //This is used for knowing the proportions of the canvas
        let maxAmount=keyComponentsArray1[0];
        let minAmount=keyComponentsArray1[0];

        for(let i = 0; i < keyComponentsArray1.length; i++){
            if(maxAmount < keyComponentsArray1[i])maxAmount = keyComponentsArray1[i];
            if(minAmount > keyComponentsArray1[i])minAmount = keyComponentsArray1[i];
        }

        for(let i = 0; i < keyComponentsArray2.length; i++){
            if(maxAmount < keyComponentsArray2[i])maxAmount = keyComponentsArray2[i];
            if(minAmount > keyComponentsArray2[i])minAmount = keyComponentsArray2[i];
        }

        

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
       

        //For some of the properties needed for drawing the bars such as the bar widths and unit height per dollar amount...
        let sectionWidth = this.state.canvasWidth / keyComponentsArray1.length;
        let sectionBorder = 0.05*sectionWidth;
        let unitHeight = this.state.canvasHeight /proportionalHeight;
        
        let barWidth = (sectionWidth/numDatasets)- (2*sectionBorder);
        let centerHoritzonalAxis = maxAmount * unitHeight;
        unitHeight *= 0.85;  //Make it slightly smaller than the canvas to look a bit better
        console.log(centerHoritzonalAxis);
        console.log(maxAmount * (this.state.canvasHeight /proportionalHeight));
        
        let currentSection = 0;

        
        listToDisplay.forEach(element => {
            //draw bar
            let x1 = (currentSection*sectionWidth) + sectionBorder;
            let y1;
            let barHeight = unitHeight * Math.abs(element[index1]);
            if(element[index1] > 0)y1 = centerHoritzonalAxis - barHeight;
            else y1 = centerHoritzonalAxis;
            this.context.fillStyle = colourForThisList1;
            this.context.fillRect(x1, y1, barWidth, barHeight);

            //Add the amount s.t. it's right above the bars
            let amountString = element[index1];
            if(element[index1] >= 0)amountString = '$' + amountString;
            else amountString = '-$' + Math.abs(amountString);
            this.context.fillStyle = '#616A6A';
            this.context.font = '20px Poppins, sans-serif';
            this.context.textAlign = 'center';
            let amount_x=x1+(barWidth/2.1); 
            let amount_y=y1*0.97;
            this.context.fillText(amountString,amount_x, amount_y);

            //Add the labelString just below the horizontal axis
            if(numDatasets == 1){
                let labelString = element[labelIndex];
                this.context.fillStyle = '#616A6A';
                this.context.font = '20px Poppins, sans-serif';
                this.context.textAlign = 'center';
                let label_x=amount_x; 
                let label_y=centerHoritzonalAxis *1.05;
                this.context.fillText(labelString,label_x, label_y);
            }
            currentSection+=1;
            //Draw the horizontal line for the axis
            this.context.beginPath();
            this.context.moveTo(0, centerHoritzonalAxis);
            this.context.lineTo(this.state.canvasWidth, centerHoritzonalAxis);
            this.context.stroke();
        });

        if(numDatasets == 2){
            currentSection = 0;
            
            listToDisplay.forEach(element => {
                //draw bar
               
                let x2 = (currentSection*sectionWidth) + barWidth + sectionBorder;
                let y2;
                let barHeight = unitHeight * Math.abs(element[index2]);
                if(element[index2] > 0)y2 = centerHoritzonalAxis - barHeight;
                else y2 = centerHoritzonalAxis;
                this.context.fillStyle = colourForThisList2;
                this.context.fillRect(x2, y2, barWidth, barHeight);

                //Add the amount s.t. it's right above the bars
                let amountString = element[index2];
                if(element[index2] >= 0)amountString = '$' + amountString;
                else amountString = '-$' + Math.abs(amountString);
                this.context.fillStyle = '#616A6A';
                this.context.font = '20px Poppins, sans-serif';
                this.context.textAlign = 'center';
                let amount_x=x2+(barWidth/2.1); 
                let amount_y=y2*0.97;
                this.context.fillText(amountString,amount_x, amount_y);

                 //Add the labelString just below the horizontal axis
                let labelString = element[labelIndex];
                this.context.fillStyle = '#616A6A';
                this.context.font = '20px Poppins, sans-serif';
                this.context.textAlign = 'center';
                let label_x=amount_x-(barWidth/2); 
                let label_y=centerHoritzonalAxis *1.05;
                this.context.fillText(labelString,label_x, label_y);
                currentSection+=1;
                //Draw the horizontal line for the axis
                this.context.beginPath();
                this.context.moveTo(0, centerHoritzonalAxis);
                this.context.lineTo(this.state.canvasWidth, centerHoritzonalAxis);
                this.context.stroke();
            });
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

        //clear bars
        //this.state.slices = [];

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