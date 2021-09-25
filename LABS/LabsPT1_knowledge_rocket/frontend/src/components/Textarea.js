import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "../css/Textarea.css";

export default class Textarea extends Component {
    static propTypes = {
        countLimit: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        countShow: PropTypes.bool,
    };

    static defaultProps = {
        countLimit: 0,
        countShow: true,
    };

    state = {
        count: 0,
        rows: 3,
        styler: {"color":"#6c757d"}
    };

    handleChange = () => {
        let { rows, count } = this.state;
        if (count % 62 === 0 && count > 186) {
            rows = rows + 1;
        }
        this.setState({
            count: this.textarea.value.length,
            rows
        });
    };

    renderCount() {
        const { countLimit } = this.props;
        const className = `textarea__count${this.textarea && countLimit && this.textarea.value.length >= countLimit ? ' textarea__count--error' : ''}`;

        return (
            <span className={className}>
                {this.state.count}{countLimit > 0 && `/${countLimit}`}
            </span>
        );
    }

    componentDidMount() {
        this.setState({
            count: this.textarea.value.length,
        });
    }

    render() {
        const { countLimit, countShow, ...restProps } = this.props;
        if (this.state.count >= 512 && this.state.styler.color === "#6c757d") {
            this.setState({"styler": {"color":"red"}})
        } else if (this.state.count < 512 && this.state.styler.color === "red") {
            this.setState({"styler": {"color": "#6c757d"}})
        }
        return (
            <div className="textarea__wrapper">
                <textarea className="textarea"
                    rows={this.state.rows}
                    {...restProps}
                    ref={ref => (this.textarea = ref)}
                    onInput={this.handleChange}
                />
                <div className="counter" style={this.state.styler}>
                    <div>
                    {countShow && this.renderCount()}
                    </div>
                </div>
            </div>
        );
    }
}