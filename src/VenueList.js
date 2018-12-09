import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class VenueList extends Component {
	state = {
		query : "",
		open: false
	}

	styles = {
		list: {
			width: "250px",
			padding: "0px 15px",
		},

		noListStyle : {
			listStyleType: "none",
			padding : "0px"
		},

		fullList : {
			width: "auto"
		},

		listItem : {
			marginBottom:"15px"
		},

		listLink : {
			background: "transparent",
			border: "none",
			color:"grey",
			textTransform:"uppercase"
		},

		filterEntry : {
			border : "1px solid grey",
			padding: "8px",
			margin: "30px 0px",
			width: "90%"
		}
	};

	updateQuery = (typedQuery) => {
		this.setState({query: typedQuery });
	}

	render() {
		return (
			<div>
				<Drawer open={this.props.open}
						onClose={this.props.toggleDrawer}>
				<div style={this.styles.list}>
					<input style={this.styles.filterEntry}
						   type="text"
						   placeholder="Filter Restaurants..."
						   name="filter"
						   onChange={(evt) => {this.updateQuery(evt.target.value)}}
						   value={this.state.query} />
					<ul style={this.styles.noListStyle}>
					{this.props.locations.map((location, index) => {
						return (
							<li style={this.styles.listItem} key={index}>
								<button style={this.styles.listLink} key={index}>{location.name}</button>
							</li>
						)
					})}
					</ul>
					</div>
				</Drawer>
			</div>
		)
	}
}

export default VenueList
