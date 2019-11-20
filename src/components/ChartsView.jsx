import React, { Component } from 'react'
import Chart from './Chart';
import { getData, DATA_TYPES } from '../utils';

export default class ChartsView extends Component {

  state = {
    labels: [],
    data: [],

  }

  componentDidMount() {
    const { companySym, timeframe } = this.props;
    this.props.setIsLoading(true);

    getData(companySym, timeframe)
      .then(res => {
        this.afterDataFetching(res);
      })
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.timeframe !== nextProps.timeframe
      || this.props.companySym !== nextProps.companySym) {
      this.props.setIsLoading(true);
      getData(nextProps.companySym, nextProps.timeframe)
        .then(res => {
          this.afterDataFetching(res);
        })
      return false;
    }
    return true;
  }

  afterDataFetching = res => {
    if (res.Status !== 'Success')
      console.error('Failed to fetch data');

    let labels = [], data = [[], [], [], []];

    for (let time in res.data) {
      if (this.matchTimeframe(time)) {
        labels.push(time);
        DATA_TYPES.forEach((dataType, i) => {
          data[i].push(res.data[time][dataType]);
        });
      }
    }

    this.setState({ labels, data: data });
    this.props.setIsLoading(false);
  }

  matchTimeframe = (time) => {
    const { timeframe } = this.props;

    const date1 = new Date(time);
    const date2 = new Date();
    const diff = date2.getTime() - date1.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    switch (timeframe) {
      case 'INTRADAY':
        return days < 2;
      case 'DAILY':
        return days < 31;
      case 'WEEKLY':
        return days < 8
      default: return false;
    }
  }

  render() {
    return (
      <Chart labels={this.state.labels} data={this.state.data} />
    )
  }
}
