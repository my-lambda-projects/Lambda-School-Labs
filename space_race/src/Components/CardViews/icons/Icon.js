import React from 'react';
import PropTypes from 'prop-types';
// const PropTypes = React;

/**
 * 
 *  This component lets you plug in an svg icon inline and requires the Iconstants.js file.  Each svg icon is stored in that file. 
 * Example useage:   <Icon  icon={ICONS.BIN2} color={"blue"} size={32} />  will render the trashcan icon with blue fill and 32x32px in size. 
 */
const Icon = props => {
    const styles = {
      svg: {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
      path: {
        fill: props.color,
      },
    };
  
    return (
      <svg
        style={styles.svg}
        width={`${props.size}px`}
        height={`${props.size}px`}
        viewBox="0 0 1024 1024"
      >
        <path
          style={styles.path}
          d={props.icon}
        ></path>
      </svg>
    );
  };
  
  Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
  };
  
  Icon.defaultProps = {
    size: 16,
  };
  
  export default Icon;