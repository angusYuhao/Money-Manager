//Tutorials followed:
//https://stackoverflow.com/questions/33924150/how-to-access-canvas-context-in-react
//https://stackoverflow.com/questions/27736288/how-to-fill-the-whole-canvas-with-specific-color
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
//https://gist.github.com/prof3ssorSt3v3/7f16fe9397c013d364f2d4484cad3ca8
//https://stackoverflow.com/questions/30790010/html-canvas-hover-text
//https://stackoverflow.com/questions/6270785/how-to-determine-whether-a-point-x-y-is-contained-within-an-arc-section-of-a-c
//https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
//https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling
//https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript


import React, { useRef, useEffect, useReducer } from 'react'

class PieChart extends React.Component {
    state = {
        canvasWidth: 600,
        canvasHeight: 600,
        slices: [],
        radius: 120
    }

    constructor(props) {
        super(props);
      
        this.pieChartRef = React.createRef();
    }

    randomPastelColourCode = () => {
        return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (80 + 10 * Math.random()) + '%)'
    }

    drawSlices = () => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
        const {listToDisplay} = this.props
        let startAngle = 0; 
        let radius = this.state.radius;
        let cx = this.state.canvasWidth/2;
        let cy = this.state.canvasHeight/2;
        let total = listToDisplay.reduce( (ttl, stock) => {
            return ttl + (stock.bookCost)
        }, 0);

