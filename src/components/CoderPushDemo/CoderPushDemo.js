import React, { Component } from "react";

import {
	View, Text, Dimensions, Image,
	TouchableOpacity, Animated, PanResponder, ActivityIndicator, TouchableWithoutFeedback
} from "react-native";

import styles from './Styles';

import RESTClient from '../RESTClient';

import PagerView from 'react-native-pager-view';
import FlipPage, { FlipPagePage } from 'react-native-flip-page';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { rotateY } from "react-native-flip-page/src/transform-utils";
import moment from 'moment';
import { PanGestureHandler } from "react-native-gesture-handler";


var scrW = Math.round(Dimensions.get('window').width)
var scrH = Math.round(Dimensions.get('window').height)
var avatarW = scrW-30
var avatarH = scrH-200
var n = 5



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
			orientation: true,
			loadMore: false,
			locationXOnPressIn: null
		}
	}

	async componentDidMount() {
		
		try{
			await this.load(n)
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/componentDidMount(): ' + e)
		}

	}

	async load(n) {

		try {
			var result = await RESTClient.coderPushDemo(n)

			this.state.data = result.data
			
			for(var i=0; i<this.state.data.length; i++){
				
				var rotate = new Animated.Value(0)
				var rotateInterpolate = rotate.interpolate({
					inputRange: [-1, 0, 1],
					outputRange: ['180deg', '0deg', '-180deg']
				})
				var opacity = new Animated.Value(1)
				var scale = new Animated.Value(1)
				var translate = new Animated.Value((scrW-avatarW)/2) //new Animated.ValueXY().x
				var translate2 = new Animated.Value(0) //new Animated.ValueXY().x
				var zIndex = new Animated.Value(this.state.data.length-1 - i)

				this.state.data[i].rotate = rotate
				this.state.data[i].rotateInterpolate = rotateInterpolate
				this.state.data[i].opacity = opacity
				this.state.data[i].scale = scale
				this.state.data[i].translate = translate
				this.state.data[i].translate2 = translate2
				this.state.data[i].zIndex = zIndex
			}
			
			this.forceUpdate()
		}
		catch (e) {
			alert('####EXCEPTION: CoderPushDemo/load(): ' + e)
			return e
		}
	}

	async loadMore() {
		this.setState({ loadMore: true })

		await this.load(n += 5)

		this.setState({ loadMore: false })
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
	
	async renderAge(){
		
		try{
			this.setState({age: null})

			if(this.state.data.length >= 0){
				//var index = e.nativeEvent.position
				//var age = await this.getAge(this.state.data[e.nativeEvent.position].id)
				var detail = await RESTClient.getAge(this.state.data[this.state.currentPage].id)
				var age = moment().year() - moment(detail.dateOfBirth).year()

				this.setState({
					//currentPage: index,
					age: age,
					//orientation: true
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
	
	async nextPage(orientation) {
		
		try{
			if(this.state.loadMore)
				return

			this.addList(true)
			
			/* this.setState({orientation: orientation})
			
			this.state.currentPage = this.state.currentPage + 1
			if(this.state.currentPage > this.state.data.length - 1)
				this.state.currentPage = 0
			this.refs.pagerView.setPage(this.state.currentPage) */

			await this.animation(this.state.locationXOnPressIn - 1, orientation)
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/nextPage(orientation): ' + e)
		}
	}
	
	async previosPage(orientation) {
		
		try{
			this.addList(false)
			
			/* this.setState({orientation: orientation})
			
			this.state.currentPage = this.state.currentPage - 1
			if(this.state.currentPage < 0)
				this.state.currentPage = this.state.data.length - 1
			this.refs.pagerView.setPage(this.state.currentPage) */

			await this.animation(this.state.locationXOnPressIn + 1, true)
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

	async animation(locationXOnPressOut, orientation) {

		try{
			if(this.state.animating)
				return
			this.state.animating = true

			if(this.state.loadMore)
				return

			var left
			if(locationXOnPressOut > this.state.locationXOnPressIn){
				left = true

				if(this.state.currentPage > 0)
					Animated.timing(this.state.data[this.state.currentPage-1].opacity, {

						toValue: 1,
						duration: 0,
						useNativeDriver: false
					}).start(()=>{

						Animated.timing(this.state.data[this.state.currentPage].zIndex, {
	
							toValue: this.state.data[this.state.currentPage].zIndex._value + 1,
							duration: 0,
							useNativeDriver: false
						}).start()
					})
				else{
					this.state.animating = false
					return
				}
			}
			else{
				left = false

				if(this.state.currentPage < this.state.data.length-1)
					Animated.timing(this.state.data[this.state.currentPage+1].opacity, {

						toValue: 1,
						duration: 0,
						useNativeDriver: false
					}).start()
				else{
					this.state.animating = false
					return
				}
			}
		
			var _currentPage = this.state.currentPage
			Animated.parallel([
				Animated.timing(this.state.data[_currentPage].rotate, {

					toValue: orientation ? (left ? -1 : 1) : 0,
					duration: 600,
					useNativeDriver: false
				}).start(),

				Animated.timing(this.state.data[_currentPage].opacity, {

					toValue: 0,
					duration: 700,
					useNativeDriver: false
				}).start(),

				Animated.timing(this.state.data[_currentPage].scale, {

					toValue: 1,
					duration: 500,
					useNativeDriver: false
				}).start(),

				Animated.timing(orientation ? this.state.data[_currentPage].translate : this.state.data[_currentPage].translate2, {

					toValue: orientation ? (left ? 372 : -342) : -avatarW,
					duration: 560,
					useNativeDriver: false
				}).start(()=>{

					Animated.timing(orientation ? this.state.data[_currentPage].translate : this.state.data[_currentPage].translate2, {

						toValue: orientation ? (scrW-avatarW)/2 : 0,
						duration: 101,
						useNativeDriver: false
					}).start()

					Animated.timing(this.state.data[_currentPage].rotate, {

						toValue: 0,
						duration: 101,
						useNativeDriver: false
					}).start(()=>{

						if(left && _currentPage > 0)
							Animated.timing(this.state.data[_currentPage].zIndex, {
		
								toValue: this.state.data[_currentPage].zIndex._value - 1,
								duration: 0,
								useNativeDriver: false
							}).start()
					})
				})
			])

			await this.renderAge()
			
			if(left)
				this.state.currentPage--
			else {
				this.state.currentPage++

				if(this.state.currentPage == this.state.data.length - 1) {
					await this.loadMore()
					for(var i=0; i<this.state.currentPage; i++)
						Animated.timing(this.state.data[i].opacity, {

							toValue: 0,
							duration: 0,
							useNativeDriver: false
						}).start()
				}
			}

			this.state.animating = false
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/animation(): ' + e)
		}
	}



	render() {

		try{
			var dataRender = this.state.data.map((e, i) =>
					
				<Animated.View style={[styles.info, {zIndex:e.zIndex, left:e.translate, top:e.translate2, opacity:e.opacity, transform:[{rotateY:e.rotateInterpolate}, {scaleX:e.scale}] } ]}>
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
				</Animated.View>
			)
		}
		catch(e){
			alert('####EXCEPTION: CoderPushDemo/render(): ' + e)
		}

		return (
			
			<View style={styles.container}>

				<TouchableWithoutFeedback
					style={{width:scrW, height:avatarH}}
					activeOpacity={1}
					onPressIn={(e)=> this.state.locationXOnPressIn = e.nativeEvent.locationX}
					onPressOut={async(e)=> await this.animation(e.nativeEvent.locationX, true)}>
						<View>
							{dataRender}

							{this.state.loadMore ? (//alert('x'),
							
								<ActivityIndicator size='large' color='#999999' style={{position:'absolute', zIndex:this.state.data.length, alignSelf:'center', top:avatarH/2}} />
								
							) : null}
						</View>
				</TouchableWithoutFeedback>
				
				<View style={styles.action}>
					<TouchableOpacity style={styles.previos} onPress={async() => await this.previosPage(true)}>
						<AntDesign name='closecircleo' size={40} color='red'/>
					</TouchableOpacity>
					
					<TouchableOpacity style={{}} onPress={() => this.nextPage(false)}>
						<AntDesign style={{}} name='staro' size={45} color='blue'/>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.next} onPress={async() => await this.nextPage(true)}>
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
