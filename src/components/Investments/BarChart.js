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
        const {listToDisplay} = this.props
        
        
        let total = listToDisplay.reduce( (ttl, stock) => {
            return ttl + (stock.bookCost)
        }, 0);

        //get the max and min gain loss stocks
        const maxAmount = listToDisplay.reduce(function(prev, current) {
            return (prev.gainLoss > current.gainLoss) ? prev : current
        })
        console.log(maxAmount)

        const minAmount = listToDisplay.reduce(function(prev, current) {
            return (prev.gainLoss < current.gainLoss) ? prev : current
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
        
        
        

        // listToDisplay.forEach(element => {
        //     //here the slices are draw backwards...(clockwise) so makesure to push into the list properly
           
        //     this.context.lineWidth = 3;
        //     this.context.strokeStyle = '#fafafa';
        //     this.context.fillStyle = this.randomPastelColourCode();
        //     let sliceColour = this.context.fillStyle;
        //     this.context.beginPath();
            
        //     // draw the pie wedges
        //     let endAngle = ((element.bookCost / total) * Math.PI * 2) + startAngle;
        //     this.context.moveTo(cx, cy);
        //     this.context.arc(cx, cy, radius, startAngle, endAngle);
        //     this.context.lineTo(cx, cy);
        //     this.context.fill();
        //     this.context.stroke();
        //     this.context.closePath();
            
        //     // add the labels
        //     this.context.beginPath();
        //     this.context.font = '20px Helvetica, Calibri';
        //     this.context.textAlign = 'center';
        //     this.context.fillStyle = 'rebeccapurple';
        //     // 1.5 * radius is the length of the Hypotenuse
        //     let theta = (startAngle + endAngle) / 2.0;
        //     let deltaY = Math.sin(theta) * 1.5 * radius;
        //     let deltaX = Math.cos(theta) * 1.5 * radius;

        //     //point to label
        //     this.context.strokeStyle = 'rebeccapurple';
        //     this.context.moveTo(cx+deltaX/1.65, cy+deltaY/1.65);
        //     this.context.lineTo((4*deltaX/5)+cx, (4*deltaY/5)+cy);
        //     this.context.stroke();

        //     //!!!Ian: name is the name of the stock category
        //     this.context.fillText(element.name, deltaX+cx, deltaY+cy);
        //     let percentage = Math.round(+((element.bookCost*100)/total));
        //     this.context.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
        //     this.context.closePath();
            

        //     //store the slice information
        //     this.state.slices.push({ 
        //             "name" : element.name,
        //             "colour" : sliceColour,
        //             "startAngle" : (2.0*Math.PI) - endAngle,    //since arc draws the slice backwards in clockwise fasion
        //             "endAngle": (2.0*Math.PI) - startAngle,
        //             "drawStartAngle": startAngle,
        //             "drawEndAngle": endAngle,
        //             "bookCost": element.bookCost
        //     });
        //     startAngle = endAngle;
        // });
        //console.log(this.state.slices)
    }

    // drawAccentedSlice = (slice, accented) => {
    //     let radius = parseFloat(this.state.radius);
    //     let cx = parseFloat(this.state.canvasWidth/2);
    //     let cy = parseFloat(this.state.canvasHeight/2);
    //     this.context.strokeStyle = '#fafafa';
    //     this.context.fillStyle = slice.colour;
        
    //     this.context.beginPath();
        
    //     // draw the pie wedges
    //     this.context.moveTo(cx, cy);
    //     this.context.arc(cx, cy, radius, slice.drawStartAngle, slice.drawEndAngle);
    //     this.context.lineTo(cx, cy);
    //     this.context.fill();
    //     this.context.stroke();
    //     this.context.closePath();

    //     this.context.beginPath();  
    //     this.context.font = '20px Helvetica, Calibri';
    //     this.context.textAlign = 'center';
    //     this.context.fillStyle = 'rebeccapurple';
    //     this.context.strokeStyle = 'rebeccapurple';

    //     let theta = (slice.drawStartAngle + slice.drawEndAngle) / 2.0;
    //     let deltaY = parseFloat(Math.sin(theta) * 1.5 * radius);
    //     let deltaX = parseFloat(Math.cos(theta) * 1.5 * radius);
        

        
    //     // add the labels
    //     if(accented == 1){
    //         // this.context.moveTo(cx+deltaX/1.65, cy+deltaY/1.65);
    //         // this.context.lineTo((4.0*deltaX/5)+cx, (4.0*deltaY/5)+cy);
    //         // this.context.stroke();

    //         //!!!Ian: name is the name of the stock category
    //         this.context.fillText("$" + slice.bookCost, deltaX/2+cx, deltaY/2+cy);
    //         this.context.closePath();
    //     }else{
    //         this.context.translate(0.05, 0.05);
    //         this.context.moveTo(parseFloat(cx+deltaX/1.65), parseFloat(cy+deltaY/1.65));
    //         this.context.lineTo(parseFloat((4.0*deltaX/5)+cx), parseFloat((4.0*deltaY/5)+cy));
    //         this.context.lineWidth = 3;
    //         this.context.stroke();
    //         this.context.closePath();
    //         this.context.translate(-0.05, -0.05);
    //     }
        
    // }

    componentDidMount() {
        console.log("Did mount!")
        this.context = this.barChartRef.current.getContext('2d');
        let elem = document.getElementById('barChartCanvas');
        let rect = elem.getBoundingClientRect();
        console.log(rect);
        this.drawBars();
        
        // this.context = this.pieChartRef.current.getContext('2d');
        // let elem = document.getElementById('pieChartCanvas');

        // const {listToDisplay} = this.props
        // console.log(listToDisplay)
        // this.drawSlices();

        // //NOTE!!!!!! get bounding client rect gets the positions according to the window not the document!!!
        // let rect = elem.getBoundingClientRect();
        
        //add event listeners...I had to add it to a component so I used this one
        // document.addEventListener('mousewheel', (e) => {
        //     rect = elem.getBoundingClientRect();
        // })

        // document.addEventListener('mousemove', (e) => {
    
        //     let mouseX=parseInt(e.clientX);
        //     let mouseY=parseInt(e.clientY);
        //     let cx = this.state.canvasWidth/2;
        //     let cy = this.state.canvasHeight/2;
        //     //mouse is relative to the window, rect is relative to the window
        //     //cx and cy are fixed
        //     //relativeX and relative Y are the distances from the center of the "pie"(no +ve or -ve signs)
        //     let relativeX = 0;
        //     let relativeY = 0;
        //     let angle = 0;
      
        //     // quadrant I & II:
        //     if(mouseY > rect.y && mouseY < (rect.y + cy)){
        //         relativeY = (cy + rect.y ) - mouseY;
        //         //quadrant I:
        //         if(mouseX > (rect.x + cx) && mouseX < rect.x + (2*cx)){
        //             relativeX = mouseX - (cx + rect.x);
        //             angle = Math.atan(relativeY/relativeX);
        //             // console.log(relativeX)
        //             // console.log(relativeY)
        //             // console.log("quad I")
        //             // console.log(angle)
        //         //quadrant II:
        //         }else if(mouseX > rect.x && mouseX < (rect.x + cx)){
        //             relativeX = (cx + rect.x) - mouseX;
        //             angle = Math.PI - Math.atan(relativeY/relativeX);
        //             // console.log(relativeX)
        //             // console.log(relativeY)
        //             // console.log("quad II")
        //             // console.log(angle)
        //         }
        //     //quadrant III & IV:
        //     }else if (mouseY > cy + rect.y && mouseY < rect.y + (2*cy)){
        //         relativeY = mouseY - (cy + rect.y);
        //         //quadrant IV:
        //         if(mouseX > (rect.x + cx) && mouseX < rect.x + (2*cx)){
        //             relativeX = mouseX - (cx + rect.x);
        //             angle = (2*Math.PI) - Math.atan(relativeY/relativeX);
        //             // console.log(relativeX)
        //             // console.log(relativeY)
        //             // console.log("quad IV")
        //             // console.log(angle)
        //         //quadrant III:
        //         }else if(mouseX > rect.x && mouseX < (rect.x + cx)){
        //             relativeX = (cx + rect.x) - mouseX;
        //             angle = Math.PI + Math.atan(relativeY/relativeX);
        //             // console.log(relativeX)
        //             // console.log(relativeY)
        //             // console.log("quad III")
        //             // console.log(angle)
        //         }
        //     }

        //     //console.log(angle)
        //     let distanceOk = false;
        //     let distance = Math.sqrt( (relativeX * relativeX ) +  ( relativeY * relativeY));
        //     if(distance < this.state.radius){
        //         distanceOk = true;
        //         // console.log(distance)
        //         //console.log("Distance ok")
        //     }

        //     for(let i=0;i<this.state.slices.length;i++){
        //         let s=this.state.slices[i];
        //         //check if the mouse angle matches with this slice
        //         let angleOk = false;
        //         if(s.startAngle < angle && angle < s.endAngle){
        //             angleOk = true;
        //             if(distanceOk){
        //                 this.drawAccentedSlice(s, 1);
        //                 setTimeout(this.drawAccentedSlice, 1000, s, 0);
        //             }
        //         }else continue;
        //     }
        // }); 
    }

    // componentDidUpdate() {        
    //     this.context = this.pieChartRef.current.getContext('2d');
    //     let elem = document.getElementById('pieChartCanvas');
    //     let rect = elem.getBoundingClientRect();
        
    //     const context = this.context;

    //     //clear canvas
    //     context.clearRect(0, 0, rect.width, rect.height);
    //     context.beginPath();

    //     //clear slices
    //     this.state.slices = [];
        
    //     this.drawSlices();//redraw
    // }
    
    render() {
        return (
          <canvas id = "barChartCanvas" ref={this.barChartRef} width = "1200" height = "600" />
        )
    }
}

export default BarChart