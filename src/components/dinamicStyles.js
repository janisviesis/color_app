import colors from './colors';

const diameter = 40;
const d = 90;

let styles = [];
let style = {};
let maxY;
let i;
let x;
let y;

for (i = 0; i < colors.length; i++) {

    maxY = colors.length * 90 - diameter;

    x = Math.floor(Math.random() * 70);
    y = diameter + Math.floor(Math.random() * (maxY - diameter));

    style = {

        borderRadius: "50%",
        position: "absolute",
        left: `calc(${d}px + ${x}%`,
        top: `${y}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${colors[i]}`,
        cursor: "pointer"
    }

    styles.push(style);
}

export default styles;