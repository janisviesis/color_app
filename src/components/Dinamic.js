import React from 'react';
import styles from './dinamicStyles';

function Dinamic() {

    return (
        
        styles.map((style, i) => (
            <React.Fragment key={i}>
                <div style={style} id={i} className="idle">
                    <i className="fas fa-gift fa-lg" id={i}></i>
                </div>
            </React.Fragment>
        ))
    )
}

export default Dinamic;
