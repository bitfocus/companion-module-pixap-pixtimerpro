module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'project_name', name: "Project Name"},

		{ variableId: 'speaker_play_status', name: "Speaker Play Status"},
		{ variableId: 'speaker_current', name: "Speaker Current Preset"},
		{ variableId: 'speaker_timer', name: "Speaker Timer H:M:S"},
		{ variableId: 'speaker_timer_ms', name: "Speaker Timer M:S"},
		{ variableId: 'speaker_timer_h', name: "Speaker Timer hour"},
		{ variableId: 'speaker_timer_m', name: "Speaker Timer minute"},
		{ variableId: 'speaker_timer_s', name: "Speaker Timer second"},
		
		{ variableId: 'session_play_status', name: "Session Play Status"},
		{ variableId: 'session_current', name: "Session Current Preset"},
		{ variableId: 'session_timer', name: 'Session Timer H:M:S' },
		{ variableId: 'session_timer_ms', name: "Session Timer M:S"},
		{ variableId: 'session_timer_h', name: "Session Timer hour"},
		{ variableId: 'session_timer_m', name: "Session Timer minute"},
		{ variableId: 'session_timer_s', name: "Session Timer second"},

		{ variableId: 'all_play_status', name: "All Play Status"},

		{ variableId: 'external_timer', name: "External Timer H:M:S"},
		{ variableId: 'external_timer_ms', name: "External Timer M:S"},
		{ variableId: 'external_timer_h', name: "External Timer hour"},
		{ variableId: 'external_timer_m', name: "External Timer minute"},
		{ variableId: 'external_timer_s', name: "External Timer second"},

		{ variableId: 'blackout', name: "Blackout"},

		{ variableId: 'message_show', name: "Message Show/Hide"},

		{ variableId: 'switch_timer_clock', name: "Switch Timer Clock"},

		{ variableId: 'ndi_start', name: "NDI Start/Stop"},
	])
}
