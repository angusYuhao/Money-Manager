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
        radius: 125,
    }

    constructor(props) {
        super(props);
        const {pieChartSize, pieChartRadius} = this.props;
        this.state.canvasHeight = pieChartSize;
        this.state.canvasWidth = pieChartSize;
        this.state.radius = pieChartRadius
        this.pieChartRef = React.createRef();
    }

    randomPastelColourCode = () => {
        return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (80 + 10 * Math.random()) + '%)'
    }

    drawSlices = () => {
        //!!!Ian: bookCost is the total amount spend on that stock/in that category
       
        const { listToDisplay} = this.props
        //console.log(listToDisplay);

        let startAngle = 0; 
        let radius = this.state.radius;
        let cx = this.state.canvasWidth/2;
        let cy = this.state.canvasHeight/2;
        let total = listToDisplay.reduce( (ttl, stock) => {
            //console.log(stock)
            //return ttl + (stock.bookCost)
            return ttl + Math.round( (parseFloat(stock["Book Cost"])  * 100)/ 100 )
        }, 0);
        //console.log(total)

        listToDisplay.forEach(element => {
            //here the slices are draw backwards...(clockwise) so makesure to push into the list properly
           
            this.context.lineWidth = 3;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = this.randomPastelColourCode();
            let sliceColour = this.context.fillStyle;
            this.context.beginPath();
            
            // draw the pie wedges
            //let endAngle = ((element.bookCost / total) * Math.PI * 2) + startAngle;
            let actualBookCost = parseFloat(element["Book Cost"]);
            actualBookCost = Math.round(actualBookCost * 100) / 100;

            let endAngle = ((actualBookCost/ total) * Math.PI * 2) + startAngle;
            this.context.moveTo(cx, cy);
            this.context.arc(cx, cy, radius, startAngle, endAngle);
            this.context.lineTo(cx, cy);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            
            // add the labels
            this.context.beginPath();
            this.context.font = '20px Poppins, sans-serif';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'rebeccapurple';
            // 1.5 * radius is the length of the Hypotenuse
            let theta = (startAngle + endAngle) / 2.0;
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;

            //point to label
            this.context.strokeStyle = 'rebeccapurple';
            this.context.moveTo(cx+deltaX/1.65, cy+deltaY/1.65);
            this.context.lineTo((4*deltaX/5)+cx, (4*deltaY/5)+cy);
            this.context.stroke();

            //!!!Ian: name is the name of the stock category
            // let percentage = Math.round(+((element.bookCost*100)/total));
            let percentage = Math.round(+((actualBookCost*100)/total));

            this.context.fillText(element.Name + " (" + percentage + "%)", deltaX+cx, deltaY+cy);
            
            //this.context.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
            this.context.closePath();
            
            //console.log(actualBookCost)
            //store the slice information
            this.state.slices.push({ 
                    "name" : element.Name,
                    "colour" : sliceColour,
                    "startAngle" : (2.0*Math.PI) - endAngle,    //since arc draws the slice backwards in clockwise fasion
                    "endAngle": (2.0*Math.PI) - startAngle,
                    "drawStartAngle": startAngle,
                    "drawEndAngle": endAngle,
                    "bookCost": actualBookCost
            });
            startAngle = endAngle;
        });
        //console.log(this.state.slices)
    }

    drawAccentedSlice = (slice, accented) => {
        const { listToDisplay} = this.props
        let radius = parseFloat(this.state.radius);
        let cx = parseFloat(this.state.canvasWidth/2);
        let cy = parseFloat(this.state.canvasHeight/2);
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

        this.context.beginPath();  
        this.context.font = '20px Poppins, sans-serif';
        this.context.textAlign = 'center';
        this.context.fillStyle = 'rebeccapurple';
        this.context.strokeStyle = 'rebeccapurple';

        let theta = (slice.drawStartAngle + slice.drawEndAngle) / 2.0;
        let deltaY = parseFloat(Math.sin(theta) * 1.5 * radius);
        let deltaX = parseFloat(Math.cos(theta) * 1.5 * radius);
        
        let total = listToDisplay.reduce( (ttl, stock) => {
            //console.log(stock)
            //return ttl + (stock.bookCost)
            return ttl + Math.round( (parseFloat(stock["Book Cost"])  * 100)/ 100 )
        }, 0);
      

        let percentage = Math.round(+((slice.bookCost*100)/total));
        this.context.fillText(slice.name + " (" + percentage + "%)", deltaX+cx, deltaY+cy);
        this.context.stroke();
        this.context.moveTo(cx+deltaX/1.65, cy+deltaY/1.65);
        this.context.lineTo((4*deltaX/5)+cx, (4*deltaY/5)+cy);
        this.context.stroke();

        // add the labels
        if(accented == 1){
            // this.context.moveTo(cx+deltaX/1.65, cy+deltaY/1.65);
            // this.context.lineTo((4.0*deltaX/5)+cx, (4.0*deltaY/5)+cy);
            // this.context.stroke();


            this.context.fillText("$" + slice.bookCost, deltaX/2+cx, deltaY/2+cy);

            this.context.closePath();
        }else{
            this.context.moveTo(parseFloat(cx+deltaX/1.65), parseFloat(cy+deltaY/1.65));
            this.context.lineTo(parseFloat((4.0*deltaX/5)+cx), parseFloat((4.0*deltaY/5)+cy));
            this.context.lineWidth = 3;
            this.context.stroke();
            this.context.closePath();
        } 
    }

    redraw = () => {
        // this.context = this.pieChartRef.current.getContext('2d');
        // let elem = document.getElementById('pieChartCanvas');
        // let rect = elem.getBoundingClientRect();
        
        // const context = this.context;

        // //clear canvas
        // //context.clearRect(0, 0, elem.width, elem.height);
        // context.clearRect(0, 0, rect.width, rect.height);

        // context.beginPath();

        for(let i = 0; i < this.state.slices.length; i++){
            this.drawAccentedSlice(this.state.slices[i],0);
        }
    }

    componentDidMount() {

        //console.log("Did mount!")
        this.context = this.pieChartRef.current.getContext('2d');
        let elem = document.getElementById('pieChartCanvas');

        const {listToDisplay} = this.props
        //console.log(listToDisplay)
        this.drawSlices();

        //NOTE!!!!!! get bounding client rect gets the positions according to the window not the document!!!
        let rect = elem.getBoundingClientRect();
        
        //add event listeners...I had to add it to a component so I used this one
        document.addEventListener('mousewheel', (e) => {
            rect = elem.getBoundingClientRect();
        })

        document.addEventListener('mousemove', (e) => {
    
            let mouseX=parseInt(e.clientX);
            let mouseY=parseInt(e.clientY);
            let cx = this.state.canvasWidth/2;
            let cy = this.state.canvasHeight/2;
            //mouse is relative to the window, rect is relative to the window
            //cx and cy are fixed
            //relativeX and relative Y are the distances from the center of the "pie"(no +ve or -ve signs)
            let relativeX;
            let relativeY;
            let angle;
      
            // quadrant I & II:
            if(mouseY > rect.y && mouseY < (rect.y + cy)){
                relativeY = (cy + rect.y ) - mouseY;
                //quadrant I:
                if(mouseX > (rect.x + cx) && mouseX < rect.x + (2*cx)){
                    // console.log(mouseX);
                    // console.log(rect.x + cx);
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
                // console.log("Distance ok")
            }
            //console.log(this.state.slices)
            for(let i=0;i<this.state.slices.length;i++){
                let s=this.state.slices[i];
                //check if the mouse angle matches with this slice
                if(s.startAngle < angle && angle < s.endAngle){
                    
                    if(distanceOk){
                        
                        // const context = this.context;
                        // context.clearRect(0, 0, rect.width, rect.height);

                        // context.beginPath();
                        // //clear canvas
                        //context.clearRect(0, 0, elem.width, elem.height);
                       

                        this.drawAccentedSlice(s, 1);
                        
                        //setTimeout(this.drawAccentedSlice, 500, s, 0);
                        setTimeout(this.redraw, 500);

                        //this.drawAccentedSlice(s, 0);
                        distanceOk = false;
                    }
                }else continue;
            }
        }); 
    }

    componentDidUpdate(prevProps, prevState) {        
        this.context = this.pieChartRef.current.getContext('2d');
        let elem = document.getElementById('pieChartCanvas');
        let rect = elem.getBoundingClientRect();
        
        const context = this.context;

        //clear canvas
        //context.clearRect(0, 0, elem.width, elem.height);
        context.clearRect(0, 0, rect.width, rect.height);

        context.beginPath();

        //clear slices
        this.state.slices = [];
        
        // if(this.state != prevState)
        this.drawSlices();//redraw
    }
    
    render() {
        return (
          <canvas id = "pieChartCanvas" ref={this.pieChartRef} width = {this.state.canvasWidth} height = {this.state.canvasHeight} />
        )
    }
}

export default PieChart