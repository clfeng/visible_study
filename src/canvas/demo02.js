/*

SVG 属于声明式绘图系统

*/
import './demo02.css';
import * as d3 from "d3";
import data from './data.json';


const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const regions = d3.hierarchy(data).sum(d => 1).sort((a, b) => b.value - a.value);
const pack = d3.pack().size([1600, 1600]).padding(3);
const root = pack(regions);

const TAU = 2 * Math.PI;

function draw (ctx, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white'} = {}) {
    const children = node.children;
    const { x, y, r } = node;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();

    if (children) {
        for (let i = 0; i < children.length; i++) {
            draw(ctx, children[i]);
        }
    } else {
        const name = node.data.name;
        ctx.fillStyle = textColor;
        ctx.font = '1.5rem Arial';
        ctx.fillText(name, x, y);
    }
}

draw(context, root);

