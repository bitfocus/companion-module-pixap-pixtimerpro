const { combineRgb } = require('@companion-module/base')
module.exports = {
	getPresets() {
		const presets = {}

		const colorWhite = [255, 255, 255]
		const colorBlack = [0, 0, 0]
		const colorRed = [242, 13, 13]
		const colorGreen = [58, 213, 61]
		const colorBlue = [0, 0, 200]
		const colorOrange = [255, 85, 0]
		const colorpixBlue = [48, 132, 208]
		const colorWarning = [242, 175, 13]
		const colorInfo = [23, 162, 184]

		// TIMERS
		// lOAD PRESET TIMER FROM PIXTIMER PRO
		Object.keys(this.pixtimerdata.presets).forEach((key) => {
			//this.log('debug', `PRESET | Cue >>> ${this.pixtimerdata.presets[key].name}_${key}`)
			const rgb = this.pixtimerdata.presets[key].color
			presets[`${this.pixtimerdata.presets[key].name}`] = {
				type: 'button',
				category: 'Timer Presets',
				style: {
					text: this.pixtimerdata.presets[key].name,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
					png64: this.pixtimerdata.presets[key].speaker ? ICON_SESSION_SMALL : ICON_SPEAKER_SMALL,
					pngalignment: 'left:bottom',
				},
				steps: [
					{
						down: [
							{
								actionId: 'recall_timer_preset',
								options: {
									recall_timer_preset: this.pixtimerdata.presets[key].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'current_speaker',
						options: {
							current_speaker: this.pixtimerdata.presets[key].id,
						},
						style: {
							bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
						},
					},
					{
						feedbackId: 'current_session',
						options: {
							current_session: this.pixtimerdata.presets[key].id,
						},
						style: {
							bgcolor: combineRgb(colorOrange[0], colorOrange[1], colorOrange[2]),
						},
					},
				],
			}
		})

		// SPEAKER PLAY PAUSE STOP
		presets['Speaker Play'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PLAY_SPEAKER,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'speaker_timer_play',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'speaker_play_status',
					options: {
						speaker_play: 1,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
			],
		}
		presets['Speaker Pause'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PAUSE_SPEAKER,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'speaker_timer_pause',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'speaker_play_status',
					options: {
						speaker_play: 2,
					},
					style: {
						bgcolor: combineRgb(colorWarning[0], colorWarning[1], colorWarning[2]),
					},
				},
			],
		}
		presets['Speaker Stop'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_STOP_SPEAKER,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'speaker_timer_stop',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'speaker_play_status',
					options: {
						speaker_play: 0,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		presets['Speaker Flash'] = {
			type: 'button',
			category: 'Effect',
			style: {
				text: 'Speaker Flash',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorpixBlue[0], colorpixBlue[1], colorpixBlue[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'speaker_timer_flash',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		// SESSION PLAY PAUSE STOP
		presets['Session Play'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PLAY_SESSION,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'session_timer_play',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'session_play_status',
					options: {
						session_play: 1,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
			],
		}
		presets['Session Pause'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PAUSE_SESSION,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'session_timer_pause',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'session_play_status',
					options: {
						session_play: 2,
					},
					style: {
						bgcolor: combineRgb(colorWarning[0], colorWarning[1], colorWarning[2]),
					},
				},
			],
		}
		presets['Session Stop'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_STOP_SESSION,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'session_timer_stop',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'session_play_status',
					options: {
						session_play: 0,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		presets['Session Flash'] = {
			type: 'button',
			category: 'Effect',
			style: {
				text: 'Session Flash',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorpixBlue[0], colorpixBlue[1], colorpixBlue[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'session_timer_flash',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		// ALL PLAY PAUSE STOP
		presets['ALL Play'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PLAY_ALL,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'all_timer_play',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'all_play_status',
					options: {
						all_play: 1,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
			],
		}
		presets['ALL Pause'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_PAUSE_ALL,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'all_timer_pause',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'all_play_status',
					options: {
						all_play: 2,
					},
					style: {
						bgcolor: combineRgb(colorWarning[0], colorWarning[1], colorWarning[2]),
					},
				},
			],
		}
		presets['ALL Stop'] = {
			type: 'button',
			category: 'General',
			style: {
				text: '',
				png64: ICON_STOP_ALL,
				pngalignment: 'center:center',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'all_timer_stop',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'all_play_status',
					options: {
						all_play: 0,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		// MESSAGES
		// lOAD PRESET MESSAGE FROM PIXTIMER PRO
		Object.keys(this.pixtimerdata.messages).forEach((key) => {
			let rgb = this.pixtimerdata.messages[key].color
			if (rgb === null) rgb = [0, 0, 0]
			presets[`${this.pixtimerdata.messages[key].name}`] = {
				type: 'button',
				category: 'Message Presets',
				style: {
					text: this.pixtimerdata.messages[key].name,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				},
				steps: [
					{
						down: [
							{
								actionId: 'recall_message_preset',
								options: {
									recall_message_preset: this.pixtimerdata.messages[key].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		})
		presets['Message Show'] = {
			type: 'button',
			category: 'General',
			style: {
				text: 'Show Message',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorGreen[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'message_show',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'message_show',
					options: {
						message_show: 0,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
				{
					feedbackId: 'message_show',
					options: {
						message_show: 1,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		// BLACKOUT
		presets['Blackout'] = {
			type: 'button',
			category: 'General',
			style: {
				text: 'Blackout',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorGreen[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'blackout',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'blackout',
					options: {
						blackout: 0,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
				{
					feedbackId: 'blackout',
					options: {
						blackout: 1,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		// ADJUST TIME
		for (let ajt = 0; ajt < this.adjustArray.length; ajt++) {
			var t = this.adjustArray[ajt]
			//this.log('debug', `PRESETS | ADJUSTE TIME >>> ${this.adjustArray[ajt] * 60}`)
			presets[`Adjust Speaker Timer ${this.adjustArray[ajt] * 60}`] = {
				type: 'button',
				category: 'Adjust Timer',
				style: {
					text: `Speaker\n+${t}`,
					size: '14',
					color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
					bgcolor: combineRgb(colorInfo[0], colorInfo[1], colorInfo[2]),
				},
				steps: [
					{
						down: [
							{
								actionId: 'speaker_adjust_time',
								options: {
									time: '' + t * 60,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}

		for (let ajtn = 0; ajtn < this.adjustArray.length; ajtn++) {
			var t = this.adjustArray[ajtn]
			//this.log('debug', `PRESETS | ADJUSTE TIME >>> -${this.adjustArray[ajtn] * 60}`)
			presets[`Adjust Speaker Timer -${this.adjustArray[ajtn] * 60}`] = {
				type: 'button',
				category: 'Adjust Timer',
				style: {
					text: `Speaker\n-${t}`,
					size: '14',
					color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
					bgcolor: combineRgb(colorInfo[0], colorInfo[1], colorInfo[2]),
				},
				steps: [
					{
						down: [
							{
								actionId: 'speaker_adjust_time',
								options: {
									time: '-' + t * 60,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}

		// TIMER CLOCK
		presets['Switch Timer Clock'] = {
			type: 'button',
			category: 'General',
			style: {
				text: 'Switch Timer',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorpixBlue[0], colorpixBlue[1], colorpixBlue[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'timer_clock',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'switch_timer_clock',
					options: {
						switch_timer_clock: 0,
					},
					style: {
						text: 'Switch Timer',
						bgcolor: combineRgb(colorpixBlue[0], colorpixBlue[1], colorpixBlue[2]),
					},
				},
				{
					feedbackId: 'switch_timer_clock',
					options: {
						switch_timer_clock: 1,
					},
					style: {
						text: 'Switch Clock',
						bgcolor: combineRgb(colorOrange[0], colorOrange[1], colorOrange[2]),
					},
				},
			],
		}

		// EXTERNAL TIMER
		presets['External Timer and Play'] = {
			type: 'button',
			category: 'External Timer',
			style: {
				text: 'External Timer',
				size: '14',
				png64: ICON_PLAY,
				pngalignment: 'center:center',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'external_timer_Play',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Timer Play'] = {
			type: 'button',
			category: 'External Timer',
			style: {
				text: 'External Timer',
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorInfo[0], colorInfo[1], colorInfo[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'external_timer',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Stop'] = {
			type: 'button',
			category: 'External Timer',
			style: {
				text: 'External',
				size: '14',
				png64: ICON_STOP,
				pngalignment: 'center:center',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'external_stop',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Play'] = {
			type: 'button',
			category: 'External Timer',
			style: {
				text: 'External',
				size: '14',
				png64: ICON_PLAY,
				pngalignment: 'center:center',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'external_play',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		// VARIABLE SPEAKER
		presets['Speaker Variable'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Speaker\n$(piXtimer_Pro:speaker_timer)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Speaker Variable MS'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Speaker\nm:s\n$(piXtimer_Pro:speaker_timer_ms)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Speaker Variable Hour'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Speaker\nHour\n$(piXtimer_Pro:speaker_timer_h)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Speaker Variable Minute'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Speaker\nMinute\n$(piXtimer_Pro:speaker_timer_m)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Speaker Variable Second'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Speaker\nSecond\n$(piXtimer_Pro:speaker_timer_s)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}

		// VARIABLE SESSION
		presets['Session Variable'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Session\n$(piXtimer_Pro:session_timer)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Session Variable MS'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Session\nm:s\n$(piXtimer_Pro:session_timer_ms)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Session Variable Hour'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Session\nHour\n$(piXtimer_Pro:session_timer_h)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Session Variable Minute'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Session\nMinute\n$(piXtimer_Pro:session_timer_m)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['Session Variable Second'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `Session\nSecond\n$(piXtimer_Pro:session_timer_s)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}

		// VARIABLE EXTERNAL
		presets['External Variable'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `External\n$(piXtimer_Pro:external_timer)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Variable MS'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `External\nm:s\n$(piXtimer_Pro:external_timer_ms)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Variable Hour'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `External\nHour\n$(piXtimer_Pro:external_timer_h)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Variable Minute'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `External\nMinute\n$(piXtimer_Pro:external_timer_m)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['External Variable Second'] = {
			type: 'button',
			category: 'Variable',
			style: {
				text: `External\nSecond\n$(piXtimer_Pro:external_timer_s)`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
			},
			steps: [
				{
					down: [],
					up: [],
				},
			],
			feedbacks: [],
		}

		// NDI
		presets['NDI start stop'] = {
			type: 'button',
			category: 'NDI',
			style: {
				text: `NDI start & stop`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'ndi_startStop',
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'ndi_start',
					options: {
						ndi_start: 0,
					},
					style: {
						bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorRed[2]),
					},
				},
				{
					feedbackId: 'ndi_start',
					options: {
						ndi_start: 1,
					},
					style: {
						bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
					},
				},
			],
		}

		// PBP+
		presets['PlaybackPro main enable'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMain\nenable`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorInfo[0], colorInfo[1], colorInfo[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_main_enable',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro backup enable'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nBackup\nenable`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorInfo[0], colorInfo[1], colorInfo[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_backup_enable',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master take'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nTake`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorGreen[0], colorGreen[1], colorGreen[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_take',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master endall'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nEndAll`,
				size: '14',
				color: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				bgcolor: combineRgb(colorRed[0], colorRed[1], colorRed[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_endall',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master previous'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nPrevious`,
				size: '14',
				color: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
				bgcolor: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_previous',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master next'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nNext`,
				size: '14',
				color: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
				bgcolor: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_next',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master play'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nPlay`,
				size: '14',
				color: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
				bgcolor: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_play',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		presets['PlaybackPro master pause'] = {
			type: 'button',
			category: 'PBP +',
			style: {
				text: `PBP\nMaster\nPause`,
				size: '14',
				color: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
				bgcolor: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
			},
			steps: [
				{
					down: [
						{
							actionId: 'pbp_master_pause',
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
		Object.keys(this.pixtimerdata.gotoArray).forEach((key) => {
			let rgb = this.pixtimerdata.gotoArray[key].color
			if (rgb === null) rgb = [0, 0, 0]
			presets[`${this.pixtimerdata.gotoArray[key].name}`] = {
				type: 'button',
				category: 'PBP +',
				style: {
					text: `PBP Master ${this.pixtimerdata.gotoArray[key].name}`,
					size: '14',
					color: combineRgb(colorBlack[0], colorBlack[1], colorBlack[2]),
					bgcolor: combineRgb(colorWhite[0], colorWhite[1], colorWhite[2]),
				},
				steps: [
					{
						down: [
							{
								actionId: 'pbp_master_goto',
								options: {
									pbp_master_goto: this.pixtimerdata.gotoArray[key].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		})

		return presets
	},
}

// SPEAKER
const ICON_SPEAKER_SMALL =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zjPFjNIqFhcVLWM1ojBIpZSSUpDHKr83Mm19qZrzem0myVbaKEhu/FvwFbJW1UkRKtqyJDdNz3oyaSebe7jmf+73nnO49F+yhlJo2qn2QzmT14FhAmZtfUJwvOKihTuxgWDW04enpSSqOz3tslr/1WrUqx/07GqIxQwVbrfCQqulZ4XHhydWsZvGOcIuaDEeFz4Q9ulxQ+M7SI0V+tThR5G+L9VBwBOxNwkqijCNlrCb1tLC8nI50Kqf+3sd6iSuWmZ0R3y6rDYMgYwRQmGCUEfroYUBsH178dMuOCvm+Qv4UK5KritVYQ2eZBEmyeETNSfWY+LjoMZkp1qz+/+2rEe/1F6u7AuB4Ns33TnBuQ37LNL+OTDN/DFVPcJkp5a8cQv+H6FslreMA3BtwflXSIrtwsQmtj1pYDxekKln2eBzeTqFxHppvoH6x2LPfc04eILQuX3UNe/vQJfHupR8yb2fOfsfNDAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAQdJREFUeJzt1jFOAkEUh/FPQQoSTqAkNlYWHoBQiiaUXsNzcAxbSxoTC47gAeigIGhhgaGjAQtnGwjZZV0cWL9f8pqdl8n/zW4yC5IkSZIkSZIkSZIkSZIkSZIkroE+8BGqH579C/fAAlit1QK4i5jrTzSAdzaHT2oaekqrw/bhk7qNlu4XTjP2XRXUc3CyHsCwoJ6jVQfGbP/8R6Gn1NrAnM3h52HtKFV26D0HnoAqUAM+gRfgMewzKTzdgbgAnvl52zOgBzyE6gFfYW0AXMaJuF+vpF+BSb0BZ3Fi7kcTWJL9AFZAK0rSnNKuwS5wsuOeNzmzRJF2ALUce1bzBIkl64+QJJXSN710Tbr3AWT/AAAAAElFTkSuQmCC'

// SESSION
const ICON_SESSION_SMALL =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zjPFjNIqFhcVLWM1ojBIpZSSUpDHKr83Mm19qZrzem0myVbaKEhu/FvwFbJW1UkRKtqyJDdNz3oyaSebe7jmf+73nnO49F+yhlJo2qn2QzmT14FhAmZtfUJwvOKihTuxgWDW04enpSSqOz3tslr/1WrUqx/07GqIxQwVbrfCQqulZ4XHhydWsZvGOcIuaDEeFz4Q9ulxQ+M7SI0V+tThR5G+L9VBwBOxNwkqijCNlrCb1tLC8nI50Kqf+3sd6iSuWmZ0R3y6rDYMgYwRQmGCUEfroYUBsH178dMuOCvm+Qv4UK5KritVYQ2eZBEmyeETNSfWY+LjoMZkp1qz+/+2rEe/1F6u7AuB4Ns33TnBuQ37LNL+OTDN/DFVPcJkp5a8cQv+H6FslreMA3BtwflXSIrtwsQmtj1pYDxekKln2eBzeTqFxHppvoH6x2LPfc04eILQuX3UNe/vQJfHupR8yb2fOfsfNDAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAXNJREFUeJzt171qFFEYBuAnGnIBoqCgTRrxpxEbQfzLJWwjKeMtaKdNOmst7dKJCGkUFOwsFYukshHZJCiWUYu1iMUcSNydWdjNOlnj+8BhmHe/gW/OmTm7S0RERERERERERERERERERERERERERESYwRLelbFUsv/Gdez0jWsH2lHLVgxOwMqBdrRPR0asX6/J1ibRyDSaw210MFuy49iwu/obJVNqOuWauVY73YemDewkPpQj1Y1exiJOoVvyM9jEU7zH6ZJ/waVy/Cc9MPiu38WPmvw77tXk91vvegxNe8CFmuw8tmvybZyryS+O29Q0WDC4ondqsmGf3Wq96zEcbci/qd7fE/iMh3iFeZztq32DR/iIY/ha6l+iN/mW/74bqk2uh+dYxS9s4SZ+2l3lLq7iU6lZLdf0VBNxpd3WJ+Ot5kf9GZ7sOX+M10PqX7Tc+0Q03cyO6ltgec/5sj+fiLox1Ub9JXjo/viMOgEREYfKb5UCeijzUtIlAAAAAElFTkSuQmCC'

// PLAY
const ICON_PLAY =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAc1JREFUeJztmr1KxEAQgD9/wFZQEG0E24CInQtrYXFoI4o+grXv4CtYaOEjiI2dghYeBm2FbbSy0kew8afQBbE5d7JJNnvztZfZyXw3BJIZUBRFURRFURRlGBmpeoBxdhrYAGaBJ+CuLPovVc9tCrEA4+wUcAzsAKN/fr4EDsqiX1a4t0YQCTDOTgJXwPKAS5MX8fef+y8nDC4eoAfcGmcvjLNGmKtWgjvAODsDvArzJdcRkg5Yq5AvuY6QCCgi5E1GhETAWMT8rYuQPgRj05qIVAR4GheRmgBPYyJSFeCpXUTqAjy1ieiKAE90EV0T4PktYqnKQV0V4OkBd8bZLekBXRcAMAGcGWc3JcE5CIDvOg6Ns8Evd7kIAJgHFkODchIAsBoakJuAYHITcBMakJOAZ+AhNCgXAR/Afln0P0MDcxDwBmyXRf9cEtx1AZfAirR4gPGIN9Mk0b4ud01A9M/qXRFQ2zwhdQG1D1JSFdDYBCk1AY2PzlIR0NrMUCLgPWL+1oelEgEuQt7WC/dIBFxXyJdM4R7phsgpsBsQklzhHulDcA9YIIMVmapLUkd8d8JwLUn95mdNbh2YAx6B+y6tySmKoiiKoiiKMpx8ATwInxTdIq2hAAAAAElFTkSuQmCC'

// STOP
const ICON_STOP =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATJJREFUeJzt2jGKwlAUheF/nDrBbvaRStBVCAPWAVfl7EBchF0qtzGt+NoRLKL9vcHxRD1fnScnv2L1wMzMzMze00f2wKmqPoEWWAENML33qKQjcAC2wKYu5Zw5nApwqqovYAfMM+ceqAOWdSm/0QPhANdvfs94X/6mAxbRX8Ik8cEt4395gBmwjj6cCbDKb5H5jj6YCdAMGKIS3poJoP63zwhvzQR4SQ6gHqDmAOoBag6gHqDmAOoBag6gHqDmAOoBag6gHqDmAOoBag6gHqDmAOoBag6gHqDmAOoBag6gHqDmAOoBag6gHqCWCXD8txX3F96aCXAYMEQlvDUTYDtgiEp4aybAD/0VtLHrgE304XCAupQ/YMm4I9wuSoZviw69Krumv4r29FdlzczMzOxdXQBM6C5uVSFtIAAAAABJRU5ErkJggg=='

// SPEAKER
const ICON_PLAY_SPEAKER =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAv5JREFUeJztml1LFFEch58dVytENBV0kxC2IGMrJCppZAyilrrpTaMvEHTXdwj6BF3URZ8googuioRecGkxukljLkryZb0wlQiVSN3ZmS50Q61ld86cMzvleS5nzv/85jx7ZnZnzwGNRqPRaDQajUazHYkF7cC0rVbgPJAAxoDhbCozE7TfsBAWYNpWC3AP6AeMLacHgVvZVCYb4NpCQUiAaVtNwEvgaJmmkRex9ZOrlPuUHzxAGnhr2tYL07ZMwSyl+J4Bpm21AV8F8yI3I0RmwOkAeZGbESICUhJyIyNCRECNxPyqixB9CMqmaiKiIqBI6CKiJqBIaCKiKqCIchGhCXAXOnAmenEmenEXOvyWKxMRl9nZ3/CcneQ/XMOZPrY5eO97arsfEIuv+OkuDaRN25L2g0r5DMiPDPwxeABn+jj5kaui3W6cEd1Brk+pAHepHSfXU/K8k+vBXWoPEpEGhk3buiTagVoB3zultCnDDuCRaVsXRIrV3gIxt4I2BRlJBnDHtC3fL3dKBdQ0T1bQZkpWXCdwxG+RUgGx+nniyaGS5+PJIWL18zIj+/wWKP8arDv0BGIezpdTm4P3vaEu9VR1fFmUCnAXE+Q/XsFoyrHr7G3chQQARuMMTu4EK8M3qO16htEyLiuy9HQrgTIBzngfq6P94BkU5rrIj53BaJgFwF1qA2/t7ivMHaDu8GPi+18HjZwCRv0WqXkGeAb5T+nfgywecxcTuIuJzceBVfsi3s+mIIkucDObynh+C5UIKMwexFturLzArcH9lhSNWwYuZ1MZoQeKEgHej1b/NSsNIlGDwEnRwUMI3wKKkPYypESA0TxFbddz3zUVIP1vdTUCdk9i7J6U2aWy9YSo3wLKF1KiKiC0FaSoCQh96SwqAqq2ZigiQMoL/DpVXywVEWBLyK36wIuICHgVIC8yAy8iukPkITDgoyRyAy8i+hC8DiT5D7bIBN0kdZe1mbC9NkltZH2b3DlgD/AZePcvbZPTaDQajUaj0Wg025NfyFIR+WHx3JgAAAAASUVORK5CYII='

const ICON_PAUSE_SPEAKER =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz/baGJCXLhwsWSuNs3U4kaZNGpJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2e11ZbsnM65/mc73mep+c8B6yRjJLVG7yQzRW0cDDgnI8uOO0vNMrsoAlXTNHVsZmZEHXH5z0W0956zFz1/f4dLcsJXQFLk/CoomoF4Unh0FpBNXlHuEtJx5aFz4TdmhQofGfq8TK/mpwq87fJWiQ8DtZ2YWeqhuM1rKS1rLC8nL5sZlWp1GO+xJHIzc2K7ZXVg06YIAGcTDHBOH4GGZHdjwcfA3KiTrz3N36avMQqsquso7FCijQF3KKuSvaE2KToCZkZ1s3+/+2rnhzylbM7AtD4bBjvLrBvQ6loGF9HhlE6BtsTXOaq8flDGP4QvVjV+g6gbRPOr6pafBcutqD7UY1psV/JJsuaTMLbKbRGofMGmhfLPavcc/IAkQ35qmvY24d+8W9b+gEYQ2fCbyeEygAAAAlwSFlzAAALEwAACxMBAJqcGAAAA3JJREFUeJztmt1LU2Ecxz++NFDcJE0I1CwhTbNaBKZmEIi3wYS6qS6qK1PJLgqCQAVvJSyT7kqTArvYHyDSqy8RlCaoKWjmLgrTakNjObcudiJXmzvP2XwO5POBXWzP73m+3/PdOc+2sx8oFAqFQqFQKLYmCUYnup3WBKASOA5YwpT4gWlg0ObwzMWgcQKoALaFKVkDpjSNeSMawgG4ndYU4AJwCSjWOe0R0GBzeBZ1aqQBF4FaoFDHlADQDTTaHJ5vOj0BggG4ndZ0oB84IjJPYwYoszk8C1E0MoEnwAEDGpNAuUgIiYICbRg7eIB8oENHXQfGDh5gH3BTZILuM8DttOYCcyJzIlBoc3imImjsJXhNx0IAyNO7J4icARXEfvAAxzYYq4zD+gkEvepCJIACcS/C68jQCEEkgCQDRkTXkaERgugm+N+hAjDbgNmoAMw2YDZbPoBks4TtrSOHgDLt6fDIDfuoGT6kB7C4mmGxt77oAc6sf93eOtKz5Du5mJH8Vaof6ZdAk6ulir8OXuNs03xLlWw/UgOY8+bxbsVeEml8dOVwyZw3T6YluQGM/4h+/2RCR008kRpAEmvRaxKi18QTqQHsTx2PWlOcEr0mnkgNINviojTt1dtI46Vpw2+yLS6Zlkz4FMhpfgrcCjPU3pTT8kyyHbkBzHrzqZ+94wCWgSLglPYoApbrZjtrxlaM3g40hrQvQs6lGto/XcYfSNwNXAeuARPa8D4g+YN3D3WzndTvvM3pzF4pvqScAWuBJB4snMMfCJFLAkq0R8gbcfdzLQurWTKsyQng9XIpX3w7dNf7AsmMrRzcREd/kBKAy5stPGfJt30TnPyL+jksQ6Q4dZzzWfcA+PgzZ7D/e3VfuLqq9L7qXRZXxe85MpATQMr4+m94A20NV5vD1T13WlMR+FMjHmz5S0AFYLYBs1EBmG3AbFQAArXxulWz0ToyNEIQCSDWzg0960zHSeO93kKRAAYJtp/EysAGYy/jsH4AGNJbrDsAreem24ijdfRG6g/SNKaAxzFqdIn0DIpugo0EW9GMMAPU66ir02qNMAlcEZkgFIDWf1cOdCF2OTwESqP1CGoaC8BRgs2VegkA9xHsEYTYWmVzCYZRSPieHD/BDW8ohlbZPE2jgPBv1hrBDW/IaKusQqFQKBQKhWKr8gvpIuCz758RhwAAAABJRU5ErkJggg=='

const ICON_STOP_SPEAKER =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAo5JREFUeJztmtFLU1Ecxz9ug8DaMJaFLhgNIZrawx4iqJdAhj42VHxV8MEKDP+PglFUYNRzTesxW5D0IAysvQwngVjGcJSS4qUeYs4elkUM2TlznnPL3+fx3t/Z73s+uzuXHQ4IgiAIgiAIh5Mm3QFbfr8XGAGGgBjQ0uhQmmwCWSAFTAYcZ1tnsJaALb//FDANXNIZZ5AMkAg4TlF1gLKAX9/8G9w7+V0ywGXVJ8Gj8cEjuH/yABeBUdViHQFD+lmsMaBaqCMgVkcQWyhn1RFge7XXQTmrjoD/EhFgO4BtRIDtALYRAbYD2MZnq/HSyQ7y7Z0ARFcX6PiyZCWHcQHfjhzldnyCV9H4X9fjC2km0rdo/vHdaB7jP4Fkz3jV5AHSnXGSPTdNxzErYCUYZqarb8/7L7r7WAmGDSYyLCDfHq1Zs9hWu6aRGBXgLdfeo1CpaSRGBXSu5mvWRIu1axqJUQGhjQJXs8/2vJ/IThPaKBhMZOEtcG32Hv3vpqqu979NMTZ733QcrU3Rnf02+9Aa4e6V65z9/J7e3AzLrREAImvLvOzqZbHtHMNzj+gu5PbbioDjKM3NmIDnsQTJnnHKTZWHzrNTJrz+EYBPwTDbHu/v2huv7zA4/3Q/7dwlYNvjZWBsivVjJ5TqfeUSTx4M0uqs1dtSWYCRNWD+zAXlyQOUPD5yp88fYKI/GBFQaAlpj/nafPwAklQjf4dNNIkW8wzPPdYeYwKjr0GTuGoRdDMiwHYA24gA2wFsIwJsB7CNjoDNA0vReJSz6gjI1hHEFspZdQSk6ghiC+WsOgIeUjmC5nYywKRqsbKAgOOUgATulrB7UFJ5b73eo7KjVI6i/fNHZQVBEARBEITDyk8sk6BRRC6O6gAAAABJRU5ErkJggg=='

// SESSION
const ICON_PLAY_SESSION =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA8FJREFUeJztmk1sG0UYhp/ZtRuIG/JDSCBCMs2lQW4RokWhK20QICI4gKjIoTcuqEeOvffIFQk4tDeOCJBAArUSICXgGIlDG7EVNGqKm1YktRRRqU0be384pLajrI2zs+P1QuY5eWe+n5nX3856PQMajUaj0Wg0Go1mPyLiBrAcexR4E3gKWAZKxcLCX3HjJoW0AJZjPw58CrwLGLu6LwJni4WFYoyxJYKUAJZjDwHfAy90ME29ELu/ub1yjs6TB5gFfrYc+4Ll2JZkrq4SuQIsxx4H1iTzpa4iZCrg1Rj5UlcRMgIUFORNjRAyApgK8/dcCNlFUDU9EyItAtRJXIi0CVAnMSHSKkCdrguRnACBgbd2BG/tCASR03ZNiIzKYO0Iqjke/HiGYHMEANG/wSOvfIg4sBk11Cwwazm2sh9UiVSAW55uTB4g2BzBu/FSnJA7K+L5OIESESC483Sozf873CbBLFCyHPsd2QBdEkCw8zXDzC+GLMxnFtvaR6QP+MJy7LdlnNWuAYHAXZnBvW6D8MhMzpM5VMQcKZM9+iVeebvszXwJc7gMCNzrFu7KDAQGmUM/kZmcBxFEzWwAH1mO/U2xsBDJWakA3u0pqktzjevqpVMYByts/foeQe1RMhOXAahdeQt3+TX6jn1G9dKppv3SHGJgHXPsd5n0eeA54HIUJ6W3gFs+EW5bfREMD7ws7upx3NXj4GXB8Lb7dtv/GY4RgZmoDkoFMIZWQ23i4G2C+4Oh9uD+EGJgPRxjOByjmygVIJNfRPRvNK5FroI5eKu1cSAwB28hcpWmff8GmXwpzhDmozqoWwN8E+/mMcyJJYxcBQjw747j3x2jb/o8W6XTTVvh02d9jH9vDPPJKxgD6xAI/HujuOVpspPzYNaijqAMLEV1UiZA9beTuNdebtl34OhXGEM3G89+c+wP/MoUtauvtw7mZ8gevhAlvQ98EPUJAApvAe9GeEGrU7s2gznuNJMOl1sugHXaCdmGB8DJYmHh6yhOjbHIOLUiqPW379t6DIS/s4WgmvsX+4G9pr0InJCdPCT0MtQFlL0MKRMgO/Vd+07DwxhZITv18HJ0mazhgR/570Xlf6urE+DZbzvamE8st/y8B7q2n5D2W6DrGylpFSCxHaS0CZD41llaBOjZnqGMAJ7C/D3fLJURwOls0pGeT7yOjAA/xMiXmonXkT0h8jkw19GwSeomXkd2EXwfmOR/cEQm7iGpT9iuhP11SGonD4/JvQFMAFeBX/5Lx+Q0Go1Go9FoNBrN/uQfju9WEOUnnvYAAAAASUVORK5CYII='

const ICON_PAUSE_SESSION =
	'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'

const ICON_STOP_SESSION =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA2xJREFUeJztmltIFFEYx38zblnUrqWUS0rYzVAxSiuMgqKHIrYi1y4+RNHFp4KIeqqHIIKehKDoJaEIgq4alUUGUQ/VEmYhIZTd87J2U3d6qNzd6WFzM0ZjzrLjsTy/t/nmO+f8z3/P+XZmOKBQKBQKhUKhGJ5oog1CbncKsBUoB4qAcckWJUgX0ABcAE54DCMi0ljIgJDbnQlcAhaKtBtEAoDfYxjtdhvYNuDXL3+XoTv5XgLAIrsrQRfoeCtDf/IAJUCF3WQRA8rFtUhjnd1EEQOKEhAiC9taRQyQXe1FsK1VxID/EmWAbAGyUQbIFiAbZYBsAbJxyRo4qukEppYAUPIqgG5GpeiQYkBodBrbN1cRTPMC4O0OUnVqG55voUHXImUL3ChcEZ88QDDNy43CFTKkyDGgeeIMaywzV4KSQTLARMPs8+nB11hryfE1Xhsw30kcrQFRTaemqJSaOaW4ohH8DdWsenKFvLYmdt4+yvVCHxCbfH5bEyYaV2evprrIT0RPYc3jGkobahwtkCJfhEzRzh9Omc/e9ZV/xI6c3cXBVQf4mjqWxc/vAHA3dwmebyH21x5i94Yjf+RXnt/DvNcPRYfGYxi25uboCqidtdISqytYzohIDz9cI7mVv+y3kGiYuvzllvxrs3wJGWAXR2tAbsczS2zyl3d8dE+wxD+4JzL581tLfGbQ2kcycdQAX2Mt3u5g/Dqrs4VpHS/QTOtuMjWN6R9ektXZEo95u4P9Fsxk4lgNCOsuLs9ZQ/u4SWR3vkczTd5m5JDV1Yq3q519ZYfjuboZpfLcHlrSs3mTkRNbCRq0js8m4+sn/I+qSQ1/Fxlefg04vnQHF4vX9ntvx+1jzOhopjkz9jww90099TnFnCnZ2G9+jz6CTQ9OO6LTsS1ws8Ba0HqpLi5jwcv78eu89ibq/pJ/qbgsqdr64pgBxij3gPe+jElH71MHNBNCoz0D5neOSU+qtr6o12GnOt5y7+SA91IiYQpbn6IRWwWz3z3BFekhkjL4L6eOPgnKxO6/wLDfAsoA2QJkowyQLUA2ygDZAmQjYkCXYyqSj22tIgY0JCBEFra1ihhwIQEhsrCtVcSAKmJH0IY6AeCE3WTbBngMIwz4Gdom9B6UtH1aNNGjshXEjqL980dlFQqFQqFQKBTDlZ9DNfNgD0hjngAAAABJRU5ErkJggg=='

// ALL
const ICON_PLAY_ALL =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA8BJREFUeJztms1vG0UYh5/9cD5QkgItadPGCaUSoFoK0AIpWxYkDgEuCIlKiDtHxJUz/wIHOPAPIBUu3IgECCyspCgIEItQAcVOC0lJUFETmg/v7HAwXjsfxt7ZXXtL5jn53Z33fWd+no/dnQGNRqPRaDQajUZzGDHiBnA89xjwIjAG/AzMlQrF5bhxu4WyAI7nHgXeA14BzD23Z4G3S4ViKUbduoKSAI7n3g18CpxrUzTzQuz95zrlfdo3HmAG+Mrx3E8cz3UUc6VK5B7geO5xYEUxX+Z6hEoPeC5Gvsz1CBUBCgnkzYwQKgJYCebvuRCqk2DS9EyIrAhQp+tCZE2AOl0Twk4zeB0p+qj++BrI2qpr9G+Qe+jDTlxngBnHc1NbPrsigLgxTfWXx3dds04uYA4vdhoiNSG6MgT88hP7r1WeVgmV+NBIXYDg9hjixul91/3yFFL0q4ZtFuLROPVLXQBxrfFPm4PrGEgAZHUAsfxU3PAzwJzjuS+rBkhVAClN/MXHQts+cwXzeCW0/cUnk0jTD3zkeO5LKs6pChCsniPYHA5ta3wOe2IhtMVanmB9MolUJvCO47mRX+5SFcCvTIe/rdElzMEVrBPzGNZOo8ySm1S6SWAqqlNqAsjtexC/PRjadv4bAAx7Eyv/U3jdLz8SZzLcyzNRHVITwL9+ESlr4Q3TxxqbD+/Z+Svhb7kzgFi+kFY12pLKg5CU4JfPh7Z57zLB36easm5j5LaQ1QEA/PI09vgXSaT+MqpDKgIEf50luHUstMVaHvH5Gy3Li9U8wcYk5lClZZkOqADfR3VKZQj4lejru+KTYZ0AeLNUKMqojon3AOnfhVg6G9rmkVXMoZsHlg1uniC4PQLUJsPcw5d3rRAdsgW8WioUP1apb+ICiN8dpOgL7f7zH2AeuXpgWf/6s2x/fQkAuTOIWLmAfSrSMJ4F3ioVit+q1jfxIeCXG2995sgaxsjBjQewxuYxcttNvtMty+5hFrhYKhSfj9N4SLgHBOv3I/5szPb2xHcY//FsZlhb2BM/UP21tmKIPyYINvKYQ9dauST+OpyoAHLzKLkzjUdda7x9Pe3Tu5c/uXkf7BfgzvggYo0uYI0utC/YhDm8SN9Uyw8jqW+kdOWLkAJd20HKmgBd3zrLigA92zNUEUAkmL/nm6UqAngJ5O15w+uoCPBZjHyZaXgd1RMil4FLEVwy1/A6qpPg68AD/A+OyMQ9JPUutZ5wuA5JNfPvMbkXgJPAVWD+Tjomp9FoNBqNRqPRaA4n/wCClVL5E8+zsQAAAABJRU5ErkJggg=='

const ICON_PAUSE_ALL =
	'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'

const ICON_STOP_ALL =
	'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kd8rg1EYxz82i5i24sKFiyVcbZrJ4kbZ0ihJM2W42V77ofbj7X0nya1yu6LEjV8X/AXcKtdKESm55Zq4Yb2ed1NbsnM65/mc73mep+c8ByyRjJLVG72QzRW0cCjgmo8uuJpesMl0MsBQTNHVsZmZKeqOz3saTHvrMXPV9/t3tC4ndAUamoVHFVUrCE8IT60VVJN3hDuUdGxZ+EzYrUmBwnemHq/wq8mpCn+brEXCQbA4hV2pGo7XsJLWssLycnqymVXltx7zJfZEbm5WbLesLnTChAjgYpJxgvilKyOy+/Hgo19O1In3luOnyUusIrvKOhorpEhTwC3qqmRPiE2KnpCZYd3s/9++6slBXyW7PQC2Z8N474WmbSgVDePryDBKx2B9gstcNT5/CMMfoherWs8BODbh/KqqxXfhYgs6H9WYFitLVlmWZBLeTqEtCu030LJY6dnvPScPENmQr7qGvX3oE3/H0g+TSWf6w6FYwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA0JJREFUeJztml1IVEEYhh9/ckNxM7FMS400zUhcS9J+zSwosTJB8K4f8r6LiC677L7LoqvoRlLsn0hDTDTJLYswTMkykjUt21NZa7VdWCOh0pnFM7PlPFfzzfm+nfe8e87M7jBgMBgMBoPBYJifRMgW+OPjo4CjQA2wHkiYa1GSjAFeoA4457as7zLFUgb44+OTgcvAFpk6hXQAVW7LGrJbYNuAX998C+F787/pALbafRIiJT74KOF/8wDFQK3dZBkDauS1aKPabqKMAetDEKIL21plDNA928tgW6uMAf8lxgDdAnRjDNAtQDfz3oBoHYNOuNxcLD9F8Ncv8cXjHzh464wOKXoM8Hr2cyF72x99RT3NpL7sVK5Fyytwa03ptL6m/AoNSjQYMJKax51l2dP6GzKLCCxcpFqOegNa8veJ9srPY0QGgwC8jYmly1OpWo5aA35ELaAha7OIa57dpXS4T8TXc3eqlAMoNuBpXgUvY6ce802Pb7K7t1XELUtXMZReqFKSWgNury0T7Z2+PhJ9PRR2X8X9LSD6mz37Zip1DGUGWIkrubF8nYh3Pb8HgOvTCBWvHon++lXFTLjcqmSpM6DNc4BAZBQAcd8nKOy+Kq6V9jSJ9rArlq4CdZOhEgOCEZE05mwXceHoIL6UXAZWlzCwugRXYJykwLi4rnIylNkVDoY6SH9OGYcrT0vV1F06zrLBrlCHxG1Ztu5NyRPQlLdHukbVZOj4f4EvcUtozJjao/SMDZH+cWTG3CeJabyIndzOq88sptrlZsFXv6P6HDegs+AA/ugYEZ9oOktGX+uMue2bDnFy+zEAfK44vJ79FN2/6Kg+x1+BGzk7RDvP7yO9v23W3A2PrpAw8XWqNrds1ty5wlED3mRspC0pQ8Tlfe1EBH/Mmh8z/p7KgQcibk7OwreiwEmJzr4C7xJSONJ7T8Rbuq/9tWavt4GI4NSCM5qYRvLrh47oA0XLoA7CahkMZ4wBugXoxhigW4BujAESuWOOqZh7bGuVMcAbghBd2NYqY0BdCEJ0YVurjAHnmTyCFu50AOfsJts2wG1Z34AqwtuE3wclbZ8WDfWobC2TR9H++aOyBoPBYDAYDIb5yk/uoc1SY6poZgAAAABJRU5ErkJggg=='
