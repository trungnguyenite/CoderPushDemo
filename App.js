import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SafeAreaView, StyleSheet } from 'react-native';

import CoderPushDemo from './src/components/CoderPushDemo/CoderPushDemo';
import List from './src/components/List/List';

const AppNavigator = createStackNavigator(
	{
		CoderPushDemo: {
			screen: CoderPushDemo
		},
		List: {
			screen: List
		}

	}, {
		
    initialRouteName: 'CoderPushDemo',
    headerMode: 'none',
    // transitionConfig: getSlideFromRightTransition,
    navigationOptions: {
      gesturesEnabled: false
    }
	
  });

const BasicApp = createAppContainer(AppNavigator);

export default class App extends Component {
	render() {
		
		return (
			<SafeAreaView style={styles.container}>
				<BasicApp />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

// export default createAppContainer(AppNavigator);
