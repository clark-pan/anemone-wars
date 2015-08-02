self.addEventListener('message', function(e){
	switch(e.data[0]){
		case 'start':
			(self.start || function(){})(e.data[2]);
			self.postMessage([e.data[1]]);
		break;
		case 'getMoves':
			//
			var moves = (self.getMoves || function(){ return []; })(e.data[2]);
			self.postMessage([e.data[1], moves]);
		break;
	}
});