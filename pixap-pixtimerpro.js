module.exports = {
    getTimerPresetList(data){
        let timers = data.toString().slice(6).split('/')
        let lp = []
        //this.log('info', 'RECEIVE TIMERS >>> ' + timers)
        for (let i = 0; i < timers.length; i++) {
            let p = timers[i].split(':')
            //this.log('info', `Timer >>> ${p[0].toString()} ${p[1].toString()} ${p[2].toString()} ${p[3].toString()}`)
            let ps = {}
            ps.id = parseInt(p[0])
            ps.color = this.hexToRgb(p[1]) 
            ps.name = p[2]
            ps.speaker = parseInt(p[3])
            //this.log('info', `GET TIMER PRESET LIST >>> ${JSON. stringify(ps)}`)
            lp.push(ps)
        }
        //this.log('info', `GET TIMER PRESET LIST >>> ${JSON. stringify(lp)}`)
        return lp
    },

    getMessagePresetList(data){
        let messages = data.toString().slice(8).split('/')
        let lm = []
        //this.log('info', 'RECEIVE TIMERS >>> ' + timers)
        for (let i = 0; i < messages.length; i++) {
            let p = messages[i].split(':')
            //this.log('info', `Timer >>> ${p[0].toString()} ${p[1].toString()} ${p[2].toString()} ${p[3].toString()}`)
            let pm = {}
            pm.id = parseInt(p[0])
            pm.color = this.hexToRgb(p[1]) 
            pm.name = p[2]
            //this.log('info', `GET MESSAGE PRESET LIST >>> ${JSON. stringify(pm)}`)
            lm.push(pm)
        }
        //this.log('info', `GET TIMER PRESET LIST >>> ${JSON. stringify(lm)}`)
        return lm
    },

    hexToRgb(hex) {
		// Vérifier si l'entrée est une chaîne de caractères valide
		if (typeof hex !== 'string' || !/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
		  return null;
		}
	  
		// Retirer le préfixe "#" si présent
		if (hex.startsWith('#')) {
		  hex = hex.slice(1);
		}
	  
		// Convertir la chaîne hexadécimale en nombres entiers RGB
		const r = parseInt(hex.slice(0, 2), 16);
		const g = parseInt(hex.slice(2, 4), 16);
		const b = parseInt(hex.slice(4, 6), 16);
	  
		// Retourner la valeur RGB sous forme d'objet
		return [ r, g, b ];
	  }
}