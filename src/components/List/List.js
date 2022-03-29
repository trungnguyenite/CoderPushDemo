import React, { Component } from "react";

import {
	StyleSheet, View, Text, ScrollView, Dimensions, TextInput, Image,
	TouchableOpacity, ActivityIndicator
} from "react-native";

import styles from './Styles';



var scrW = Math.round(Dimensions.get('window').width)
var scrH = Math.round(Dimensions.get('window').height)



export default class List extends React.Component {
	
	constructor(props) {
		
		super(props)

		this.state = {

			listItem: this.props.navigation.state.params.listData.map(e => 
			
				<View style={styles.listItem}>
					<Image
						source={{uri: e.picture}}
						style={styles.avatarImg}
					/>
					<View style={styles.info}>
						<Text style={styles.firstName}>  {e.firstName} {e.age}</Text>
						<View style={styles.statusView}>
							<View style={styles.statusIcon}/>
							<Text style={styles.statusText}> Recently Active</Text>
						</View>
					</View>
				</View>
			)
		}
	}
	
	

	render() {
		
		return (
			
			<View style={styles.container}>

				<ScrollView>
					{this.state.listItem}
				</ScrollView>
				
			</View>

		);
	}
}
