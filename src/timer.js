const React = require("react");

let time;
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      isOn: false,
      time: {},
      seconds: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(totalSecs) {
    let hours = Math.floor(totalSecs / (60 * 60));

    let divisor_for_minutes = totalSecs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      hours: this.pad(hours),
      minutes: this.pad(minutes),
      seconds: this.pad(seconds)
    };
    return obj;
  }

  pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  componentWillMount() {
    console.log("componentwillmount");
    this.setState({ seconds: this.props.seconds });
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    let secondsLeft = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(secondsLeft),
      seconds: secondsLeft
    });

    if (secondsLeft === 0) {
      console.log("timer done!");
      clearInterval(this.timer);
      // Do something here -- launch other page? Timer disappears?
    }
  };

  render() {
    if (time !== this.props.time) {
      this.setState({ seconds: this.props.seconds });
      clearInterval(this.timer);
      this.startTimer();
    }
    time = this.props.time;
    return <h5> {`${this.state.time.seconds} seconds`}</h5>;
  }
}

export default Timer;
// module.exports = Timer
