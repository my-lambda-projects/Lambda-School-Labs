import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router-dom';


// Special component for parsing/handling internal or external links
export default class Link extends Component {
  
    parseTo(to) {
  
      let parser = document.createElement('a');
      parser.href = to;
      return parser;
  
    }
  
    isInternal(to) {
      
      // If it's a relative url such as '/path', 'path' and does not contain a protocol we can assume it is internal.
      
      if(to.indexOf("://") === -1) return true;
  
      const toLocation = this.parseTo(to);
      return window.location.hostname === toLocation.hostname;
  
    }
    //a test is done to see if it is an internal link or external link depending on the destination 
    //and will parse all external links using <a> </a> tag.
    render() {
  
      const {to, children, ...rest} = this.props;
      const isInternal = this.isInternal(to);
  
      if (isInternal) {
        return (<ReactLink to={to} {...rest}>{children}</ReactLink>);
      } else {
        return (<a href={to} target="_blank" {...rest}>{children}</a>);
      }
  
    }
  }