const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Card = require('../models/card');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const pdfmake = require('pdfmake');
const { createPdf } = require('pdfmake');
console.log("pdfmake", createPdf);
const JSON5 = require('json5');

const SECRET = process.env.APP_SECRET;

PDFDocument.prototype.addSVG = function addSVG(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options);
};

function generateCell(x, y, content, cell) {
  return `
    <g key="${cell}">
      <rect
        x="${x}"
        y="${y}"
        width="194"
        height="194"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />
      <text
        x="${x + 96}"
        y="${y + 124}"
        font-size="64"
        text-anchor="middle"
        alignment-baseline="central"
      >
        ${content}
      </text>
    </g>`;
}
function generateCard(w, h) {
  const freeSpace = Math.round((w * h) / 2 + h - 1);
  h += h;
  const cells = [];
  const totalCells = w * h;
  let data;
  let x = 0;
  let y = 0;
  const bingoStr = 'BINGO';
  let cell = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (cell < 5) {
        data = bingoStr[cell];
      } else {
        data = cell === freeSpace ? 'FREE' : Math.floor(Math.random() * 100);
      }
      if (data < 10) {
        data = `0${data}`;
      }
      x = ((j + 1) * 200);
      y = 200 * (i + 1);
      cells.push(generateCell(x, y, data, cell));
      cell++;
    }
  }
  return `<svg id="preview" viewBox="0 0 1400 1400">${cells.join('')}</svg>`;
}

const CardController = {
  async get(req, res) {
    try {
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const { id } = req.params;

      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const { title, content: card } = await Card.findOne({ _id: id }).exec();
      res.json({
        card,
        title,
      });
    } catch (e) {
      console.log('get card: ', e);
      res.status(422).json({ error: 'Failed to get card' });
    }
  },
  async getAll(req, res) {
    try {
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const id = user._id;

      const cards = await Card.find({ author: id }).exec();
      res.json(cards);
    } catch (e) {
      res.status(422).json({ cards: [] });
    }
  },
  async create(req, res) {
    try {
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const id = user._id;

      const { card, title } = req.body;

      const newCard = await Card.create({
        author: id,
        title: title || 'Bingo Card',
        content: JSON.stringify(card),
      });

      user.cards.push(newCard._id);
      const updateUser = await user.save();
      res.json({
        id: newCard._id,
        card: newCard,
      });
    } catch (e) {
      console.log('/card/create', e);
      res.status(422).json({ error: 'Failed to create card' });
    }
  },
  edit(req, res) {
    res.json({});
  },
  async pdfdownload(req, res) {
    try {
      const { id } = req.params;
      const { content } = await Card.findOne({ _id: id }).exec();
      const pdf = generatePDF(content);


      const response = pdf.pipe(res);
      
      pdf.end();
    } catch (e) {
      console.log(e);
      res.status(422).json({ error: 'failed to download ' });
    }
  },
  async download(req, res) {
    try {
      const { id } = req.params;
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const { content } = await Card.findOne({ _id: id }).exec();

      const card = content;
      // console.log(card);
      // const pdf = generatePDF(card);
      // pdf.pipe(fs.createWriteStream(`./pdfs/${id}.pdf`));
      // pdf.on('end', () => {
      //   res.json({ success: 200 });
      // });
      // pdf.end();
      res.json({ success: 200 });
    } catch (e) {
      console.log(e);
      res.status(422).json({ error: 'Unable to provide download.' });
    }
  },
};

module.exports = CardController;


function generatePDF(card) {
  const curCard = JSON.parse(card);
  console.log('generating');

  const pdfHeader = '{info:{title:\'Bingo Cards\',author:\'Bangarang Bingo\',subject:\'\',keywords:\'\'},pageOrientation:\'portrait\',pageSize:\'A4\',content:[';
  let i = 0;
  let pdfBody = '';
  let pdfBody_oneCard = '';
  let view_topWord = ['B', 'I', 'N', 'G', 'O'];
  let view_pageBreak = '';
  console.log('card', curCard.numCards);
  for (; i < curCard.numCards; i++) {
    console.log('generating');
    pdfBody += `{alignment:'center',background:'',content:[],table:{headerRows:1,widths:[94,94,94,94,94],margin:[22,0,22,0,],heights:[64,16,124,124,124,124,124],body:[[{text:'${view_topWord[0]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[1]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[2]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[3]}',bold:true,style:'top',fontSize:64},{text:'${view_topWord[4]}',bold:true,style:'top',fontSize:64}],[{text:' ',colSpan:5,fillColor:'${curCard.fillColor}'}],['${curCard.cellDat[i + 0]}','${curCard.cellDat[i + 1]}','${curCard.cellDat[i + 2]}','${curCard.cellDat[i + 3]}','${curCard.cellDat[i + 4]}'],['${curCard.cellDat[i + 5]}','${curCard.cellDat[i + 6]}','${curCard.cellDat[i + 7]}','${curCard.cellDat[i + 8]}','${curCard.cellDat[i + 9]}'],['${curCard.cellDat[i + 10]}','${curCard.cellDat[i + 11]}',{text:'\\n\\n${curCard.freeStr}',bold:true,fontSize:${curCard.freeFontSize},color:'${curCard.freeFontColor}'},'${curCard.cellDat[i + 13]}','${curCard.cellDat[i + 14]}'],['${curCard.cellDat[i + 15]}','${curCard.cellDat[i + 16]}','${curCard.cellDat[i + 17]}','${curCard.cellDat[i + 18]}','${curCard.cellDat[i + 19]}'],['${curCard.cellDat[i + 20]}','${curCard.cellDat[i + 21]}','${curCard.cellDat[i + 22]}','${curCard.cellDat[i + 23]}','${curCard.cellDat[i + 24]}']]},${view_pageBreak}layout:{hLineColor:'${curCard.fillColor}', vLineColor:'${curCard.fillColor}',}},`;

    if (i === 0) {
      pdfBody_oneCard = pdfBody;
    }
  }
  const pdfFooter = `],styles:{top:{alignment:'center',color:'#ffffff',fillColor:'${curCard.fillColor}'},sub:{fontSize:32,bold:true, margin:[0,44,0,0,]},fill:{fillColor:'${curCard.fillColor}'},quote:{italics:true},small:{fontSize:8}}}`;

  const multiCard = `${pdfHeader}${pdfBody}${pdfFooter}`;
  const singleCard = `${pdfHeader}${pdfBody_oneCard}${pdfFooter}`;

  const pdf = new pdfmake({
    Roboto: {
      normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
      bold: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
    },
  }).createPdfKitDocument(JSON5.parse(multiCard));

  return pdf;
}
