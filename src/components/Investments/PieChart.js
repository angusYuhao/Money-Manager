//Tutorials followed:
//https://stackoverflow.com/questions/33924150/how-to-access-canvas-context-in-react
//https://stackoverflow.com/questions/27736288/how-to-fill-the-whole-canvas-with-specific-color
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
//https://gist.github.com/prof3ssorSt3v3/7f16fe9397c013d364f2d4484cad3ca8

import React, { useRef, useEffect } from 'react'

class Canvas extends React.Component {
    
    constructor(props) {
        super(props);
        // this.state = {
        //     height: 500,
        //     width: 500
        // }
        this.width = 0;
        this.height = 0;
        this.pieChartRef = React.createRef();

    }
    
    componentDidMount() {
        console.log(`${this.pieChartRef.width}, ${this.pieChartRef.height}`);
        // const height = this.divElement.clientHeight;
        // this.setState({ height });
        // const width = this.divElement.clientWidth;
        // this.setState({ width });

        const {stockList}= this.props
        console.log(stockList)
        this.context = this.pieChartRef.current.getContext('2d');
    //     test example:
    //    this.context.fillStyle = '#000000'
    //    this.context.beginPath()
    //    this.context.arc(50, 100, 20, 0, 2*Math.PI)
    //    this.context.fill()
        let total = stockList.reduce( (ttl, stock) => {
            return ttl + (stock.avgCost * stock.quantity)
        }, 0);
        console.log("total")
        console.log(total)
        let startAngle = 0; 
        let radius = 100;
        let cx = 200;
        let cy = 200;
        const randomHexColorCode = () => {
            return "#" + Math.random().toString(16).slice(2, 8)
        };

        stockList.forEach(element => {
            console.log("Drawing slice")
        
            // this.context.fillStyle = '#000000';
            // this.context.beginPath();
            // this.context.arc(50, 100, 20, 0, 2*Math.PI)
            // this.context.fill();


            this.context.lineWidth = 1;
            this.context.strokeStyle = '#fafafa';
            this.context.fillStyle = randomHexColorCode();
            this.context.beginPath();
            
            // draw the pie wedges
            let endAngle = (((element.avgCost * element.quantity) / total) * Math.PI * 2) + startAngle;
            this.context.moveTo(cx, cy);
            this.context.arc(cx, cy, radius, startAngle, endAngle);
            this.context.lineTo(cx, cy);
            this.context.fill();
            this.context.stroke();
            this.context.closePath();
            
            // // add the labels
            this.context.beginPath();
            this.context.font = '20px Helvetica, Calibri';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'rebeccapurple';
            // midpoint between the two angles
            // 1.5 * radius is the length of the Hypotenuse
            let theta = (startAngle + endAngle) / 2;
            let deltaY = Math.sin(theta) * 1.5 * radius;
            let deltaX = Math.cos(theta) * 1.5 * radius;
            this.context.fillText(element.name, deltaX+cx, deltaY+cy);
            this.context.closePath();
            startAngle = endAngle;
        });

        
    }
    
    render() {
        

        return (
          <canvas ref={this.pieChartRef} width = {600} height = {600}/>
       )
    }
}

export default Canvas