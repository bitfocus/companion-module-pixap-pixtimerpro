const { Regex } = require('@companion-module/base')
module.exports = {
	getActions() {
		const actions = {} 

		let CHOICES_TIMER_PRESETS = []
		Object.keys(this.pixtimerdata.presets).forEach((key) => {
			// console.log(key, this.pixtimerdata.presets[key])
			CHOICES_TIMER_PRESETS.push({
				label: this.pixtimerdata.presets[key].name,
				id: this.pixtimerdata.presets[key].id,
				sort: this.pixtimerdata.presets[key].id,
			})
		})

		let CHOICES_MESSAGE_PRESETS = []
		Object.keys(this.pixtimerdata.messages).forEach((key) => {
			// console.log(key, this.pixtimerdata.messages[key])
			CHOICES_MESSAGE_PRESETS.push({
				label: this.pixtimerdata.messages[key].name,
				id: this.pixtimerdata.messages[key].id,
				sort: this.pixtimerdata.messages[key].id,
			})
		})

		// BLACKOUT
		let CHOICES_BLACKOUT = []
		Object.keys(this.pixtimerdata.blackoutArray).forEach((key) => {
			CHOICES_BLACKOUT.push({
				label: this.pixtimerdata.blackoutArray[key].name,
				id: this.pixtimerdata.blackoutArray[key].id,
				sort: this.pixtimerdata.blackoutArray[key].id,
			})
		})

		// PBP GOTO
		let CHOICES_PBP_GOTO = []
		Object.keys(this.pixtimerdata.gotoArray).forEach((key) => {
			CHOICES_PBP_GOTO.push({
				label: this.pixtimerdata.gotoArray[key].name,
				id: this.pixtimerdata.gotoArray[key].id,
				sort: this.pixtimerdata.gotoArray[key].id,
			})
		})

		// TIMER
		actions['recall_timer_preset'] = {
			name: 'Recall timer preset',
			options: [
				{
					id: 'recall_timer_preset',
					type: 'dropdown',
					label: 'Cue',
					minChoicesForSearch: 5,
					choices: CHOICES_TIMER_PRESETS.sort((a, b) => a.sort - b.sort),
					default: '0',
				},
			],
			callback: async (event) => {
				this.log('info', 'Recall timer preset >>>', event.options.recall_timer_preset)
				await this.sendCommand('PST ' + event.options.recall_timer_preset)
			},
		}
		actions['speaker_timer_play'] = {
			name: 'Speaker Timer Play',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer speaker play !')
				await this.sendCommand('PST PLAY')
			},
		}
		actions['speaker_timer_pause'] = {
			name: 'Speaker Timer Pause',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer speaker Pause !')
				await this.sendCommand('PST BREAK')
			},
		}
		actions['speaker_timer_stop'] = {
			name: 'Speaker Timer Stop',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer speaker stop !')
				await this.sendCommand('PST STOP')
			},
		}
		actions['speaker_timer_flash'] = {
			name: 'Speaker Timer Flash',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer speaker Flash !')
				await this.sendCommand('PST FLASH')
			},
		}
		actions['session_timer_play'] = {
			name: 'Session Timer Play',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer session play !')
				await this.sendCommand('PSTS PLAY')
			},
		}
		actions['session_timer_pause'] = {
			name: 'Session Timer Pause',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer session Pause !')
				await this.sendCommand('PSTS BREAK')
			},
		}
		actions['session_timer_stop'] = {
			name: 'Session Timer Stop',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer session stop !')
				await this.sendCommand('PSTS STOP')
			},
		}
		actions['session_timer_flash'] = {
			name: 'Session Timer Flash',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer session flash !')
				await this.sendCommand('PSTS FLASH')
			},
		}
		actions['all_timer_play'] = {
			name: 'All Timer Play',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer all play !')
				await this.sendCommand('PSTA PLAY')
			},
		}
		actions['all_timer_pause'] = {
			name: 'All Timer Pause',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer all Pause !')
				await this.sendCommand('PSTA BREAK')
			},
		}
		actions['all_timer_stop'] = {
			name: 'All Timer Stop',
			options: [],
			callback: async (event) => {
				this.log('info', 'Timer all stop !')
				await this.sendCommand('PSTA STOP')
			},
		}
		// MESSAGE
		actions['recall_message_preset'] = {
			name: 'Recall message preset',
			options: [
				{
					id: 'recall_message_preset',
					type: 'dropdown',
					label: 'Cue',
					minChoicesForSearch: 5,
					choices: CHOICES_MESSAGE_PRESETS.sort((a, b) => a.sort - b.sort),
					default: '0',
				},
			],
			callback: async (event) => {
				//this.log('info', 'Recall messsage preset >>>', event.options.recall_message_preset)
				await this.sendCommand('PSTM ' + event.options.recall_message_preset)
			},
		}
		actions['message_show'] = {
			name: 'Message show',
			options: [],
			callback: async (event) => {
				//this.log('info', `Message show >>> ${this.pixtimerdata.states.messageShow}`)
				if (this.pixtimerdata.states.messageShow === 0) {
					await this.sendCommand('PSTM SHOW')
				} else {
					await this.sendCommand('PSTM HIDE')
				}
			},
		}

		// BLACKOUT
		actions['blackout'] = {
			name: 'Blackout',
			options: [],
			callback: async (event) => {
				//this.log('info', `ACTIONS Black show >>> ${this.pixtimerdata.states.blackout}`)
				if (this.pixtimerdata.states.blackout === 0) {
					await this.sendCommand('BLACK SHOW')
				} else {
					await this.sendCommand('BLACK HIDE')
				}
			},
		}

		// SPEAKER AJUSTE TIME
		actions['speaker_adjust_time'] = {
            name: 'Adjust Speaker Timer',
            options: [
                {
                    type: 'textinput',
                    label: 'Time in second',
                    id: 'time',
                    regex: this.REGEX_SIGNED_NUMBER,
                },
            ],
			callback: async (event) => {
				//this.log('info', 'Adjust Speaker Timer !')
				await this.sendCommand('ADJT ' + event.options.time)
			},
        };

		// TIMER CLOCK
		actions['timer_clock'] = {
			name: 'Switch Timer clock',
			options: [],
			callback: async (event) => {
				//this.log('info', 'Switch Timer & clock !')
				await this.sendCommand('SWTC')
			},
		}

		// EXTERNAL TIMER
		actions['external_timer_Play'] = {
			name: 'External Timer and Play',
			options: [
                {
                    type: 'textinput',
                    label: 'External Timer and Play',
                    id: 'time',
                    default: " 00:00:00",
                    regex: "/^(0*[0-9]|1[0-9]|2[0-4]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60)$/",
                    required: true,
                }
            ],
			callback: async (event) => {
				//this.log('info', 'External Timer and Play !')
				await this.sendCommand('CTD ' + event.options.time + " PLAY")
			},
		}
		actions['external_timer'] = {
			name: 'External Timer',
			options: [
                {
                    type: 'textinput',
                    label: 'External Timer',
                    id: 'time',
                    default: " 00:00:00",
                    regex: "/^(0*[0-9]|1[0-9]|2[0-4]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60)$/",
                    required: true,
                }
            ],
			callback: async (event) => {
				//this.log('info', 'External Timer !')
				await this.sendCommand('CTD ' + event.options.time)
			},
		}
		actions['external_play'] = {
			name: 'External Play',
			options: [],
			callback: async (event) => {
				this.log('info', 'External Play !')
				await this.sendCommand('CTD PLAY' )
			},
		}
		actions['external_stop'] = {
			name: 'External Stop',
			options: [],
			callback: async (event) => {
				this.log('info', 'External Stop !')
				await this.sendCommand('CTD STOP')
			},
		}

		// NDI
		actions['ndi_startStop'] = {
			name: 'NDI start & stop',
			options: [],
			callback: async (event) => {
				this.log('info', 'NDI start & stop !')
				await this.sendCommand('NDI ED')
			},
		}

		// PBP+
		actions['pbp_main_enable'] = {
			name: 'PlaybackPro main enable',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro main enable !')
				await this.sendCommand('PBPM ED')
			},
		}
		actions['pbp_backup_enable'] = {
			name: 'PlaybackPro backup enable',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro backup enable !')
				await this.sendCommand('PBPB ED')
			},
		}
		actions['pbp_master_take'] = {
			name: 'PlaybackPro master take',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master take !')
				await this.sendCommand('PBPG TAKE')
			},
		}
		actions['pbp_master_endall'] = {
			name: 'PlaybackPro master endall',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master endall !')
				await this.sendCommand('PBPG ENDALL')
			},
		}
		actions['pbp_master_previous'] = {
			name: 'PlaybackPro master previous',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master previous !')
				await this.sendCommand('PBPG PREVC')
			},
		}
		actions['pbp_master_next'] = {
			name: 'PlaybackPro master next',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master next !')
				await this.sendCommand('PBPG NEXTC')
			},
		}
		actions['pbp_master_play'] = {
			name: 'PlaybackPro master play',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master play !')
				await this.sendCommand('PBPG PLAY')
			},
		}
		actions['pbp_master_pause'] = {
			name: 'PlaybackPro master pause',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master pause !')
				await this.sendCommand('PBPG PAUSE')
			},
		}
		actions['pbp_master_goto10'] = {
			name: 'PlaybackPro master goto 10',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master goto 10 !')
				await this.sendCommand('PBPG GOTO 10')
			},
		}
		actions['pbp_master_goto20'] = {
			name: 'PlaybackPro master goto 20',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master goto 20 !')
				await this.sendCommand('PBPG GOTO 20')
			},
		}
		actions['pbp_master_goto30'] = {
			name: 'PlaybackPro master goto 30',
			options: [],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master goto 30 !')
				await this.sendCommand('PBPG GOTO 30')
			},
		}
		actions['pbp_master_goto'] = {
			name: 'PlaybackPro master goto',
			options: [
				{
					id: 'pbp_master_goto',
					type: 'dropdown',
					label: 'Goto',
					minChoicesForSearch: 5,
					choices: CHOICES_PBP_GOTO.sort((a, b) => a.sort - b.sort),
					default: '0',
				},
			],
			callback: async (event) => {
				this.log('info', 'PlaybackPro master goto 30 !')
				await this.sendCommand('PBPG GOTO ' + event.options.pbp_master_goto)
			},
		}

		return actions
	},
}
