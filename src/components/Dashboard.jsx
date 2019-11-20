import React, { Component } from 'react'
import ChartsView from './ChartsView';
import { DEFAULT_TIMEFRAME, DEFAULT_COMPANY_SYM, API_TIME_FRAMES } from '../utils';
import Loader from './Loader';

export default class Dashboard extends Component {

  state = {
    isLoading: true,
    companySym: DEFAULT_COMPANY_SYM,
    timeframe: DEFAULT_TIMEFRAME
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  setIsLoading = (isLoading) => {
    this.setState({ isLoading });
  }

  render() {
    const { timeframe, companySym } = this.state;
    return (
      <>
        {this.state.isLoading && <Loader />}
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Company:
            <select name='companySym' value={companySym} onChange={this.handleChange}>
                <option value="KO">The Coca-Cola Company</option>
                <option value="GE">General Electric</option>
                <option value="MSFT">Microsoft Corporation</option>
                <option value="DIS">Walt Disney Company</option>
              </select>
            </label>

            <br />

            <label>
              Timeframe:
            <select name='timeframe' value={timeframe} onChange={this.handleChange}>
                <option value="INTRADAY">Intraday</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="*">All</option>
              </select>
            </label>
          </form>

          <br />

          {timeframe !== '*' ?
            < ChartsView
              setIsLoading={this.setIsLoading}
              timeframe={timeframe}
              companySym={companySym} />
            :
            <>
              {API_TIME_FRAMES.map(timeframe =>
                <ChartsView
                  key={timeframe}
                  setIsLoading={this.setIsLoading}
                  timeframe={timeframe}
                  companySym={companySym}
                />
              )}
            </>
          }
        </div>
      </>
    )
  }
}
