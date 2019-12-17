import colors from './colors';

let styles = [];
let style = {};
let i;
let y;

for (i = 0; i < colors.length; i++) {

    y = 100 * i;

    style = {

        borderRadius: "50%",
        position: "absolute",
        top: `${y}px`,
        width: "60px",
        height: "60px",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `10px solid ${colors[i]}`
    }

    styles.push(style);
}

export default styles;