        listToDisplay.forEach(element => {
            //here the slices are draw backwards...(clockwise) so makesure to push into the list properly
            console.log("Drawing slice")
            console.log(element.name)
            this.context.lineWidth = 3;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = this.randomPastelColourCode();
            let sliceColour = this.context.fillStyle;
            this.context.beginPath();
            
            // draw the pie wedges
            let endAngle = ((element.bookCost / total) * Math.PI * 2) + startAngle;
            this.context.moveTo(cx, cy);
            this.context.arc(cx, cy, radius, startAngle, endAngle);
            this.context.lineTo(cx, cy);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            
            // add the labels
            this.context.beginPath();
            this.context.font = '20px Helvetica, Calibri';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'rebeccapurple';
            // 1.5 * radius is the length of the Hypotenuse
            let theta = (startAngle + endAngle) / 2;
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;

            //!!!Ian: name is the name of the stock category
            this.context.fillText(element.name, deltaX+cx, deltaY+cy);
            let percentage = Math.round(+((element.bookCost*100)/total));
            this.context.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
            this.context.closePath();
            

            //store the slice information
            this.state.slices.push({ 
                    "name" : element.name,
                    "colour" : sliceColour,
                    "startAngle" : (2*Math.PI) - endAngle,    //since arc draws the slice backwards in clockwise fasion
                    "endAngle": (2*Math.PI) - startAngle,
                    "drawStartAngle": startAngle,
                    "drawEndAngle": endAngle,
                    "bookCost": element.bookCost
            });
            startAngle = endAngle;
        });
        console.log(this.state.slices)
    }

    drawAccentedSlice = (slice, width) => {
        const {listToDisplay} = this.props
        let radius = this.state.radius;
        let cx = this.state.canvasWidth/2;
        let cy = this.state.canvasHeight/2;
        let total = listToDisplay.reduce( (ttl, stock) => {
            return ttl + (stock.bookCost)
        }, 0);
        console.log("Accenting slice")
        console.log(slice.name)
        this.context.lineWidth = width;
        this.context.strokeStyle = '#fafafa';
        this.context.fillStyle = slice.colour;
        this.context.beginPath();
        
        // draw the pie wedges
        
        this.context.moveTo(cx, cy);
        this.context.arc(cx, cy, radius, slice.drawStartAngle, slice.drawEndAngle);
        this.context.lineTo(cx, cy);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        
        // add the labels
        if(width > 3){

        
        this.context.beginPath();
        this.context.font = '18px Helvetica, Calibri';
        this.context.textAlign = 'center';
        this.context.fillStyle = 'rebeccapurple';
        // 1.5 * radius is the length of the Hypotenuse
        let theta = (slice.drawStartAngle + slice.drawEndAngle) / 2;
        let deltaY = Math.sin(theta) * 1.5 * radius;
        let deltaX = Math.cos(theta) * 1.5 * radius;

        //!!!Ian: name is the name of the stock category
        this.context.fillText("$" + slice.bookCost, deltaX/2+cx, deltaY/2+cy);
        // let percentage = Math.round(+((slice.bookCost*100)/total));
        this.context.closePath();
        }
    }

    componentDidMount() {
        console.log("Did mount!")
        this.context = this.pieChartRef.current.getContext('2d');
        let elem = document.getElementById('pieChartCanvas');

        const {listToDisplay} = this.props
        console.log(listToDisplay)
        this.drawSlices();

        //NOTE!!!!!! get bounding client rect gets the positions according to the window not the document!!!
        let rect = elem.getBoundingClientRect();
        
        //add event listeners...I had to add it to a component so I used this one
        document.addEventListener('mousewheel', (e) => {
            rect = elem.getBoundingClientRect();
            //console.log(rect);
        })

        document.addEventListener('mousemove', (e) => {
    
            let mouseX=parseInt(e.clientX);
            let mouseY=parseInt(e.clientY);
            let cx = this.state.canvasWidth/2;
            let cy = this.state.canvasHeight/2;
            //mouse is relative to the window, rect is relative to the window
            //cx and cy are fixed
            //relativeX and relative Y are the distances from the center of the "pie"(no +ve or -ve signs)
            let relativeX = 0;
            let relativeY = 0;
            let angle = 0;
      
            // quadrant I & II:
            if(mouseY > rect.y && mouseY < (rect.y + cy)){
                relativeY = (cy + rect.y ) - mouseY;
                //quadrant I:
                if(mouseX > (rect.x + cx) && mouseX < rect.x + (2*cx)){
                    relativeX = mouseX - (cx + rect.x);
                    angle = Math.atan(relativeY/relativeX);
                    // console.log(relativeX)
                    // console.log(relativeY)
                    // console.log("quad I")
                    // console.log(angle)
                //quadrant II:
                }else if(mouseX > rect.x && mouseX < (rect.x + cx)){
                    relativeX = (cx + rect.x) - mouseX;
                    angle = Math.PI - Math.atan(relativeY/relativeX);
                    // console.log(relativeX)
                    // console.log(relativeY)
                    // console.log("quad II")
                    // console.log(angle)
                }
            //quadrant III & IV:
            }else if (mouseY > cy + rect.y && mouseY < rect.y + (2*cy)){
                relativeY = mouseY - (cy + rect.y);
                //quadrant IV:
                if(mouseX > (rect.x + cx) && mouseX < rect.x + (2*cx)){
                    relativeX = mouseX - (cx + rect.x);
                    angle = (2*Math.PI) - Math.atan(relativeY/relativeX);
                    // console.log(relativeX)
                    // console.log(relativeY)
                    // console.log("quad IV")
                    // console.log(angle)
                //quadrant III:
                }else if(mouseX > rect.x && mouseX < (rect.x + cx)){
                    relativeX = (cx + rect.x) - mouseX;
                    angle = Math.PI + Math.atan(relativeY/relativeX);
                    // console.log(relativeX)
                    // console.log(relativeY)
                    // console.log("quad III")
                    // console.log(angle)
                }
            }

            //console.log(angle)
            let distanceOk = false;
            let distance = Math.sqrt( (relativeX * relativeX ) +  ( relativeY * relativeY));
            if(distance < this.state.radius){
                distanceOk = true;
                // console.log(distance)
                //console.log("Distance ok")
            }

            for(let i=0;i<this.state.slices.length;i++){
                let s=this.state.slices[i];
                //check if the mouse angle matches with this slice
                let angleOk = false;
                if(s.startAngle < angle && angle < s.endAngle){
                    //console.log("Angle ok")
                    //console.log(s.name)
                    angleOk = true;

                }else continue;
             
                if(angleOk && distanceOk){
                    console.log(s.name)
                    //STILL NEED TO DO SOME KIND OF UPDATE HERE
                    this.drawAccentedSlice(s, 8);
                    setTimeout(this.drawAccentedSlice, 3000, s, 3);
                }
            }
        }); 
    }

    componentDidUpdate() {
        console.log("Updated!")
        
        this.context = this.pieChartRef.current.getContext('2d');
        let elem = document.getElementById('pieChartCanvas');
        let rect = elem.getBoundingClientRect();
        
        const context = this.context;

        //clear canvas
        context.clearRect(0, 0, rect.width, rect.height);
        context.beginPath();

        //clear slices
        this.state.slices = [];
        
        this.drawSlices();//redraw
    }
    
    render() {
        return (
          <canvas id = "pieChartCanvas" ref={this.pieChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight} />
        )
    }
}

export default PieChart