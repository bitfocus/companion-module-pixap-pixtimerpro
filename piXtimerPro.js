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

    self.status(1,'Connecting'); // status ok!

    self.init_tcp();
};

instance.prototype.init_tcp = function() {
    var self = this;

    if (self.socket !== undefined) {
        self.socket.destroy();
        delete self.socket;
    }

    if (self.config.host) {
        self.socket = new tcp(self.config.host, 9756);

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
            default: "7770",
            regex: self.REGEX_PORT
        }
    ]
};

// When module gets deleted
instance.prototype.destroy = function() {
    var self = this;
    debug("destory", self.id);;
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
        }
    });
};

instance.prototype.action = function(action) {
    var self = this;
    var cmd
    var opt = action.options

    switch (action.action){

        case 'recallTimerPreset':
            cmd = 'PST '+ opt.task;
            break;

        case 'speakerTimerPlay':
            cmd = 'PST PLAY';
            break;

    };




    if (self.config.prot == 'tcp') {
        if (cmd !== undefined) {

            debug('sending ',cmd,"to",self.config.host);

            if (self.socket !== undefined && self.socket.connected) {
                self.socket.send(cmd);
            } else {
                debug('Socket not connected :(');
            }
        }
    };

    instance.module_info = {
        label: 'piXtimer Pro',
        id: 'pixtimerpro',
        version: '1.0.0'
    };

    instance_skel.extendedBy(instance);
    exports = module.exports = instance;

};