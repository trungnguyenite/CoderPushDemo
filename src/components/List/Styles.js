import {
    StyleSheet,
	Dimensions
} from 'react-native';


var scrW = Math.round(Dimensions.get('window').width)
var scrH = Math.round(Dimensions.get('window').height)


module.exports = StyleSheet.create({
	
	container: {
		backgroundColor: "rgba(249,249,249,1)",
		flex: 1
	},
	avatarImg: {
		width: 80, 
		height: 100, 
		borderRadius: 20
	},
	avatarView: {
		position: 'absolute', 
		left: 10, 
		bottom:20
	},
	firstName: {
		fontSize: 20, 
		fontWeight: '500',
		color: 'black'
	},
	statusView: {
		flexDirection: 'row', 
		alignItems: 'center'
	},
	statusIcon: {
		marginLeft: 10,
		width: 10, 
		height: 10, 
		borderRadius: 100, 
		backgroundColor: 'green'
	},
	statusText: {
		fontSize:17, 
		fontWeight: '300',
		color: 'black'
	},
	listItem: {
		marginTop: 10, 
		flexDirection: 'row'
	},
	info: {
		justifyContent: 'center'
	}

});