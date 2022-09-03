module.exports = {
	config_fields() {

		//console.log("PIXTIMER PRO | CONFIG FIELDS START");

		// eslint-disable-line camelcase
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value:
                'This module controls an piXtimer Pro.  <a href="https://www.pixap.fr/products.php?ref=8&lang=en" target="_new">Product</a>',
			},
            {
                type: 'textinput',
                id: 'host',
                label: 'Target IP',
                width: 6,
                regex: this.REGEX_IP,
            },
            {
                type: 'number',
                id: 'port',
                label: 'Port',
                width: 6,
				min: 1,
 				max: 65535,
                default: "9756",
                regex: this.REGEX_PORT,
            }
			// ,
			// {
			// 	type: 'dropdown',
			// 	label: 'piXtimer Pro Version',
			// 	id: 'version',
			// 	width: 12,
			// 	default: 'v1',
			// 	choices: [
			// 		{ id: 'v1', label: 'piXtimer Pro 1' },
			// 		{ id: 'v2', label: 'piXtimer Pro 2' },
			// 	],
			// },
		]
	},
}