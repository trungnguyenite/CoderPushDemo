import {
    StyleSheet,
	Dimensions
} from 'react-native';


var scrW = Math.round(Dimensions.get('window').width)
var scrH = Math.round(Dimensions.get('window').height)
var avatarW = scrW-30
var avatarH = scrH-200

module.exports = StyleSheet.create({
	
	container: {
		backgroundColor: "rgba(249,249,249,1)",
		flex: 1
	},
	info: {
		position:'absolute',
		//alignSelf:'center',
	},
	avatarImg: {
		alignSelf:'center',
		width: avatarW, 
		height: avatarH, 
		borderRadius: 20
	},
	avatarView: {
		position: 'absolute',
		left: 10, 
		bottom:20
	},
	firstName: {
		fontSize:35, 
		fontWeight: '500', 
		color:'white'
	},
	statusView: {
		flexDirection: 'row', 
		alignItems: 'center'
	},
	statusIcon: {
		width: 10, 
		height: 10, 
		borderRadius: 100, 
		backgroundColor: 'green'
	},
	statusText: {
		fontSize:17, 
		fontWeight: '400', 
		color:'white'
	},
	pagerView: {
		flex:1, 
		alignSelf:'center', 
		width: scrW-30
	},
	action: {
		position: 'absolute', 
		flexDirection: 'row', 
		bottom: 100, 
		width: scrW-30, 
		height: 42, 
		alignSelf: 'center', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	previos: {
		position:'absolute', 
		left:0
	},
	next: {
		position:'absolute', 
		right:0
	},
	action2: {
		position: 'absolute', 
		flexDirection: 'row', 
		bottom: 0, 
		width: scrW, 
		height: 55, 
		alignSelf: 'center', 
		justifyContent: 'center', 
		alignItems: 'center',
		backgroundColor: 'grey'
	},
	previos2: {
		position:'absolute', 
		left:30,
		flexDirection: 'row'
	},
	next2: {
		position:'absolute', 
		right:30,
		flexDirection: 'row'
	}

});