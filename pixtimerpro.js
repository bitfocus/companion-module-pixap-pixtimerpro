// piXtimer Pro TCP

var tcp           = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
		var self = this;

		// super-constructor
		instance_skel.apply(this, arguments);

		self.actions(); // export actions

		return self;
}

instance.prototype.updateConfig = function(config) {
		var self = this;

		self.config = config;
		self.init_tcp();
};

instance.prototype.init = function() {
		var self = this;

		debug = self.debug;
		log = self.log;

		self.init_tcp();
};

instance.prototype.init_tcp = function() {
		var self = this;

		if (self.socket !== undefined) {
				self.socket.destroy();
				delete self.socket;
		}

		if (self.config.host) {
				self.socket = new tcp(self.config.host, self.config.port);

				self.socket.on('status_change', function (status, message) {
						self.status(status, message);
				});

				self.socket.on('error', function (err) {
						debug("Network error", err);
						self.status(self.STATE_ERROR, err);
						self.log('error',"Network error: " + err.message);
				});

				self.socket.on('connect', function () {
						self.status(self.STATE_OK);
						debug("Connected");
				})

				self.socket.on('data', function (data) {});
		}
};

// Return config fields for web config
instance.prototype.config_fields = function () {
		var self = this;
		return [
				{
						type: 'textinput',
						id: 'host',
						label: 'Target IP',
						width: 6,
						regex: self.REGEX_IP
				},
				{
						type: 'textinput',
						id: 'port',
						label: 'Target port',
						tooltip: 'The piXtimer Pro port number',
						width: 6,
						default: "9756",
						regex: self.REGEX_PORT
				}
		]
};

// When module gets deleted
instance.prototype.destroy = function() {
		var self = this;
		debug("destory", self.id);
};

instance.prototype.actions = function(system) {
		var self = this;

		self.system.emit('instance_actions', self.id, {
				'recallTimerPreset':    {
						label: 'Recall timer preset',
						options: [
								{
										type: 'textinput',
										label: 'Cue ID',
										id: 'cue',
										regex: self.REGEX_NUMBER
								}
						]
				},
				'speakerTimerPlay':    {
						label: 'Timer speaker play'
				},
				'speakerTimerPause':    {
						label: 'Timer speaker pause'
				},
				'speakerTimerStop':    {
						label: 'Timer speaker stop'
				},
				'sessionTimerPlay':    {
						label: 'Timer session play'
				},
				'sessionTimerPause':    {
						label: 'Timer session pause'
				},
				'sessionTimerStop':    {
						label: 'Timer session stop'
				},
				'allTimerPlay':    {
						label: 'Timer all play'
				},
				'allTimerPause':    {
						label: 'Timer all pause'
				},
				'allTimerStop':    {
						label: 'Timer all stop'
				},
				'recallMessagePreset':    {
						label: 'Recall message preset',
						options: [
								{
										type: 'textinput',
										label: 'Cue ID',
										id: 'cue',
										regex: self.REGEX_NUMBER
								}
						]
				},
				'showMessage':    {
						label: 'Message show'
				},
				'hideMessage':    {
						label: 'Message hide'
				},
				'blackShow':    {
						label: 'Black show'
				},
				'blackHide':    {
						label: 'Black hide'
				},
				'countdownVideoPlay:':    {
						label: 'Countdown video time and play',
						options: [
								{
										type: 'textinput',
										label: 'Countdown video time and Play',
										id: 'time',
										default: '00:00:00'
								}
						]
				},
				'countdownVideo:':    {
						label: 'Countdown video time',
						options: [
								{
										type: 'textinput',
										label: 'Countdown Time',
										id: 'time',
										default: '00:00:00'
								}
						]
				},
				'countdownPlay:':    {
						label: 'Countdown video Play'
				},
				'countdownStop:':    {
						label: 'Countdown video stop'
				},
				'adjustTime:':    {
						label: 'Adjust Speaker Timer Time',
						options: [
								{
									type: 'textinput',
									label: 'Time in second',
									id: 'time',
									regex: self.REGEX_SIGNED_NUMBER
								}
						]
				},
				'switchTimerClock:':    {
						label: 'Switch to Timer & clock'
				},
				'ndiEnableDisable:':    {
						label: 'NDI enable & disable'
				},
				'pbpMainEnableDisable:':    {
						label: 'PlaybackPro main enable & disable'
				},
				'pbpBackupEnableDisable:':    {
						label: 'PlaybackPro backup enable & disable'
				},
				'pbpGeneralTake:':    {
						label: 'PlaybackPro general take'
				},
				'pbpGeneralEndall:':    {
						label: 'PlaybackPro general end all'
				},
				'pbpGeneralPrevious:':    {
						label: 'PlaybackPro general previous clip'
				},
				'pbpGeneralNext:':    {
						label: 'PlaybackPro general Next clip'
				},
				'pbpGeneralPlay:':    {
						label: 'PlaybackPro general play'
				},
				'pbpGeneralPause:':    {
						label: 'PlaybackPro general pause'
				},
				'pbpGeneralGoto10:':    {
						label: 'PlaybackPro general goto 10'
				},
				'pbpGeneralGoto20:':    {
						label: 'PlaybackPro general goto 20'
				},
				'pbpGeneralGoto30:':    {
						label: 'PlaybackPro general goto 30'
				}
		});
};

instance.prototype.action = function(action) {
		var self = this;
		var cmd
		var opt = action.options

		switch (action.action){

				case 'recallTimerPreset':
						cmd = 'PST '+ opt.cue;
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

				case 'ndiEnableDisable':
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


		if (self.config.port !== undefined && self.config.host !== undefined) {
				if (cmd !== undefined) {

						debug('sending ',cmd,"to",self.config.host);

						if (self.socket !== undefined && self.socket.connected) {
								self.socket.send(cmd);
						} else {
								debug('Socket not connected :(');
						}
				}
		}

};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
