module.exports = {

    getActions() {

        //console.log("PIXTIMER PRO | ACTIONS START");

        let piXactions = {};

        piXactions['recallTimerPreset'] = {
            label: 'Recall timer preset',
            options: [
                {
                    type: 'number',
                    label: 'Preset ID',
                    id: 'cue',
                    regex: this.REGEX_NUMBER,
                    tooltip: '(1-1000)',
                    min: 0,
                    max: 1000,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false,
                }
            ]
        };

        piXactions['speakerTimerPlay'] = {
            label: 'Timer speaker play'
        };

        piXactions['speakerTimerPause'] = {
            label: 'Timer speaker pause'
        };

        piXactions['speakerTimerStop'] = {
            label: 'Timer speaker stop'
        };

        piXactions['sessionTimerPlay'] = {
            label: 'Timer session play'
        };

        piXactions['sessionTimerPause'] = {
            label: 'Timer session pause'
        };

        piXactions['sessionTimerStop'] = {
            label: 'Timer session stop'
        };

        piXactions['allTimerPlay'] = {
            label: 'Timer all play'
        };

        piXactions['allTimerPause'] = {
            label: 'Timer all pause'
        };

        piXactions['allTimerStop'] = {
            label: 'Timer all stop'
        };

        piXactions['recallMessagePreset'] = {
            label: 'Recall message preset',
            options: [
                {
                    type: 'textinput',
                    label: 'Cue ID',
                    id: 'cue',
                    regex: this.REGEX_NUMBER,
                    tooltip: '(1-1000)',
                    min: 0,
                    max: 1000,
                    default: 0,
                    step: 1,
                    required: true,
                    range: false,
                }
            ]
        };

        piXactions['showMessage'] = {
            label: 'Message show'
        };

        piXactions['hideMessage'] = {
            label: 'Message hide'
        };

        piXactions['blackShow'] = {
            label: 'Black show'
        };

        piXactions['blackHide'] = {
            label: 'Black hide'
        };

        piXactions['countdownVideoPlay'] = {
            label: 'Countdown video time and play',
            options: [
                {
                    type: 'textinput',
                    label: 'Countdown video time and Play',
                    id: 'time',
                    default: '00:00:00',
                    regex: '/^1$/',
                    required: true,
                }
            ]
        };

        piXactions['countdownVideo'] = {
            label: 'Countdown video time',
            options: [
                {
                    type: 'textinput',
                    label: 'Countdown Time',
                    id: 'time',
                    default: '00:00:00',
                    regex: '/^1$/',
                }
            ]
        };

        piXactions['countdownPlay'] = {
            label: 'Countdown video Play'
        };

        piXactions['countdownStop'] = {
            label: 'Countdown video stop'
        };

        piXactions['adjustTime'] = {
            label: 'Adjust Speaker Timer Time',
            options: [
                {
                    type: 'textinput',
                    label: 'Time in second',
                    id: 'time',
                    regex: this.REGEX_SIGNED_NUMBER,
                }
            ]
        };

        piXactions['switchTimerClock'] = {
            label: 'Switch to Timer & clock'
        };

        piXactions['ndiStartStop'] = {
            label: 'NDI start & stop'
        };

        piXactions['pbpMainEnableDisable'] = {
            label: 'PlaybackPro main enable & disable'
        };

        piXactions['pbpBackupEnableDisable'] = {
            label: 'PlaybackPro backup enable & disable'
        };

        piXactions['pbpGeneralTake'] = {
            label: 'PlaybackPro general take'
        };

        piXactions['pbpGeneralEndall'] = {
            label: 'PlaybackPro general end all'
        };

        piXactions['pbpGeneralPrevious'] = {
            label: 'PlaybackPro general previous clip'
        };

        piXactions['pbpGeneralNext'] = {
            label: 'PlaybackPro general Next clip'
        };

        piXactions['pbpGeneralPlay'] = {
            label: 'PlaybackPro general play'
        };

        piXactions['pbpGeneralPause'] = {
            label: 'PlaybackPro general pause'
        };

        piXactions['pbpGeneralGoto10'] = {
            label: 'PlaybackPro general goto 10'
        };

        piXactions['pbpGeneralGoto20'] = {
            label: 'PlaybackPro general goto 20'
        };

        piXactions['pbpGeneralGoto30'] = {
            label: 'PlaybackPro general goto 30'
        };
        return piXactions
    },
}