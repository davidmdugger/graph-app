import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  getBitcoinData,
  displaySelectedPrice,
  showGraphType
} from "../../actions/graphActions";

// components
import Bar from "./Bar";
import Marker from "./Marker";
import Spinner from "../Spinner/Spinner";

import "./Chart.css";

class Chart extends Component {
  componentDidMount() {
    this.props.getBitcoinData();
  }

  handlePriceDisplay = (price, date) => {
    this.props.displaySelectedPrice(price, date);
  };

  handleGraphChange = type => {
    let changeType = type;
    type === "bar" ? (changeType = "line") : (changeType = "bar");
    this.props.showGraphType(changeType);
    this.handlePriceDisplay(null, null); // reset BTC price on date
  };

  // render the vertical lines on the bar graph
  renderMarkers = () => {
    return Array(10)
      .fill(null)
      .map((_, i) => <Marker bottom={i * 10} key={i} />);
  };

  // render the numbers on the left side of the graph
  renderAxisY = () => {
    return Array(11)
      .fill(null)
      .map((_, i) => <p key={i}>${(i * 1000).toLocaleString()}</p>);
  };

  // display msg: BTC price on the selected date
  renderPriceOnDate = () => {
    let { date, price } = this.props.graph;
    // get today's date
    const today = moment(new Date()).format("MMMM DD, YYYY");
    // declare preposition: "is" or "was" depending on date selected
    let preposition;

    if (date === today) {
      preposition = "is";
      date = "today";
    } else {
      preposition = "was";
      date = `on ${date}`;
    }
    return (
      <p className="fade-in" id="date-price">
        The Price of Bitcoin {preposition} {price} {date}.
      </p>
    );
  };

  // render the graph
  handleGraphDisplay = () => {
    const { type } = this.props.graph;
    // if the type of graph is bar show the bar graph
    let renderGraph =
      type === "bar" ? (
        <React.Fragment>
          {this.renderBars()}
          {this.renderMarkers()}
        </React.Fragment>
      ) : (
        <h4 className="fade-in" style={{ transform: "scale(-1)" }}>
          Show Line Graph <small>coming soon...</small>
        </h4>
      );
    return renderGraph;
  };

  // render the bars that represent the price of BTC each day
  renderBars = () => {
    const { prices } = this.props.graph;

    return prices.map(price => (
      <Bar
        key={price.price}
        handlePriceDisplay={this.handlePriceDisplay}
        priceUSD={price.price}
        priceY={price.y}
        date={price.date}
      />
    ));
  };

  // renderLines = () => {
  //   const { prices } = this.props.graph;

  //   return prices.map(price => (
  //     <Line
  //       key={price.price}
  //       handlePriceDisplay={this.handlePriceDisplay}
  //       priceUSD={price.price}
  //       priceY={price.y}
  //       date={price.date}
  //     />
  //   ));
  // };

  render() {
    const { date, price, type, isLoading } = this.props.graph;
    const buttonText = type === "bar" ? "line" : "bar";
    let displayGraph; // initialized what to display

    // if data is not loading, show chart; otherwise show loading gif
    !isLoading
      ? (displayGraph = (
          <React.Fragment>
            <div className="axisY">{this.renderAxisY()}</div>

            <div className="chart">{this.handleGraphDisplay()}</div>
          </React.Fragment>
        ))
      : (displayGraph = <Spinner />);

    return (
      <div className="graph-wrapper">
        <div>
          <h1 className="title">The Price of Bitcoin</h1>
          <button onClick={() => this.handleGraphChange(type)}>
            show {buttonText}
          </button>
        </div>

        <div className="chart-wrapper">{displayGraph}</div>

        <div>
          <h3>Last 30 Days</h3>
          {date && price && this.renderPriceOnDate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graph: state.graph
});

export default connect(
  mapStateToProps,
  { getBitcoinData, displaySelectedPrice, showGraphType }
)(Chart);
