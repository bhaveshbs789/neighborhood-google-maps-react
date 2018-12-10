import React, {Component} from 'react';
import nothing from './error-nothing-here.gif'

class noDisplay extends Component {

	state = {
		showMessage : false,
		timeout: null
	}

	componentDidMount() {
		let timeout = window.setTimeout(this.showMessage, 1000);
        this.setState({timeout});
	}

	componentWillUnmount() {
        window.clearTimeout(this.state.timeout);
    }

    showMessage = () => {
        this.setState({showMessage: true});
    }

	render() {
		return (
			<div>
				{this.state.showMessage} ? (<div>
												<h2>Error Encountered</h2>
												<p>Check your network connection and try again</p>
												<p>Your secret key could be the issue here also :D</p>
												<img src={nothing} alt="Error Nothing Found gif" ></img>
											</div>) : (<div><h2>Loading.....</h2></div>)
			</div>
		)
	}
}

export default noDisplay