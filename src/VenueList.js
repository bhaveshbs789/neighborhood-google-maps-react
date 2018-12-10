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
			width: "90%"
		},

		listItem : {
			marginBottom:"15px",
			textAlign: "left"
		},

		listLink : {
			background: "transparent",
			border: "none",
			color:"grey",
			textTransform:"uppercase",
			padding: "5px"
		},

		filterEntry : {
			border : "1px solid grey",
			padding: "8px",
			margin: "30px 0px",
			width: "80%",
			borderRadius:"10px"
		},
		closeLink : {
			padding:"8px",
			backgroundColor:"#d1cccc",
			borderRadius:"10px",
			color:"white",
			fontWeight:"bolder",
			border:"none"
		}
	};

	onClear = () => {
		this.setState({query : ""})
		// reset the results when clicking the x button
		this.updateQuery("")
	}

	updateQuery = (typedQuery) => {
		this.setState({query: typedQuery});
		this.props.filterVenues(typedQuery)
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
						   value={this.state.query} /><button onClick={this.onClear} style={this.styles.closeLink}>x</button>
					<ul style={this.styles.noListStyle}>
					{this.props.locations.map((location, index) => {
						return (
							<li style={this.styles.listItem} key={index}>
								<button style={this.styles.listLink} key={index} name={location.name.toLowerCase()} onClick={(event) => this.props.clickedListItem(index)}>{location.name}</button>
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
