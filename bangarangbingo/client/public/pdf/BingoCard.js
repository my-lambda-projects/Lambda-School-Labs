const BingoCard = function(tmpValMin,tmpValMax,tmpNumRows,tmpNumCols) {
	this.dateModified = new Date();
	this.init = true;
  
	this.numCards = 1;
	this.valMax = 99;
	this.valMin = 0;
	this.numCenter = 13;
	this.numCells = 25;
	this.numCols = 5;
	this.numRows = 5;

	this.hasDuplicates = true;
	this.isPad0 = true;
	this.isNum = true;
	this.isCenterImg = false;
	this.freeStr = '( FREE )';
	this.isCenterFree = true;

	this.topWord = 'BINGO';
	//this.fontW = 100;
	this.topFontSize = 64;

	//this.freeFontSize = 32?; //4:chars | 3:lines | 1:TopMargin | 12/max
	this.freeFontSize = 22; //10:chars | 5:lines | 2:TopMargin | 50/max
	//this.cellFontSize = 22; //12:chars | 9:lines | 3:TopMargin | 108/max

	this.topFontColor = '#111111';	// white
	this.cellFontColor = '#000000';	// black
	this.freeFontColor = '#800000'; //dark red
	this.fillColor = '#000000';	// black

	this.charMax = 108;
	this.charMaxLine = 12;
	this.marginLines = 3; 
	this.freeMarginLines = 2;

	/*
	this.cellH = 458.0;
	this.cellW = 336.0;
	this.gridH = 14.0;
	this.gridW = 15.0;
	this.iX = 60.0;
	this.iY = 406.0;
	this.cardH = 2822.0;
	this.cardW = 1181.0;
	*/

	this.color = 'Black';
	this.randMode = 'norm';
	this.font = '';
	this.cellStr = '';
	this.deckStr = '';
	this.cell_viewStr = '';
	this.list_viewStr = '';
	this.arrList = [];
	this.cellDat = [];
	this.cellMarginDat = [];
	this.deck = [];
	
	!!tmpNumCols ? tmpNumCols : tmpNumCols = this.numCols;
	!!tmpNumRows ? tmpNumRows : tmpNumRows = this.numRows;

	this.numCells = tmpNumCols * tmpNumRows;
	this.numCenter = Math.round(this.numCells / 2);

	if(typeof tmpValMin !== 'undefined') { this.valMin = tmpValMin; }
	if(typeof tmpValMax !== 'undefined') { this.valMan = tmpValMax; }
};
