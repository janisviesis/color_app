import React from 'react'
import styles from './staticStyles';

function Static() {

    return (
        
        styles.map((style, i) => (
            <React.Fragment key={i}>
                <div style={style} id={"stat"+i}>
                    <i className="fas fa-tree fa-3x"></i>
                </div>
            </React.Fragment>
        ))
    )
}

export default Static;
