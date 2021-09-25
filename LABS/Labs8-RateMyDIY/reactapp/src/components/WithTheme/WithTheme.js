import React from 'react';
import {
	MuiThemeProvider,
	createMuiTheme,
	withTheme as muiWithTheme
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

// const theme = {
// 	primary: '#4290CA', // shakespeare
// 	accent: '#5DB7D9', // viking
// 	light: '#D5CDC2', // sisal
// 	secondary: '#62554B', // soyabean
// 	dark: '#263842', // pickledbluewood
// }

const muiTheme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			light: '#f9f2ec', // viking -> changed back to white on 12/6
			main: '#fff', // shakespeare -> changed back to white on 12/6
			dark: '#263842' // pickledbluewood
		},
		secondary: {
			light: '#fff', // sisal
			main: '#fff' // soyabean
		}
	}
});

function MaterialUiTheme(props) {
	return <MuiThemeProvider theme={muiTheme}>{props.children}</MuiThemeProvider>;
}

MaterialUiTheme.propTypes = {
	children: PropTypes.any
};

const appTheme = { mode: 'light' };

function StyledComponentsTheme(props) {
	return (
		<ThemeProvider theme={{ app: appTheme, mui: props.theme }}>
			{props.children}
		</ThemeProvider>
	);
}

StyledComponentsTheme.propTypes = {
	children: PropTypes.any,
	theme: PropTypes.object
};

const StyledComponentsThemeWithMui = muiWithTheme()(StyledComponentsTheme);

function WithTheme(props) {
	return (
		<MaterialUiTheme>
			<StyledComponentsThemeWithMui>
				{props.children}
			</StyledComponentsThemeWithMui>
		</MaterialUiTheme>
	);
}

WithTheme.propTypes = {
	children: PropTypes.any
};

export default WithTheme;
