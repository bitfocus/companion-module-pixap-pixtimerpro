module.exports = {

	getPresets() {

		//console.log("PIXTIMER PRO | PRESETS START");

		let presets = []

		const ColorWhite = this.rgb(255, 255, 255)
		const ColorBlack = this.rgb(0, 0, 0)
		const ColorRed = this.rgb(200, 0, 0)
		const ColorGreen = this.rgb(0, 200, 0)
		const ColorBlue = this.rgb(0, 0, 200)
		const ColorpixBlue = this.rgb(48, 132, 208)
		const ColorWarning = this.rgb(255, 193, 7)
		const ColorInfo = this.rgb(23, 162, 184)

		// TIMER PRESETS
		for (var p = 0; p <= this.timerPresetMax; p++) {
			presets.push({
				category: 'Timer Preset',
				label: 'Recall Timer Preset',
				bank: {
					style: 'text',
					text: 'Preset T' + p,
					size: '18',
					color: ColorWhite,
					bgcolor: ColorpixBlue,
				},
				// feedbacks: [
				// 	{
				// 		type: 'speaker',
				// 		style: {
				// 			bgcolor: ColorGreen,
				// 			color: ColorWhite,
				// 		},
				// 	},
				// ],
				actions: [
					{
						action: 'recallTimerPreset',
						options: {
							cue: p
						}
					},
				],
			});
		}

		presets.push({
			category: 'Timer Preset',
			label: 'Play',
			bank: {
				style: 'text',
				text: 'Speaker Play',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'speakerTimerPlay',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Pause',
			bank: {
				style: 'text',
				text: 'Speaker Pause',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorWarning,
			},
			actions: [
				{
					action: 'speakerTimerPause',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Stop',
			bank: {
				style: 'text',
				text: 'Speaker Stop',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'speakerTimerStop',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Play',
			bank: {
				style: 'text',
				text: 'Session Play',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'sessionTimerPlay',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Pause',
			bank: {
				style: 'text',
				text: 'Session Pause',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorWarning,
			},
			actions: [
				{
					action: 'sessionTimerPause',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Stop',
			bank: {
				style: 'text',
				text: 'Session Stop',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'sessionTimerStop',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Play',
			bank: {
				style: 'text',
				text: 'All  Play',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'allTimerPlay',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Pause',
			bank: {
				style: 'text',
				text: 'All Pause',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorWarning,
			},
			actions: [
				{
					action: 'allTimerPause',
				},
			],
		});

		presets.push({
			category: 'Timer Preset',
			label: 'Stop',
			bank: {
				style: 'text',
				text: 'All  Stop',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'allTimerStop',
				},
			],
		});

		// ADJUST TIME
		for (let ajt = 0; ajt <= 4; ajt++) {
			let t = this.adjustArray[ajt];
			presets.push({
				category: 'Adjust Speaker Timer',
				label: 'Adjust Speaker Timer in second',
				bank: {
					style: 'text',
					text: "Time " + t,
					size: '18',
					color: ColorWhite,
					bgcolor: ColorInfo,
				},
				actions: [
					{
						action: 'adjustTime',
						options: {
							time: '' + t
						}
					},
				],
			});
		}

		for (var ajt = 0; ajt <= 4; ajt++) {
			var t = this.adjustArray[ajt];
			presets.push({
				category: 'Adjust Speaker Timer',
				label: 'Adjust Speaker Timer in second',
				bank: {
					style: 'text',
					text: "Time -" + t,
					size: '18',
					color: ColorWhite,
					bgcolor: ColorInfo,
				},
				actions: [
					{
						action: 'adjustTime',
						options: {
							time: '-' + t
						}
					},
				],
			});
		}

		// MESSAGES PRESETS
		for (var m = 0; m <= this.messagePresetMax; m++) {
			presets.push({
				category: 'Message Preset',
				label: 'Recall Message Preset',
				bank: {
					style: 'text',
					text: 'Preset M' + m,
					size: '18',
					color: ColorWhite,
					bgcolor: ColorpixBlue,
				},
				// feedbacks: [
				// 	{
				// 		type: 'speaker',
				// 		style: {
				// 			bgcolor: ColorGreen,
				// 			color: ColorWhite,
				// 		},
				// 	},
				// ],
				actions: [
					{
						action: 'recallMessagePreset',
						options: {
							cue: m
						}
					},
				],
			});
		}

		presets.push({
			category: 'Message Preset',
			label: 'Show',
			bank: {
				style: 'text',
				text: 'Show Mess.',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'showMessage',
				},
			],
		});

		presets.push({
			category: 'Message Preset',
			label: 'Hide',
			bank: {
				style: 'text',
				text: 'Hide Mess.',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'hideMessage',
				},
			],
		});

		// GENERAL
		presets.push({
			category: 'General',
			label: 'Show',
			bank: {
				style: 'text',
				text: 'Show Black',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'blackShow',
				},
			],
		});

		presets.push({
			category: 'General',
			label: 'Hide',
			bank: {
				style: 'text',
				text: 'Hide Black',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'blackHide',
				},
			],
		});

		presets.push({
			category: 'General',
			label: 'Switch to Timer & clock',
			bank: {
				style: 'text',
				text: ' Timer / Clock',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorInfo,
			},
			actions: [
				{
					action: 'switchTimerClock',
				},
			],
		});

		// TIMER VIDEO
		presets.push({
			category: 'Video Timer',
			label: 'Countdown video time and play',
			bank: {
				style: 'text',
				text: 'Time & Play',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorInfo,
			},
			actions: [
				{
					action: 'countdownVideoPlay',
					options: {
						time: "00:10:00"
					}
				},
			],
		});

		presets.push({
			category: 'Video Timer',
			label: 'Countdown video time',
			bank: {
				style: 'text',
				text: 'Video Time',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorInfo,
			},
			actions: [
				{
					action: 'countdownVideo',
					options: {
						time: "00:10:00"
					}
				},
			],
		});

		presets.push({
			category: 'Video Timer',
			label: 'Countdown video Play',
			bank: {
				style: 'text',
				text: 'Video Play',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'countdownPlay',
				},
			],
		});

		presets.push({
			category: 'Video Timer',
			label: 'Countdown video Stop',
			bank: {
				style: 'text',
				text: 'Video Stop',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'countdownStop',
				},
			],
		});

		// TIMER NDI
		presets.push({
			category: 'NDI',
			label: 'NDI start & stop',
			bank: {
				style: 'text',
				text: 'NDI on/off',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'ndiStartStop',
				},
			],
		});

		// PBP
		presets.push({
			category: 'PBP',
			label: 'PlaybackPro main enable & disable',
			bank: {
				style: 'text',
				text: 'Main Enable',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorInfo,
			},
			actions: [
				{
					action: 'pbpMainEnableDisable',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro backup enable & disable',
			bank: {
				style: 'text',
				text: 'Backup Enable',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorInfo,
			},
			actions: [
				{
					action: 'pbpBackupEnableDisable',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general take',
			bank: {
				style: 'text',
				text: 'Take',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorGreen,
			},
			actions: [
				{
					action: 'pbpGeneralTake',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general end all',
			bank: {
				style: 'text',
				text: 'End All',
				size: '18',
				color: ColorWhite,
				bgcolor: ColorRed,
			},
			actions: [
				{
					action: 'pbpGeneralEndall',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general previous clip',
			bank: {
				style: 'text',
				text: 'Previous',
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralPrevious',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general Next clip',
			bank: {
				style: 'text',
				text: 'Next',
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralNext',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general play',
			bank: {
				style: 'text',
				text: 'Play',
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralPlay',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general pause',
			bank: {
				style: 'text',
				text: 'Pause',
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralPause',
				},
			],
		});


		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general goto 10',
			bank: {
				style: 'text',
				text: "GOTO 10",
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralGoto10',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general goto 20',
			bank: {
				style: 'text',
				text: "GOTO 20",
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralGoto20',
				},
			],
		});

		presets.push({
			category: 'PBP',
			label: 'PlaybackPro general goto 30',
			bank: {
				style: 'text',
				text: "GOTO 30",
				size: '18',
				color: ColorBlack,
				bgcolor: ColorWhite,
			},
			actions: [
				{
					action: 'pbpGeneralGoto30',
				},
			],
		});


		return presets
	},
}