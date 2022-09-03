const InstanceSkel = require('../../../instance_skel')
const configFields = require('./configFields')
const actions = require('./actions')
const presets = require('./presets')
var tcp = require('../../../tcp');

let debug
let log

class PixtimerProInstance extends InstanceSkel {
	constructor(system, id, config) {
		super(system, id, config)

		//console.log("PIXTIMER PRO | START")

		this.timerPresetMax = 8;
		this.messagePresetMax = 3;
		this.adjustArray = [1, 5, 10, 20, 30]
		this.gotoArray = [10, 20, 30]

		this.config = config

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...actions,
			...presets,
		})
	}

	// initPresets() {
	// 	this.setPresetDefinitions(this.getPresets())
	// }

	action(action) {
		let id = action.action
		let opt = action.options
		let cmd

		switch (id) {
			case 'recallTimerPreset':
				cmd = 'PST ' + opt.cue;
				break;

			case 'speakerTimerPlay':
				cmd = 'PST PLAY';
				break;

			case 'speakerTimerPause':
				cmd = 'PST BREAK';
				break;

			case 'speakerTimerStop':
				cmd = 'PST STOP';
				break;

			case 'sessionTimerPlay':
				cmd = 'PSTS PLAY';
				break;

			case 'sessionTimerPause':
				cmd = 'PSTS BREAK';
				break;

			case 'sessionTimerStop':
				cmd = 'PSTS STOP';
				break;

			case 'allTimerPlay':
				cmd = 'PSTA PLAY';
				break;

			case 'allTimerPause':
				cmd = 'PSTA BREAK';
				break;

			case 'allTimerStop':
				cmd = 'PSTA STOP';
				break;

			case 'recallMessagePreset':
				cmd = 'PSTM ' + opt.cue;
				break;

			case 'showMessage':
				cmd = 'PSTM SHOW';
				break;

			case 'hideMessage':
				cmd = 'PSTM HIDE';
				break;

			case 'blackShow':
				cmd = 'BLACK SHOW';
				break;

			case 'blackHide':
				cmd = 'BLACK HIDE';
				break;

			case 'countdownVideoPlay':
				cmd = 'CTD ' + opt.time + " PLAY";
				break;

			case 'countdownVideo':
				cmd = 'CTD ' + opt.time;
				break;

			case 'countdownPlay':
				cmd = 'CTD PLAY';
				break;

			case 'countdownStop':
				cmd = 'CTD STOP';
				break;

			case 'adjustTime':
				cmd = 'ADJT ' + opt.time;
				break;

			case 'switchTimerClock':
				cmd = 'SWTC';
				break;

			case 'ndiStartStop':
				cmd = 'NDI ED';
				break;

			case 'pbpMainEnableDisable':
				cmd = 'PBPM ED';
				break;

			case 'pbpBackupEnableDisable':
				cmd = 'PBPB ED';
				break;

			case 'pbpGeneralTake':
				cmd = 'PBPG TAKE';
				break;

			case 'pbpGeneralEndall':
				cmd = 'PBPG ENDALL';
				break;

			case 'pbpGeneralPrevious':
				cmd = 'PBPG PREVC';
				break;

			case 'pbpGeneralNext':
				cmd = 'PBPG NEXTC';
				break;

			case 'pbpGeneralPlay':
				cmd = 'PBPG PLAY';
				break;

			case 'pbpGeneralPause':
				cmd = 'PBPG PAUSE';
				break;

			case 'pbpGeneralGoto10':
				cmd = 'PBPG GOTO 10';
				break;

			case 'pbpGeneralGoto20':
				cmd = 'PBPG GOTO 20';
				break;

			case 'pbpGeneralGoto30':
				cmd = 'PBPG GOTO 30';
				break;
		}

		// this.log('info', "ACTION " + cmd + " | TO " + this.config.host + " : " + this.config.port)
		// this.debug('ACTION ',cmd,"to",this.config.host, this.config.port);

		if (this.config.port !== undefined && this.config.host !== undefined) {
			if (cmd !== undefined) {
				if (this.socket !== undefined && this.socket.connected) {
					this.socket.send(cmd);
				} else {
					this.debug('Socket not connected :(');
				}
			}
		}
	}

	init() {
		//console.log("PIXTIMER PRO | INIT START")
		debug = this.debug
		log = this.log

		// Update the config
		this.updateConfig()
	}

	initTCP() {
		//console.log("PIXTIMER PRO | INIT TCP")

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.config.port === undefined) {
			this.config.port = 9756
		}

		//console.log("PIXTIMER PRO | INIT TCP", this.config.host)
		this.log('info', 'PIXTIMER PRO | INIT TCP : ' + this.config.host)

		if (this.config.host) { //!= undefined
			this.log('info', `Opening connection to ${this.config.host}:${this.config.port}`);

			this.socket = new tcp(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				if (this.config.verbose) {
					this.log('debug', 'Status change: ' + message);
				}
				this.status(status, message)
			})

			this.socket.on('error', (err) => {
				if (this.config.verbose) {
					this.log('warn', 'Error: ' + err);
				}

				this.debug('Network error', err);
			})

			this.socket.on('connect', () => {
				this.debug('Connected')
			})

			this.socket.on('data', function (data) { });
		}
	}

	updateConfig(config) {
		//console.log("PIXTIMER PRO | UPDATE CONGIG START")

		if (config) {
			this.config = config
		}

		// Update TCP
		this.initTCP()

		// UPDATE ACTIONS
		this.setActions(this.getActions())

		// UPDATE PRESETS
		this.setPresetDefinitions(this.getPresets())
	}


	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		this.debug('destroy', this.id)
	}
}
exports = module.exports = PixtimerProInstance