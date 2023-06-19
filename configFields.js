const { Regex } = require('@companion-module/base')
module.exports = {
	getConfigFields() {
		return [
			{
				id: 'info',
				type: 'static-text',
				width: 12,
				label: 'Control Information',
				value:
					'This module controls an piXtimer Pro.  <a href="https://www.pixap.fr/products.php?ref=8&lang=en" target="_new">Product</a>',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Control Port',
				width: 4,
				regex: Regex.PORT,
				min: 1,
				max: 65535,
				default: '9756',
			},
			{
				id: 'timerPortInfo',
				type: 'static-text',
				width: 11,
				label: 'Timer Port Information',
				value: 'Before activating this option, check if you have the Dungle connected to piXtimer Pro !',
			},
			{
				type: 'static-text',
				id: 'io',
				width: 7,
			},
			{
				type: 'checkbox',
				id: 'enableTimerPort',
				label: 'Enable',
				width: 1,
				default: false,
			},
			{
				type: 'textinput',
				id: 'portTimer',
				label: 'Timer Port',
				width: 4,
				regex: Regex.PORT,
				min: 1,
				max: 65535,
				default: '9758',
			},
		]
	},
}
