import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
// import ValueViewer from 'docs/src/pages/ValueViewer' // for examples only - displays the table above slider
import { SliderRail, Track, Tick } from "./SliderRail"; // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "90%",
  margin: "5px auto"
};

const domain = [0, 4];
const defaultValues = [1];

const formatTicks = d => {
  if (d === 0) {
    return "Unselected";
  } else if (d === 1) {
    return "Lived In";
  } else if (d === 2) {
    return "Visted";
  } else if (d === 3) {
    return "Want To Visit";
  } else {
    return "Transited";
  }
};

export function Handle({
  // your handle component
  handle: { id, value, percent },
  getHandleProps,

  setColor = value => {
    let color;
    if (value === 0) {
      return (color = "lightgrey");
    } else if (value === 1) {
      return (color = "#017B7B");
    } else if (value === 2) {
      return (color = "#9B016D");
    } else if (value === 3) {
      return (color = "#CD5D01");
    } else {
      return (color = "#8FC201");
    }
  }
}) {
  return (
    <div
      style={{
        left: `${percent + 1.2}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: -10,
        zIndex: 2,
        width: 20,
        height: 20,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: setColor(value),
        color: "#333"
      }}
      {...getHandleProps(id)}
    />
  );
}

class CardSlider extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice()
  };

  onChange = values => {
    this.setState({ values }, () => {
      this.props.onChange(this.state.values);
    });
  };

  render() {
    const {
      state: { values }
    } = this;

    return (
      <div style={{ height: 50, width: "100%" }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false} style={{ paddingRight: 20 }}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5} values={[0, 1, 2, 3, 4]}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    format={formatTicks}
                    count={ticks.length}
                  />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default CardSlider;
