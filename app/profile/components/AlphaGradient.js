import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import {Gradient} from 'react-native-color';

class SaturationGradient extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color.h !== nextProps.color.h) {
      return true;
    }
    if (this.props.color.l !== nextProps.color.l) {
      return true;
    }
    if (this.props.color.a !== nextProps.color.a) {
      return true;
    }
    return false;
  }

  getStepColor = i => tinycolor({ ...this.props.color, a: i }).toHslString();

  render() {
    const { style, color, gradientSteps } = this.props;
    return (
      <Gradient
        style={style}
        gradientSteps={gradientSteps}
        getStepColor={this.getStepColor}
        maximumValue={1}
      />
    );
  }
}

export default SaturationGradient;

SaturationGradient.propTypes = {
  color: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired
  }).isRequired,
  gradientSteps: PropTypes.number.isRequired
};