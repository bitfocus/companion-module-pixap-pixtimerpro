const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		speaker_play_status: {
			name: 'Speaker change style based on Stop/Play/Pause status',
			type: 'boolean',
			label: 'Speaker Stop/Play/Pause status',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'speaker_play',
					type: 'dropdown',
					label: 'Status',
					default: 0,
					choices: [
						{ id: 0, label: 'Stop' },
						{ id: 1, label: 'Playing' },
						{ id: 2, label: 'Paused' },
					],
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | SPEAKER PLAY STATUS >>>', feedback.options.speaker_play)
				if (self.pixtimerdata.states.speakerPlaying === feedback.options.speaker_play) {
					return true
				}
			},
		},
		session_play_status: {
			name: 'Session change style based on Stop/Play/Pause status',
			type: 'boolean',
			label: 'Session Stop/Play/Pause status',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'session_play',
					type: 'dropdown',
					label: 'Status',
					default: 0,
					choices: [
						{ id: 0, label: 'Stop' },
						{ id: 1, label: 'Playing' },
						{ id: 2, label: 'Paused' },
					],
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | SESSION PLAY STATUS >>>', feedback.options.session_play)
				if (self.pixtimerdata.states.sessionPlaying === feedback.options.session_play) {
					return true
				}
			},
		},
		all_play_status: {
			name: 'All change style based on Stop/Play/Pause status',
			type: 'boolean',
			label: 'All Stop/Play/Pause status',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'all_play',
					type: 'dropdown',
					label: 'Status',
					default: 0,
					choices: [
						{ id: 0, label: 'Stop' },
						{ id: 1, label: 'Playing' },
						{ id: 2, label: 'Paused' },
					],
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | ALL PLAY STATUS >>>', feedback.options.all_play)
				if (self.pixtimerdata.states.allPlaying === feedback.options.all_play) {
					return true
				}
			},
		},
		current_speaker: {
			name: 'Current Speaker ID Change',
			type: 'boolean',
			label: 'Current Speaker ID Change',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'current_speaker',
					type: 'number',
					label: 'ID',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | Current Speaker ID Change >>>', feedback.options.current_speaker)
				if (self.pixtimerdata.states.currentSpeaker === feedback.options.current_speaker) {
					return true
				}
			},
		},
		current_session: {
			name: 'Current Session ID Change',
			type: 'boolean',
			label: 'Current Session ID Change',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'current_session',
					type: 'number',
					label: 'ID',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | Current Session ID Change >>>', feedback.options.current_session)
				if (self.pixtimerdata.states.currentSession === feedback.options.current_session) {
					return true
				}
			},
		},
		blackout: {
			name: 'Blackout Show/Hide',
			type: 'boolean',
			label: 'Blackout Show/Hide',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'blackout',
					type: 'number',
					label: 'Status',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | Blackout Change >>>', feedback.options.blackout)
				if (self.pixtimerdata.states.blackout === feedback.options.blackout) {
					return true
				}
			},
		},
		message_show: {
			name: 'Message Show/Hide',
			type: 'boolean',
			label: 'Message Show/Hide',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'message_show',
					type: 'number',
					label: 'Status',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | MESSAGE SHOW Change >>>', feedback.options.message_show)
				if (self.pixtimerdata.states.messageShow === feedback.options.message_show) {
					return true
				}
			},
		},
		switch_timer_clock: {
			name: 'Switch Timer Clock',
			type: 'boolean',
			label: 'Switch Timer Clock',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'switch_timer_clock',
					type: 'number',
					label: 'Status',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | MESSAGE SHOW Change >>>', feedback.options.message_show)
				if (self.pixtimerdata.states.switchTimerClock === feedback.options.switch_timer_clock) {
					return true
				}
			},
		},
		ndi_start: {
			name: 'NDI Start',
			type: 'boolean',
			label: 'NDI Start',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					id: 'ndi_start',
					type: 'number',
					label: 'Status',
					default: 0,
				},
			],
			callback: (feedback) => {
				//console.log('FEEDBACK | NDI START >>>', feedback.options.ndi_start)
				if (self.pixtimerdata.states.ndiStart === feedback.options.ndi_start) {
					return true
				}
			},
		},
	})
}
