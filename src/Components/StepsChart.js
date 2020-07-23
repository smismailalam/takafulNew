import React, {PureComponent} from 'react';
import {Dimensions, View} from 'react-native';
import {Svg, G, Line, Rect, Text, Circle} from 'react-native-svg';
import * as d3 from 'd3';
import moment from 'moment';

const Width = Dimensions.get('window').width;
const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 5;
const colors = {
  axis: '#c7c7c7',
  bars: '#15AD13',
};

export default class StepsChart extends PureComponent {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }
  render() {
    const today = this.state.date;
    const date = moment(today).format('D');
    const data = this.props.data;
    const SVGHeight = 200;
    const SVGWidth = data.length > 10 ? Width + 100 : Width;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    const xDomain = data.map(item => item.label);
    const xRange = [0, SVGWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    const maxValue = d3.max(data, d => d.value);
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round;
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    const middleValue = topValue / 2;

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <G y={graphHeight + GRAPH_MARGIN}>
          <Text
            x={10}
            textAnchor="start"
            y={y(topValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={1}>
            {topValue + ' ' + this.props.unit}
          </Text>
          <Text
            x={SVGWidth - 10}
            textAnchor="end"
            y={y(topValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={1}>
            {topValue + ' ' + this.props.unit}
          </Text>

          <Line
            x1="0"
            y1={y(topValue) * -1}
            x2={SVGWidth - 10}
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />
          <Text
            // x={SVGWidth - 10}
            x={10}
            textAnchor="start"
            y={y(middleValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={1}>
            {middleValue}
          </Text>
          <Text
            x={SVGWidth - 10}
            textAnchor="end"
            y={y(middleValue) * -1 - 5}
            fontSize={12}
            fill="black"
            fillOpacity={1}>
            {middleValue}
          </Text>

          <Line
            x1="0"
            y1={y(middleValue) * -1}
            x2={SVGWidth - 10}
            y2={y(middleValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          <Line
            x1="0"
            y1="2"
            x2={SVGWidth - 10}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />

          {data.map(item => (
            <Rect
              key={'bar' + item.label}
              x={x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1}
              rx={2.5}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill={colors.bars}
            />
          ))}
          {data.map(item =>
            date === item.label ? (
              <Text
                key={'label' + item.label}
                fontSize="16"
                x={x(item.label)}
                y="20"
                fill="#15AD13"
                fontWeight="bold"
                textAnchor="middle">
                {item.label}
              </Text>
            ) : (
              <Text
                key={'label' + item.label}
                fontSize="12"
                x={x(item.label)}
                y="20"
                fill="black"
                textAnchor="middle">
                {item.label}
              </Text>
            ),
          )}
        </G>
      </Svg>
    );
  }
}
