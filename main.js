const { InstanceBase, Regex, runEntrypoint, InstanceStatus, TCPHelper, combineRgb } = require('@companion-module/base')
const configFields = require('./configFields')
const presets = require('./presets')
const actions = require('./actions')
const pixtimerpro = require('./pixap-pixtimerpro')
const UpgradeScripts = require('./upgrades')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class PixtimerProInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		Object.assign(this, {
			...configFields,
			...presets,
			...actions,
			...pixtimerpro,
		})

		this.adjustArray = [1, 5, 10, 20, 30]
	}

	async init(config) {
		this.config = config
		this.pixtimerdata = {
			presets: [],
			messages: [],
			gotoArray: [
				{ id: 10, name: 'Goto 10' },
				{ id: 20, name: 'Goto 20' },
				{ id: 30, name: 'Goto 30' },
			],
			blackoutArray: [
				{ id: 'toogle', name: 'Toogle' },
				{ id: 'show', name: 'Show' },
				{ id: 'hide', name: 'Hide' },
			],
			states: {},
		}

		this.updateStatus(InstanceStatus.Ok)
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.init_tcp()
		this.refreshTcpTimer()

		this.setVariableValues({ speaker_timer: '00:00:00' })
		this.setVariableValues({ speaker_timer_ms: '00:00' })
		this.setVariableValues({ speaker_timer_h: '00' })
		this.setVariableValues({ speaker_timer_m: '00' })
		this.setVariableValues({ speaker_timer_s: '00' })

		this.setVariableValues({ session_timer: '00:00:00' })
		this.setVariableValues({ session_timer_ms: '00:00' })
		this.setVariableValues({ session_timer_h: '00' })
		this.setVariableValues({ session_timer_m: '00' })
		this.setVariableValues({ session_timer_s: '00' })

		this.setVariableValues({ external_timer: '00:00:00' })
		this.setVariableValues({ external_timer_ms: '00:00' })
		this.setVariableValues({ external_timer_h: '00' })
		this.setVariableValues({ external_timer_m: '00' })
		this.setVariableValues({ external_timer_s: '00' })
	}

	refreshTcpTimer() {
		if (!this.config.enableTimerPort) {
			if (this.socketTimer !== undefined) {
				this.socketTimer.destroy()
				delete this.socketTimer
			}
		} else this.init_tcp_timer()
	}

	// When module gets deleted
	async destroy() {
		this.socket.destroy()
		this.socketTimer.destroy()
		this.log('info', 'destroy', this.id)
	}

	async configUpdated(config) {
		let resetConnection = false
		let resetConnectionTimer = false

		if (this.config.host != config.host) {
			resetConnection = true
		}

		if (this.config.enableTimerPort) {
			resetConnectionTimer = true
		} else {
			resetConnectionTimer = true
		}

		this.config = config
		if (resetConnection || !this.socket) {
			this.init_tcp()
		}
		if (resetConnectionTimer || !this.socketTimer) {
			this.refreshTcpTimer()
		}
		this.setActionDefinitions(this.getActions())
		this.setPresetDefinitions(this.getPresets())
	}

	async sendCommand(cmd) {
		if (cmd) {
			this.log('debug', `sending ${cmd} to ${this.config.host}`)
			await this.socket.send(cmd)
		}
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	init_tcp() {
		this.log('info', `PIXTIMER PRO | INIT TCP CONTROL >>> ${this.config.host} ${this.config.port}`)

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.config.port === undefined) {
			this.config.port = 9756
		}

		if (this.config.host) {
			//!= undefined
			this.log('info', `TCP CONTROL | Opening connection to ${this.config.host}:${this.config.port}`)

			this.socket = new TCPHelper(this.config.host, this.config.port, { reconnect: true })

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
				//this.log('info', `TCP CONTROL | Status  update >>> ${status} | ${message}`)
			})

			this.socket.on('error', (err) => {
				this.updateStatus(InstanceStatus.UnknownError, err.message)
				this.log('error', 'TCP CONTROL | Network error: ' + err.message)
			})

			let receivebuffer = ''
			this.socket.on('connect', () => {
				this.updateStatus(InstanceStatus.Ok)
				//this.log('info', 'Connected')

				receivebuffer = ''

				this.socket.send('NC\n').catch((e) => {
					this.log('error', `TCP CONTROL | Socket error: ${e}`)
				})
			})

			this.socket.on('data', (chunk) => {
				let i = 0
				let line = ''
				let offset = 0
				receivebuffer += chunk.toString()
				while ((i = receivebuffer.indexOf('\n', offset)) !== -1) {
					line = receivebuffer.slice(offset, i)
					//this.log('info', 'RECEIVE DATA LINE >>> ' + line.toString())
					offset = i + 1
					this.socket.emit('receiveline', line)
				}
				receivebuffer = receivebuffer.slice(offset)
				//this.log('info', 'RECEIVE DATA >>> ' + receivebuffer.toString())
			})

			this.socket.on('receiveline', (data) => {
				//const info = data.toString().split("/")
				this.log('warn', `TCP CONTROL | RECEIVE LINE >>> ${data.toString()}`)

				// TIMER LIST
				if (data.toString().slice(0, 5) === 'timer') {
					this.pixtimerdata.presets = this.getTimerPresetList(data)
					this.setActionDefinitions(this.getActions())
					this.setPresetDefinitions(this.getPresets())
				}

				// MESSAGE LIST
				if (data.toString().slice(0, 7) === 'message') {
					this.pixtimerdata.messages = this.getMessagePresetList(data)
					this.setActionDefinitions(this.getActions())
					this.setPresetDefinitions(this.getPresets())
				}

				if (data.toString().slice(0, 3) === 'pts') {
					// CURRENT PRESET SESSION
					//this.log('info', `TCP CONTROL | RECEIVE LINE | CURRENT SESSION PRESET >>> ${data.toString().slice(4)}`)
					this.pixtimerdata.states.currentSession = parseInt(data.toString().slice(4))
					this.setVariableValues({ session_current: this.pixtimerdata.states.currentSession })
					this.checkFeedbacks('current_session')
				} else if (data.toString().slice(0, 2) === 'pt') {
					// CURRENT PRESET SPEAKER
					//this.log('info', `TCP CONTROL | RECEIVE LINE | CURRENT SPEAKER PRESET >>> ${data.toString().slice(3)}`)
					this.pixtimerdata.states.currentSpeaker = parseInt(data.toString().slice(3))
					this.setVariableValues({ speaker_current: this.pixtimerdata.states.currentSpeaker })
					this.checkFeedbacks('current_speaker')
				}

				// MESSAGE SHOW
				if (data.toString().slice(0, 3) === 'cmv') {
					//this.log('info', `TCP CONTROL | RECEIVE LINE | MESSAGE SHOW >>> ${data.toString().slice(4)}`)
					this.pixtimerdata.states.messageShow = parseInt(data.toString().slice(4))
					this.setVariableValues({ message_show: this.pixtimerdata.states.messageShow })
					this.checkFeedbacks('message_show')
				}

				// SWITCH TIMER CLOCK
				if (data.toString().slice(0, 4) === 'SWTC') {
					//this.log('error', `TCP CONTROL | RECEIVE LINE | SWITCH TIMER CLOCK >>> ${data.toString().slice(5)}`)
					this.pixtimerdata.states.switchTimerClock = parseInt(data.toString().slice(5))
					this.setVariableValues({ switch_timer_clock: this.pixtimerdata.states.switchTimerClock })
					this.checkFeedbacks('switch_timer_clock')
				}

				// SPEAKER PLAY
				if (data.toString().slice(0, 4) === 'play') {
					//this.log('error', `TCP CONTROL | RECEIVE LINE | SPEAKER PLAY STATUS >>> ${data.toString().slice(5)}`)
					this.pixtimerdata.states.speakerPlaying = parseInt(data.toString().slice(5))
					this.setVariableValues({ speaker_play_status: this.pixtimerdata.states.speakerPlaying })
					this.checkFeedbacks('speaker_play_status')
				}

				// SESSION PLAY
				if (data.toString().slice(0, 5) === 'splay') {
					//this.log('error', `TCP CONTROL | RECEIVE LINE | SPEAKER PLAY STATUS >>> ${data.toString().slice(6)}`)
					this.pixtimerdata.states.sessionPlaying = parseInt(data.toString().slice(6))
					this.setVariableValues({ session_play_status: this.pixtimerdata.states.sessionPlaying })
					this.checkFeedbacks('session_play_status')
				} else if (data.toString().slice(0, 5) === 'black') {
					this.log('error', `TCP CONTROL | RECEIVE LINE | BLACKOUT STATUS >>> ${data.toString().slice(6)}`)
					if (data.toString().slice(6) === "false") {
						this.pixtimerdata.states.blackout = 0
					} else if (data.toString().slice(6) === "true") {
						this.pixtimerdata.states.blackout = 1
					} else this.pixtimerdata.states.blackout = parseInt(data.toString().slice(6))
					this.setVariableValues({ blackout: this.pixtimerdata.states.blackout })
					this.checkFeedbacks('blackout')
				}

				// NDI
				if (data.toString().slice(0, 5) === 'NDIST') {
					//this.log('error', `TCP CONTROL | RECEIVE LINE | NDI STATUS >>> ${data.toString().slice(6)}`)
					this.pixtimerdata.states.ndiStart = parseInt(data.toString().slice(6))
					this.setVariableValues({ ndi_start: this.pixtimerdata.states.ndiStart })
					this.checkFeedbacks('ndi_start')
				}

				// ALL PLAYING
				if (this.pixtimerdata.states.speakerPlaying === 1 && this.pixtimerdata.states.sessionPlaying === 1) {
					this.pixtimerdata.states.allPlaying = 1
				} else if (this.pixtimerdata.states.speakerPlaying === 2 && this.pixtimerdata.states.sessionPlaying === 2) {
					this.pixtimerdata.states.allPlaying = 2
				} else {
					this.pixtimerdata.states.allPlaying = 0
				}
				this.setVariableValues({ all_play_status: this.pixtimerdata.states.allPlaying })
				this.checkFeedbacks('all_play_status')

				if (data.toString().slice(0, 2) === 'pn') {
					// PROJECT NAME
					//this.log('info', `TCP CONTROL | RECEIVE LINE | PROJECT NAME >>> ${data.toString().slice(3)}`)
					this.pixtimerdata.states.projectName = data.toString().slice(3)
					this.setVariableValues({ project_name: this.pixtimerdata.states.projectName })
					//this.checkFeedbacks('current_speaker')
				}
			})
		}
	}

	// TCP TIMER
	init_tcp_timer() {
		this.log('info', `PIXTIMER PRO | INIT TCP TIMER >>> ${this.config.host} ${this.config.portTimer}`)

		if (this.socketTimer !== undefined) {
			this.socketTimer.destroy()
			delete this.socketTimer
		}

		if (this.config.portTimer === undefined) {
			this.config.portTimer = 9758
		}

		if (this.config.host) {
			//!= undefined
			this.log('info', `TCP TIMER | Opening timer connection to ${this.config.host}:${this.config.portTimer}`)

			this.socketTimer = new TCPHelper(this.config.host, this.config.portTimer, { reconnect: true })

			this.socketTimer.on('status_change', (status, message) => {
				this.updateStatus(status, message)
				//this.log('info', `TCP CONTROL | Status  update >>> ${status} | ${message}`)
			})

			this.socketTimer.on('error', (err) => {
				this.updateStatus(InstanceStatus.UnknownError, err.message)
				this.log('error', `TCP TIMER | Network error >>> ${err.message} | Please Check Dungle`)
			})

			let receivebuffer = ''
			this.socketTimer.on('connect', () => {
				this.updateStatus(InstanceStatus.Ok)
				//this.log('info', 'TCP TIMER | TIMER Connected')

				receivebuffer = ''

				this.socketTimer.send('NC\n').catch((e) => {
					this.log('error', `TCP TIMER | Socket error: ${e}`)
				})

				this.setVariableValues({ external_timer: 'STOP' })
				this.setVariableValues({ external_timer_ms: 'STOP' })
				this.setVariableValues({ external_timer_h: 'STOP' })
				this.setVariableValues({ external_timer_m: 'STOP' })
				this.setVariableValues({ external_timer_s: 'STOP' })
			})

			this.socketTimer.on('data', (chunk) => {
				let i = 0
				let line = ''
				let offset = 0
				receivebuffer += chunk.toString()
				while ((i = receivebuffer.indexOf('\n', offset)) !== -1) {
					line = receivebuffer.slice(offset, i)
					//this.log('info', 'TCP TIMER | RECEIVE TIMER DATA LINE >>> ' + line.toString())
					offset = i + 1
					this.socketTimer.emit('receiveTimerline', line)
				}
				receivebuffer = receivebuffer.slice(offset)
				//this.log('info', 'TCP TIMER | RECEIVE TIMER DATA >>> ' + receivebuffer.toString())
			})

			this.socketTimer.on('receiveTimerline', (data) => {
				//const info = data.toString().split("/")
				//this.log('warn', `TCP TIMER | RECEIVE TIMER LINE >>> ${data.toString()}`)
				if (data.toString().slice(0, 1) === 'H') {
					this.log('warn', `RECEIVE TIMER LINE >>> ${data.toString().slice(2)}`)
					let speakerTimerArray = data.toString().slice(2).split(':')
					this.setVariableValues({ speaker_timer: data.toString().slice(2) })
					this.setVariableValues({ speaker_timer_ms: `${speakerTimerArray[1]}:${speakerTimerArray[2]}` })
					this.setVariableValues({ speaker_timer_h: speakerTimerArray[0] })
					this.setVariableValues({ speaker_timer_m: speakerTimerArray[1] })
					this.setVariableValues({ speaker_timer_s: speakerTimerArray[2] })
				}

				if (data.toString().slice(0, 1) === 'S') {
					//this.log('warn', `TCP TIMER | RECEIVE TIMER LINE >>> ${data.toString().slice(2)}`)
					let sessionTimerArray = data.toString().slice(2).split(':')
					this.setVariableValues({ session_timer: data.toString().slice(2) })
					this.setVariableValues({ session_timer_ms: `${sessionTimerArray[1]}:${sessionTimerArray[2]}` })
					this.setVariableValues({ session_timer_h: sessionTimerArray[0] })
					this.setVariableValues({ session_timer_m: sessionTimerArray[1] })
					this.setVariableValues({ session_timer_s: sessionTimerArray[2] })
				}

				if (data.toString().slice(0, 1) === 'V') {
					//this.log('warn', `TCP TIMER | RECEIVE EXTERNAL TIMER LINE >>> ${data.toString()}`) // || data.toString().slice(2) === "STOP"
					let externalTimerArray = data.toString().slice(2).split(':')
					if (data.toString().slice(2) === 'stop') {
						this.setVariableValues({ external_timer: 'STOP' })
						this.setVariableValues({ external_timer_ms: 'STOP' })
						this.setVariableValues({ external_timer_h: 'STOP' })
						this.setVariableValues({ external_timer_m: 'STOP' })
						this.setVariableValues({ external_timer_s: 'STOP' })
					} else {
						this.setVariableValues({
							external_timer: `${externalTimerArray[0]}:${externalTimerArray[1]}:${externalTimerArray[2]}`,
						})
						this.setVariableValues({ external_timer_ms: `${externalTimerArray[1]}:${externalTimerArray[2]}` })
						this.setVariableValues({ external_timer_h: externalTimerArray[0] })
						this.setVariableValues({ external_timer_m: externalTimerArray[1] })
						this.setVariableValues({ external_timer_s: externalTimerArray[2] })
					}
				}
			})
		}
	}
}

runEntrypoint(PixtimerProInstance, UpgradeScripts)
