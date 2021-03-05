
import React, { useState, useEffect, useRef } from 'react';


export function draw(ctx, data, total, slice, cx, cy, startAngle, radius){
    //set the styles before beginPath
    ctx.fillStyle = randomHexColorCode();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    
    // draw the pie slices
    let endAngle = ((slice.amount / total) * Math.PI * 2) + startAngle;
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.lineTo(cx, cy);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    
    // add the labels
    ctx.beginPath();
    ctx.font = '20px Helvetica, Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rebeccapurple';
    // midpoint between the two angles
    // 1.5 * radius is the length of the Hypotenuse
    let theta = (startAngle + endAngle) / 2;
    let deltaY = Math.sin(theta) * 1.5 * radius;
    let deltaX = Math.cos(theta) * 1.5 * radius;
    ctx.fillText(slice.name, deltaX+cx, deltaY+cy);
    let percentage = Math.round(+(slice.amount*100/total));
    ctx.fillText(percentage + "%", (deltaX*1.3)+cx, (deltaY*1.4)+cy);
    ctx.closePath();
    startAngle = endAngle;
}