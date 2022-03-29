import React, { Component } from "react";

import {
	StyleSheet, View, Text, ScrollView, Dimensions, TextInput, Image,
	TouchableOpacity, ActivityIndicator
} from "react-native";

import styles from './Styles';

import RESTClient from '../RESTClient';

import PagerView from 'react-native-pager-view';
import AntDesign from 'react-native-vector-icons/AntDesign';



var scrW = Math.round(Dimensions.get('window').width)
var scrH = Math.round(Dimensions.get('window').height)



export default class CoderPushDemo extends React.Component {
	
	constructor(props) {
		
		super(props)
		
		this.state = {

			data: [],
			ageData: [
				{
					"id": "60d0fe4f5311236168a109ca",
					"age": 58
				},
				{
					"id": "60d0fe4f5311236168a109cb",
					"age": 89
				},
				{
					"id": "60d0fe4f5311236168a109cc",
					"age": 28
				},
				{
					"id": "60d0fe4f5311236168a109cd",
					"age": 25
				},
				{
					"id": "60d0fe4f5311236168a109ce",
					"age": 83
				},
				{
					"id": "60d0fe4f5311236168a109cf",
					"age": 55
				},
				{
					"id": "60d0fe4f5311236168a109d0",
					"age": 23
				},
				{
					"id": "60d0fe4f5311236168a109d1",
					"age": 52
				},
				{
					"id": "60d0fe4f5311236168a109d2",
					"age": 80
				},
				{
					"id": "60d0fe4f5311236168a109d3",
					"age": 70
				}
			],
			age: null,
			secondLook: [],
			likedList: [],
			currentPage: 0,
			orientation: true
		}
	}

	async componentDidMount() {
		
		try{
			await this.load()
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/componentDidMount(): ' + e)
		}

	}

	async load() {

		try {
			var result = await RESTClient.coderPushDemo()

			this.setState({
				
				data: result.data,
				
			})
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/load(): ' + e)
			return e
		}
	}
	
	delay(time) {
		
		try{
			return new Promise(resolve => setTimeout(resolve, time));
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/delay(time): ' + e)
		}
	}
	
	async getAge(id) {
		
		try{
			await this.delay(700);
				 
			var person = this.state.ageData.find(e => e.id == id)
			
			return person.age
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/getAge(id): ' + e)
		}
	}
	
	async renderAge(e){
		
		try{
			this.setState({age: null})

			if(this.state.data.length > 0){
				var index = e.nativeEvent.position
				var age = await this.getAge(this.state.data[e.nativeEvent.position].id)

				this.setState({
					currentPage: index,
					age: age,
					orientation: true
				})
			}
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/renderAge(e): ' + e)
		}
	}
	
	addList(like) {
		
		try{
			if(like){
				if(typeof this.state.likedList.find(e => e.id == this.state.data[this.state.currentPage].id) != 'undefined')
					return
				else
					if(typeof this.state.secondLook.find(e => e.id == this.state.data[this.state.currentPage].id) != 'undefined')
						this.state.secondLook = this.state.secondLook.filter(e => e.id != this.state.data[this.state.currentPage].id)
			}
			else{
				if(typeof this.state.secondLook.find(e => e.id == this.state.data[this.state.currentPage].id) != 'undefined')
					return
				else
					if(typeof this.state.likedList.find(e => e.id == this.state.data[this.state.currentPage].id) != 'undefined')
						this.state.likedList = this.state.likedList.filter(e => e.id != this.state.data[this.state.currentPage].id)
			}
			
			var listItem = {
				id: this.state.data[this.state.currentPage].id,
				firstName: this.state.data[this.state.currentPage].firstName,
				lastName: this.state.data[this.state.currentPage].lastName,
				age: this.state.age,
				picture: this.state.data[this.state.currentPage].picture
			}
			if(like)
				this.state.likedList.push(listItem)
			else
				this.state.secondLook.push(listItem)
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/addList(like): ' + e)
		}
	}
	
	nextPage(orientation) {
		
		try{
			this.addList(true)
			
			this.setState({orientation: orientation})
			
			this.state.currentPage = this.state.currentPage + 1
			if(this.state.currentPage > this.state.data.length - 1)
				this.state.currentPage = 0
			this.refs.pagerView.setPage(this.state.currentPage)
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/nextPage(orientation): ' + e)
		}
	}
	
	previosPage(orientation) {
		
		try{
			this.addList(false)
			
			this.setState({orientation: orientation})
			
			this.state.currentPage = this.state.currentPage - 1
			if(this.state.currentPage < 0)
				this.state.currentPage = this.state.data.length - 1
			this.refs.pagerView.setPage(this.state.currentPage)
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/previosPage(orientation): ' + e)
		}
	}
	
	gotoList(like) {
		
		try{
			this.props.navigation.navigate('List', {listData: like ? this.state.likedList : this.state.secondLook} )
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/gotoList(like): ' + e)
		}
	}



	render() {
		
		var dataRender = this.state.data.map(e =>
				
				<View>
					<View style={styles.info}>
						<Image
							source={{uri: e.picture}}
							style={styles.avatarImg}
						/>
						
						<View style={styles.avatarView}>
							<Text style={styles.firstName}>{e.firstName} {this.state.age}</Text>
							<View style={styles.statusView}>
								<View style={styles.statusIcon}/>
								<Text style={styles.statusText}> Recently Active</Text>
							</View>
						</View>
						
					</View>
				</View>
		)

		return (
			
			<View style={styles.container}>

				<PagerView
					ref='pagerView'
					style={styles.pagerView}
					initialPage={0}
					transitionStyle='curl'
					orientation={this.state.orientation ? 'horizontal' : 'vertical'}
					onPageSelected={(e) => this.renderAge(e)}
				>
				
					{dataRender}
				
				</PagerView>
				
				<View style={styles.action}>
					<TouchableOpacity style={styles.previos} onPress={() => this.previosPage(true)}>
						<AntDesign name='closecircleo' size={40} color='red'/>
					</TouchableOpacity>
					
					<TouchableOpacity style={{}} onPress={() => this.nextPage(false)}>
						<AntDesign style={{}} name='staro' size={45} color='blue'/>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.next} onPress={() => this.nextPage(true)}>
						<AntDesign name='hearto' size={40} color='green'/>
					</TouchableOpacity>
				</View>
				
				<View style={styles.action2}>
					<TouchableOpacity style={styles.previos2} onPress={() => this.gotoList(false)}>
						<AntDesign name='closecircleo' size={20} color='red'/>
						<Text style={styles.statusText}> Second Look</Text>
					</TouchableOpacity>
										
					<TouchableOpacity style={styles.next2} onPress={() => this.gotoList(true)}>
						<AntDesign name='hearto' size={20} color='green'/>
						<Text style={styles.statusText}> Liked List</Text>
					</TouchableOpacity>
				</View>
				
			</View>

		);
	}
}
