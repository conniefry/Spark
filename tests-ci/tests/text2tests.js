px.import({scene:"px:scene.1.js",
           assert:"../test-run/assert.js",
           shots:"../test-run/tools_screenshot.js",
           manual:"../test-run/tools_manualTests.js"}).then( function ready(imports) {

var scene = imports.scene;
var root = scene.root;
var assert = imports.assert.assert;
var shots = imports.shots;
var manual = imports.manual;

var doScreenshot = shots.getScreenshotEnabledValue();
var manualTest = manual.getManualTestValue();
var timeoutForScreenshot = 40;
var testPlatform=scene.info.build.os;

var basePackageUri = px.getPackageBaseFilePath();

//var textA = "ÉéÈèÇçËëÒòÔôÖöÙùÀàÂâAaBbCcDdEeFfGgHhIiKkLlMmNnOoPpQqRrSsTtVvXxYyZz123456789";
//var longText = textA + "\n" + textA + "\n" + textA;
// "Hello!  How are you?";//
// Use fontUrl to load from web
var fontUrlStart = "https://sparkui.org/examples/fonts/";
var IndieFlower = "IndieFlower.ttf";
var DejaVu = "DejaVuSans.ttf";
var DejaVuSerif = "DejaVuSerif.ttf";
var DancingScript = "DancingScript.ttf";
var DancingScriptBold = "DancingScript-Bold.ttf";
// Different text strings to test
var longText = "Here is a collection of a bunch of randomness, like words, phrases, and sentences that isn't supposed to make any kind of sense whatsoever. I want to test capital AV next to each other here. In generating this, I'm listening to someone talking, trying to make sense of what they are saying, and at the same time dictating to myself what I am going to type along with actually typing it out, recognizing when I make mistakes, and correcting myself when I do.";
var longText2 = "I don't think I'm doing a very good job listening to whoever it is that is doing the talking right now.  It probably would have been a lot easier to just copy and paste something from the net, but I'm a typist, not a person that hunts and pecks to find the appropriate key on the keyboard.  Though I do think I'm probably off of my 30 word per minute speed from way back when.  How much more text is appropriate?  Why do I use words like appropriate when I could just say will do instead?  These and other questions generally go on unanswered.  But looking at the output of this text, I realize that its simply not enough and that I need to add more text; which is making me wonder why I simply didn't copy and paste in the first place.  Ah, yes, the strange musings of a software engineer.";
var longText3 = longText + " " +longText2;
var shortText = "Hello!  How are you?";
var mediumText = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
var newlineText = "Paragraph longer longer\nParagraph\nParagraph longer\nParagraph more";
var continuousText = "ParagraphParagraphParagraphParagraphParagraphParagraphlongerParagraphmore";
var continuousLongText = "ParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmoreParagraphParagraphlongerParagraphlongestParagraphmore";
var multilinesText = "Pxscene is an application engine that has been added to the RDK.\n\
It is a scene graph API exposed to a Javascript engine in the ground.\n\
In other words, it allows for set top box applications to be authored in javascript.\n\
The authored javascript has access to the pxscene API for visual elements that are used for composition.";
var wordBoundaryCharsText = "Paragraph Paragraph Paragraph:Paragraph Paragraph&Paragraph Paragraph,Paragraph Paragraph;Paragraph Paragraph.Paragraph Paragraph?Paragraph Paragraph!Paragraph"; // \t/:&,;.?!
root.w=800;
//
// Use the font vars below to preload fonts so that they stay loaded. 

var fontIndieFlower = scene.create({t:"fontResource",url:fontUrlStart+IndieFlower});
var fontDejaVu = scene.create({t:"fontResource",url:fontUrlStart+DejaVu});
var fontDejaVuSerif = scene.create({t:"fontResource",url:fontUrlStart+DejaVuSerif});
var fontDancingScript = scene.create({t:"fontResource",url:fontUrlStart+DancingScript});
var fontDancingScriptBold = scene.create({t:"fontResource",url:fontUrlStart+DancingScriptBold});





var bg = scene.create({t:"object", parent:root, x:100, y:100, w:1000, h:1000, clip:false});
var rect = scene.create({t:"rect", parent:root, x:100, y:100, w:400, h:400, fillColor:0x00000000, lineColor:0xFF0000FF, lineWidth:1, clip:false});
var container = scene.create({t:"object", parent:root, x:100, y:100, w:800, h:600, clip:false});

// Widgets for displaying metrics values 
var height = scene.create({t:"text", parent:root, x:50, y:0, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"Height="});
var ascent = scene.create({t:"text", parent:root, x:50, y:20, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"Ascent="});
var descent = scene.create({t:"text", parent:root, x:50, y:40, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"Descent="});
var naturalLeading = scene.create({t:"text", parent:root, x:50, y:60, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"NatLead="});
var baseline  = scene.create({t:"text", parent:root, x:50, y:80, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"Baseline="});
var boundsX1 = scene.create({t:"text", parent:root, x:200, y:0, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"BoundsX1="});
var boundsY1 = scene.create({t:"text", parent:root, x:200, y:20, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"BoundsY1="});
var boundsX2 = scene.create({t:"text", parent:root, x:200, y:40, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"BoundsX2="});
var boundsY2 = scene.create({t:"text", parent:root, x:200, y:60, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"BoundsY2="});
var charFirstX = scene.create({t:"text", parent:root, x:400, y:0, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"charFirstX="});
var charFirstY = scene.create({t:"text", parent:root, x:400, y:20, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"charFirstY="});
var charLastX = scene.create({t:"text", parent:root, x:400, y:40, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"charLastX="});
var charLastY = scene.create({t:"text", parent:root, x:400, y:60, textColor:0xFFDDFFFF, pixelSize:15,clip:false,text:"charLastY="});
 
// widgets for tracking current property settings
var truncationStatus = scene.create({t:"text", parent:root, x:20, y:container.y+420, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"truncation=truncate"});
var wrapStatus = scene.create({t:"text", parent:root, x:20, y:container.y+440, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"wordWrap=true"});
var hAlignStatus = scene.create({t:"text", parent:root, x:20, y:container.y+460, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"hAlign=left"});
var vAlignStatus = scene.create({t:"text", parent:root, x:20, y:container.y+480, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"vAlign=top"});
var ellipsisStatus = scene.create({t:"text", parent:root, x:20, y:container.y+500, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"ellipsis=true"});
var pixelSizeStatus = scene.create({t:"text", parent:root, x:20, y:container.y+520, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"pixelSize=20"});
var pixelSizeHint = scene.create({t:"text", parent:root, x:140, y:container.y+520, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"(use p and P)"});
var textStatus = scene.create({t:"text", parent:root, x:350, y:container.y+420, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"text=longest"});
var textHint = scene.create({t:"text", parent:root, x:565, y:container.y+420, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"(use small s)"});
var clipStatus = scene.create({t:"text", parent:root, x:350, y:container.y+440, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"clip=true"});
var xStartPosStatus = scene.create({t:"text", parent:root, x:350, y:container.y+460, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"xStartPos=0"});
var xStopPosStatus = scene.create({t:"text", parent:root, x:350, y:container.y+480, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"xStopPos=0"});
var xStopPosHint = scene.create({t:"text", parent:root, x:465, y:container.y+480, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"(use small L)"});
var leadingStatus = scene.create({t:"text", parent:root, x:350, y:container.y+500, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"leading=0"});
var leadingHint = scene.create({t:"text", parent:root, x:465, y:container.y+500, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"(use + -)"});
var fontStatus = scene.create({t:"text", parent:root, x:350, y:container.y+520, textColor:0xFFDDFFFF, pixelSize:20,clip:false,text:"font="+IndieFlower+" (http)"});
var leading = 0;


var text2 = scene.create({t:"textBox", clip:true, parent:container, x:0, y:0, rx:0, ry:0, rz:0});
   text2.h=400;
   text2.w=400;
   text2.textColor=0xFFDDFFFF;
   text2.pixelSize=20;
   text2.leading=0;
   text2.font=fontIndieFlower;
   text2.alignHorizontal=0;
   text2.alignVertical=0;
   text2.xStartPos=0;
   text2.xStopPos=0;
	 text2.wordWrap=true;
   text2.ellipsis=true;
   text2.truncation=1;

   text2.text=longText3;

                 
var metrics = null;
var measurements = null;

var showMeasurements = function() {
    var bounds = measurements.bounds;
    var charFirst = measurements.charFirst;
    var charLast = measurements.charLast;
    var w = bounds.x2 - bounds.x1;
    var spacing = metrics.height + text2.leading;
    var x = bounds.x1;//0;
    var y = bounds.y1;//0;
    var green = 0x00FF0077;
    var blue = 0x0000FF77;
    var red = 0xFF000077;
    var yellow = 0xFFFF0077;
    var orange = 0xFF8C0077;
    var pink = 0xFF00FF77;
    do {
        scene.create({t:"rect", parent:bg, fillColor:green, x:x, y:y + metrics.baseline - metrics.ascent, w:w, h:metrics.ascent});
        scene.create({t:"rect", parent:bg, fillColor:blue, x:x, y:y + metrics.baseline, w:w, h:metrics.descent});
        scene.create({t:"rect", fillColor:0x00000000, parent:bg, lineColor:red, lineWidth:1, x:x, y:y, w:w, h:metrics.height});
        y += spacing;
    } while (y < bounds.y2);
    scene.create({t:"rect", fillColor:0x00000000, parent:bg, lineColor:yellow, lineWidth:1, x:bounds.x1, y:bounds.y1, w:w, h:bounds.y2 - bounds.y1});
    scene.create({t:"rect", fillColor:0x00000000, parent:bg, lineColor:pink, lineWidth:1, x:charFirst.x, y:charFirst.y, w:charLast.x - charFirst.x, h:(charLast.y - charFirst.y)==0?1:(charLast.y - charFirst.y)});
}


var textready = function(text) {
	console.log("inside text2.ready");
  console.log("text2.h="+text2.h+" and text2.w="+text2.w);

	metrics = text2.font.getFontMetrics(text2.pixelSize);
	console.log("metrics h="+metrics.height);
	console.log("metrics a="+metrics.ascent);
	console.log("metrics d="+metrics.descent);
  console.log("metrics naturalLeading="+metrics.naturalLeading);
  console.log("metrics baseline="+metrics.baseline);

  measurements = text2.measureText();
  console.log("measurements boundsX1="+measurements.bounds.x1);
  console.log("measurements boundsY1="+measurements.bounds.y1);
  console.log("measurements boundsX2="+measurements.bounds.x2);
  console.log("measurements boundsY2="+measurements.bounds.y2);
  console.log("measurements charFirstX="+measurements.charFirst.x);
  console.log("measurements charFirstY="+measurements.charFirst.y);
  console.log("measurements charLastX="+measurements.charLast.x);
  console.log("measurements charLastY="+measurements.charLast.y);

  height.text="Height="+metrics.height;
  ascent.text="Ascent="+metrics.ascent;
  descent.text="Descent="+metrics.descent;
  naturalLeading.text="NatLead="+metrics.naturalLeading;
  baseline.text="Baseline="+metrics.baseline;
  boundsX1.text="BoundsX1="+measurements.bounds.x1;
  boundsY1.text="BoundsY1="+measurements.bounds.y1;
  boundsX2.text="BoundsX2="+measurements.bounds.x2;
  boundsY2.text="BoundsY2="+measurements.bounds.y2;
  charFirstX.text="charFirstX="+measurements.charFirst.x;
  charFirstY.text="charFirstY="+measurements.charFirst.y;
  charLastX.text="charLastX="+measurements.charLast.x;
  charLastY.text="charLastY="+measurements.charLast.y;

  
  showMeasurements();
}

/** HELPER FUNCTIONS FOR CHANGING TEXT2 PROPERTIES **/
var cycleValues = function(v) {
    console.log("v is "+v);
    if( v >= 2) {
      v = 0;
    } else {
      v++;
    }
    console.log("v is now"+v);
    return v;
}
var setText = function(textValue,hintText) {
     text2.text = textValue; 
     textStatus.text = hintText;
}
var toggleWordWrap = function() {
    text2.wordWrap = !text2.wordWrap;
    if( text2.wordWrap) {
      wrapStatus.text ="wordWrap=true";
    } else {
      wrapStatus.text ="wordWrap=false";
    }
}
var toggleEllipsis = function() {
  text2.ellipsis = !text2.ellipsis;
  if( text2.ellipsis) {
    ellipsisStatus.text ="ellipsis=true";
  } else {
    ellipsisStatus.text ="ellipsis=false";
  }
}

var toggleClip = function() {
    text2.clip  = !text2.clip;
    if( text2.clip) {
      clipStatus.text ="clip=true";
    } else {
      clipStatus.text ="clip=false";
    }  
}
var setFont = function(fontName, hintText) {
    text2.font = fontName;
    fontStatus.text = hintText;
}

var setAlignH = function(ha) {

  text2.alignHorizontal = ha;

  if(ha == 0) {
    hAlignStatus.text="hAlign=left";
  } else if(ha == 1) {
    hAlignStatus.text="hAlign=center";
  } else {
    hAlignStatus.text="hAlign=right";
  }   
}
var setAlignV = function(va){
  text2.alignVertical = va;
  if(va == 0) {
    vAlignStatus.text="vAlign=top";
  } else if(va == 1) {
    vAlignStatus.text="vAlign=center";
  } else {
    vAlignStatus.text="vAlign=bottom";
  }
}
var setTruncation = function(t) {
  text2.truncation = t;
  if(t == 0) {
    truncationStatus.text="truncation=none";
  } else if(t == 1) {
    truncationStatus.text="truncation=truncate";
  } else {
    truncationStatus.text="truncation=truncate at word boundary";
  }
}

var setPixelSize = function(p) {
  text2.pixelSize = p;
  pixelSizeStatus.text="pixelSize="+p;
}
var setLeading = function(l) {
  text2.leading = l;
  leadingStatus.text="leading="+l;
}

var setXStartPos = function(s) {
  text2.xStartPos = s; 
  xStartPosStatus.text="xStartPos="+s;
}

var setXStopPos = function(s) {
  text2.xStopPos = s; 
  xStopPosStatus.text="xStopPos="+s;
}


/**********************************************************************/
/**                                                                   */
/**            pxscene tests go in this section                       */
/**                                                                   */
/**********************************************************************/
var expectedTextDesc = [
  ["bounds", "x1"], 
  ["bounds", "y1"], 
  ["bounds", "x2"], 
  ["bounds", "y2"], 
  ["charFirst", "x"], 
  ["charFirst", "y"], 
  ["charLast", "x"], 
  ["charLast", "y"]
  
];
var expectedValuesMeasure = {
  // bounds.x1, bounds.y1, bounds.x2, bounds.y2, charFirst.x, charFirst.y, charLast.x, charLast.y
  "shortTextNoWrapH0":[0,0,164,29,0,20,164,20], // shortTextNoWrapH0
  "shortTextNoWrapH1":[118,0,282,29,118,20,282,20], // shortTextNoWrapH1
  "shortTextNoWrapH2":[236,0,400,29,236,20,400,20], // shortTextNoWrapH2
  "shortTextNoWrapH0V1":[0,185.5,164,214.5,0,205.5,164,205.5], // shortTextNoWrapH0V1
  "shortTextNoWrapH0V2":[0,371,164,400,0,391,164,391], // shortTextNoWrapH0V2
  "shortTextNoWrapH1V1":[118,185.5,282,214.5,118,205.5,282,205.5], //shortTextNoWrapH1V1
  "shortTextNoWrapH1V2":[118,371,282,400,118,391,282,391], //shortTextNoWrapH1V2
  "shortTextNoWrapH2V1":[236,185.5,400,214.5,236,205.5,400,205.5], //shortTextNoWrapH2V1
  "shortTextNoWrapH2V2":[236,371,400,400,236,391,400,391], //shortTextNoWrapH2V2
  "longestTextNoWrapNoTruncateNoClipH0V0":[0,0,2036,29,0,20,2036,20], //longestTextNoWrapNoTruncateNoClipH0V0
  "longestTextNoWrapNoTruncateNoClipH1V0":[-821,0,1221,29,-821,20,1221,20], //longestTextNoWrapNoTruncateNoClipH1V0
  "longestTextWrapNoTruncateNoClipH0V1":[0,-206,400,606,0,-186,372,597], //longestTextWrapNoTruncateNoClipH0V1
  "longestTextWrapNoTruncateNoClipH0V2":[0,-412,400,400,0,-392,372,391], //longestTextWrapNoTruncateNoClipH0V2
  "longestTextNoWrapNoTruncateNoClipH0V1":[0,185.5,2036,214.5,0,205.5,2036,205.5], //longestTextNoWrapNoTruncateNoClipH0V1
  "longestTextNoWrapNoTruncateNoClipH0V2":[0,371,2036,400,0,391,2036,391], //longestTextNoWrapNoTruncateNoClipH0V2
  "longestTextWrapTruncateNoClipH0V0":[0,0,399,377,0,20,399,368], //longestTextWrapNoTruncateNoClipH0V0
  "longestTextWrapTruncateNoClipH0V1":[0,11.5,399,388.5,0,31.5,399,379.5], //longestTextWrapNoTruncateNoClipH0V1
  "longestTextWrapTruncateNoClipH0V2":[0,23,399,400,0,43,399,391], //longestTextWrapTruncateNoClipH0V2
  "longestTextWrapTruncateNoClipH1V0":[3.5,0,402.5,377,3.5,20,399.5,368], //longestTextWrapNoTruncateNoClipH0V0
  "longestTextWrapTruncateNoClipH1V1":[3.5,11.5,402.5,388.5,3.5,31.5,399.5,379.5], //longestTextWrapNoTruncateNoClipH0V1
  "longestTextWrapTruncateNoClipH1V2":[3.5,23,402.5,400,3.5,43,399.5,391], //longestTextWrapTruncateNoClipH1V2
  "newlinesTextNoWrapTruncateClipH1V1":[105.5,142,294.5,258,105.5,162,266.5,249], //newlinesTextNoWrapTruncateClipH1V1
  "continuousTextWrapNoTruncateNoClipH1V1":[2,171,398,229,2,191,336,220], //continuousTextWrapNoTruncateNoClipH1V1
  "multilinesTextWrapNoTruncateNoClipH1V1":[0,69.5,400,330.5,22.5,89.5,267.5,321.5], //multilinesTextWrapNoTruncateNoClipH1V1

  "newlinesTextNoWrapNoTruncateNoClipH0V0":[0,0,189,116,0,20,133,107], //newlinesTextNoWrapNoTruncateNoClipH0V0
  "newlinesTextNoWrapNoTruncateNoClipH0V1":[0,142,189,258,0,162,133,249], //newlinesTextNoWrapNoTruncateNoClipH0V1
  "newlinesTextNoWrapNoTruncateNoClipH0V2":[0,284,189,400,0,304,133,391], //newlinesTextNoWrapNoTruncateNoClipH0V2
  "newlinesTextNoWrapNoTruncateNoClipH1V0":[105.5,0,294.5,116,105.5,20,266.5,107], //newlinesTextNoWrapNoTruncateNoClipH1V0
  "newlinesTextNoWrapNoTruncateNoClipH1V1":[105.5,142,294.5,258,105.5,162,266.5,249], //newlinesTextNoWrapNoTruncateNoClipH1V1
  "newlinesTextNoWrapNoTruncateNoClipH1V2":[105.5,284,294.5,400,105.5,304,266.5,391], //newlinesTextNoWrapNoTruncateNoClipH1V2
  "newlinesTextNoWrapNoTruncateNoClipH2V0":[211,0,400,116,211,20,400,107], //newlinesTextNoWrapNoTruncateNoClipH2V0
  "newlinesTextNoWrapNoTruncateNoClipH2V1":[211,142,400,258,211,162,400,249], //newlinesTextNoWrapNoTruncateNoClipH2V1
  "newlinesTextNoWrapNoTruncateNoClipH2V2":[211,284,400,400,211,304,400,391], //newlinesTextNoWrapNoTruncateNoClipH2V2
  "newlinesTextNoWrapTruncateNoClipH1V1":[105.5,142,294.5,258,105.5,162,266.5,249], //newlinesTextNoWrapTruncateNoClipH1V1


  "newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot":[105.5,0,294.5,116,105.5,20,266.5,107], //newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot
  "newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot":[105.5,0,294.5,116,105.5,20,266.5,107], //newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot
  "newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot":[105.5,0,294.5,146,105.5,20,266.5,137], //newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot
  "newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot":[105.5,0,294.5,146,105.5,20,266.5,137], //newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot
  
  "newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot":[105.5,142,294.5,258,105.5,162,266.5,249], //newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot
  "newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot":[105.5,142,294.5,258,105.5,162,266.5,249], //newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot
  "newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot":[105.5,127,294.5,273,105.5,147,266.5,264], //newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot
  "newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot":[105.5,127,294.5,273,105.5,147,266.5,264], //newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot
  
  "newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot":[105.5,284,294.5,400,105.5,304,266.5,391], //newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot
  "newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot":[105.5,284,294.5,400,105.5,304,266.5,391], //newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot
  "newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot":[105.5,254,294.5,400,105.5,274,266.5,391], //newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot
  "newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot":[105.5,254,294.5,400,105.5,274,266.5,391], //newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot
  
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0":[0,0,1421,29,0,20,1421,20], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1":[0,185.5,1421,214.5,0,205.5,1421,205.5], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2":[0,371,1421,400,0,391,1421,391], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0":[-510.5,0,910.5,29,-510.5,20,910.5,20], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1":[-510.5,185.5,910.5,214.5,-510.5,205.5,910.5,205.5], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2":[-510.5,371,910.5,400,-510.5,391,910.5,391], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0":[-1021,0,400,29,-1021,20,400,20], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1":[-1021,185.5,400,214.5,-1021,205.5,400,205.5], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1
  "wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2":[-1021,371,400,400,-1021,391,400,391], //wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2
  
  "wordBoundaryCharsTextWrapNoTruncateNoClipH0V0":[0,0,360,116,0,20,348,107], //wordBoundaryCharsTextWrapNoTruncateNoClipH0V0
  "wordBoundaryCharsTextWrapNoTruncateNoClipH0V1":[0,142,360,258,0,162,348,249], //wordBoundaryCharsTextWrapNoTruncateNoClipH0V1
  "wordBoundaryCharsTextWrapNoTruncateNoClipH0V2":[0,284,360,400,0,304,348,391], //wordBoundaryCharsTextWrapNoTruncateNoClipH0V2
  "wordBoundaryCharsTextWrapNoTruncateNoClipH1V0":[20,0,380,116,21,20,374,107], //wordBoundaryCharsTextWrapNoTruncateNoClipH1V0
  "wordBoundaryCharsTextWrapNoTruncateNoClipH1V1":[20,142,380,258,21,162,374,249], //wordBoundaryCharsTextWrapNoTruncateNoClipH1V1
  "wordBoundaryCharsTextWrapNoTruncateNoClipH1V2":[20,284,380,400,21,304,374,391], //wordBoundaryCharsTextWrapNoTruncateNoClipH1V2
  "wordBoundaryCharsTextWrapNoTruncateNoClipH2V0":[40,0,400,116,42,20,400,107], //wordBoundaryCharsTextWrapNoTruncateNoClipH2V0
  "wordBoundaryCharsTextWrapNoTruncateNoClipH2V1":[40,142,400,258,42,162,400,249], //wordBoundaryCharsTextWrapNoTruncateNoClipH2V1
  "wordBoundaryCharsTextWrapNoTruncateNoClipH2V2":[40,284,400,400,42,304,400,391], //wordBoundaryCharsTextWrapNoTruncateNoClipH2V2

  "continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0":[0,0,2043,29,0,20,2043,20], //continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0
  "continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0":[-824,0,1224,29,-824,20,1224,20], //continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0
  "continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1":[0,185.5,2043,214.5,0,205.5,2043,205.5], //continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1
  "continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2":[0,371,2043,400,0,391,2043,391], //continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2
  "continuousLongTextWrapTruncateNoClipNoEllipsisH0V0":[0,0,399,377,0,20,396,368], //continuousLongTextWrapTruncateNoClipNoEllipsisH0V0
  "continuousLongTextWrapTruncateNoClipNoEllipsisH0V1":[0,11.5,399,388.5,0,31.5,396,379.5], //continuousLongTextWrapTruncateNoClipNoEllipsisH0V1
  "continuousLongTextWrapTruncateNoClipNoEllipsisH0V2":[0,23,399,400,0,43,396,391], //continuousLongTextWrapTruncateNoClipNoEllipsisH0V2
  "continuousLongTextWrapTruncateNoClipNoEllipsisH1V0":[0.5,0,399.5,377,2,20,398,368], //continuousLongTextWrapTruncateNoClipNoEllipsisH1V0
  "continuousLongTextWrapTruncateNoClipNoEllipsisH1V1":[0.5,11.5,399.5,388.5,2,31.5,398,379.5], //continuousLongTextWrapTruncateNoClipNoEllipsisH1V1
  "continuousLongTextWrapTruncateNoClipNoEllipsisH1V2":[0.5,23,399.5,400,2,43,398,391], //continuousLongTextWrapTruncateNoClipNoEllipsisH1V2

  "continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1":[0,-293,399,693,0,-273,263,684], //continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1
  "continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2":[0,-586,399,400,0,-566,263,391], //continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2
  
  "continuousLongTextWrapTruncateNoClipEllipsisH0V0":[0,0,399,377,0,20,391,368], //continuousLongTextWrapTruncateNoClipEllipsisH0V0
  "continuousLongTextWrapTruncateNoClipEllipsisH0V1":[0,11.5,399,388.5,0,31.5,391,379.5], //continuousLongTextWrapTruncateNoClipEllipsisH0V1
  "continuousLongTextWrapTruncateNoClipEllipsisH0V2":[0,23,399,400,0,43,391,391], //continuousLongTextWrapTruncateNoClipEllipsisH0V2
  "continuousLongTextWrapTruncateNoClipEllipsisH1V0":[0.5,0,399.5,377,2,20,395.5,368], //continuousLongTextWrapTruncateNoClipEllipsisH1V0
  "continuousLongTextWrapTruncateNoClipEllipsisH1V1":[0.5,11.5,399.5,388.5,2,31.5,395.5,379.5], //continuousLongTextWrapTruncateNoClipEllipsisH1V1
  "continuousLongTextWrapTruncateNoClipEllipsisH1V2":[0.5,23,399.5,400,2,43,395.5,391], //continuousLongTextWrapTruncateNoClipEllipsisH1V2
  
};

var textMeasurementResults = function(values) {
  var results = [];
  var numResults = values.length;
  for( var i = 0; i < numResults; i++) {

    results[i] = assert(measurements[expectedTextDesc[i][0]][expectedTextDesc[i][1]] === values[i], "measurements "+expectedTextDesc[i][0]+"."+expectedTextDesc[i][1]+" should be "+values[i]+" but is "+measurements[expectedTextDesc[i][0]][expectedTextDesc[i][1]]);
  }
  return results;
}
var cleanup = function () {
  text2.parent=container;
  bg.x=container.x;
  bg.y=container.y;
}
var setParentToRoot = function () {

  text2.parent=root;
  bg.x=root.x;
  bg.y=root.y;
}

var beforeStart = function() {
  return new Promise(function(resolve, reject) {

    // Setup all properties as assumed for start of tests
    // set to short text, wordWrap=false, pixelSize, hAlign=left 
    setFont(fontIndieFlower,"font="+IndieFlower+" (http)");
    if( text2.wordWrap) {
      toggleWordWrap();
    }
    setPixelSize(20);
    setLeading(0);
    setAlignH(0);
    setAlignV(0);
    if( text2.clip) {
      toggleClip();
    }
    setTruncation(0);
    if( text2.ellipsis) {
      toggleEllipsis();
    }
    setXStartPos(0);
    setXStopPos(0);
  
  
    resolve("text2tests.js beforeStart");
  });
}

var doScreenshotComparison = function(name, resolve, reject) 
{
    var results =  textMeasurementResults(expectedValuesMeasure[name]);

    //shots.takeScreenshot(false).then(function(link){
      shots.validateScreenshot(basePackageUri+"/images/screenshot_results/"+testPlatform+"/text2tests_"+name+".png", false).then(function(match){
        console.log("test result is match: "+match);
        results.push(assert(match == true, "screenshot comparison for "+name+" failed"));
        resolve(results);
      //});
    }).catch(function(err) {
        results.push(assert(false, "screenshot comparison for "+name+" failed due to error: "+err));
        resolve(results);
    });
 
}

var tests = {

  shortTextNoWrapH0: function() {
   console.log("text2tests.js shortTextNoWrapH0");
   setText( shortText,"text=short");
   setAlignH(0);
   setAlignV(0);
   console.log("shortTextNoWrapH0 is "+expectedValuesMeasure.shortTextNoWrapH0);
   
   return new Promise(function(resolve, reject) {
 
     text2.ready.then(function() {
       // Test measurements and bounds
       //var results = [];
       bg.removeAll();
       textready(text2);
       if( doScreenshot) 
       {
           setTimeout( function() {
             doScreenshotComparison("shortTextNoWrapH0", resolve)
           }, timeoutForScreenshot);
       } 
       else 
         resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH0));
       
 
     }, function(o) {
       resolve(assert(false,'shortTextNoWrapH0 Promise rejection received'));
     });
   });
 },
 
 shortTextNoWrapH0V1: function() {
   console.log("text2tests.js shortTextNoWrapH0V1");
 
   setText( shortText,"text=short");
   setAlignH(0);
   setAlignV(1);
   
   return new Promise(function(resolve, reject) {
 
     text2.ready.then(function() {
       // Test measurements and bounds
       //var results = [];
       bg.removeAll();
       textready(text2);
       if( doScreenshot) 
       {
           setTimeout( function() {
             doScreenshotComparison("shortTextNoWrapH0V1", resolve)
           }, timeoutForScreenshot);
       } 
       else 
         resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH0V1));
 
     }, function(o) {
       resolve(assert(false,'shortTextNoWrapH0V1 Promise rejection received'));
     });
   });
 },
 
   shortTextNoWrapH0V2: function() {
     console.log("text2tests.js shortTextNoWrapH0V2");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(0);
     setAlignV(2);
       
     return new Promise(function(resolve, reject) {
 
     text2.ready.then(function() {
       // Test measurements and bounds
       //var results = [];
       bg.removeAll();
       textready(text2);
       if( doScreenshot) 
       {
           setTimeout( function() {
             doScreenshotComparison("shortTextNoWrapH0V2", resolve)
           }, timeoutForScreenshot);
       } 
       else 
         resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH0V2));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH0V2 Promise rejection received'));
       });
     });
   },
 
   shortTextNoWrapH1: function() {
     console.log("text2tests.js shortTextNoWrapH1");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(1);
     setAlignV(0);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH1));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH1 Promise rejection received'));
       });
     });
   },
   shortTextNoWrapH1V1: function() {
     console.log("text2tests.js shortTextNoWrapH1");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(1);
     setAlignV(1);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH1V1));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH1V1 Promise rejection received'));
       });
     });
   },
   shortTextNoWrapH1V2: function() {
     console.log("text2tests.js shortTextNoWrapH1V2");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(1);
     setAlignV(2);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve( textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH1V2));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH1V2 Promise rejection received'));
       });
     });
   },
 
   shortTextNoWrapH2: function() {
     console.log("text2tests.js shortTextNoWrapH2");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(2);
     setAlignV(0);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH2));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH2 Promise rejection received'));
       });
     });
   },
   shortTextNoWrapH2V1: function() {
     console.log("text2tests.js shortTextNoWrapH2V1");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(2);
     setAlignV(1);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH2V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH2V1));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH2V2 Promise rejection received'));
       });
     });
   }, 
   shortTextNoWrapH2V2: function() {
     console.log("text2tests.js shortTextNoWrapH2V2");
     // set to short text
     setText( shortText,"text=short");
     setAlignH(2);
     setAlignV(2);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("shortTextNoWrapH2V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.shortTextNoWrapH2V2));
 
       }, function(o) {
         resolve(assert(false,'shortTextNoWrapH1 Promise rejection received'));
       });
     });
   },
   longestTextNoWrapNoTruncateNoClipH0V0: function() {
     console.log("text2tests.js longestTextNoWrapNoTruncateNoClipH0V0");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(0);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextNoWrapNoTruncateNoClipH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextNoWrapNoTruncateNoClipH0V0));
 
       }, function(o) {
         resolve(assert(false,'longestTextNoWrapNoTruncateNoClipH0V0 Promise rejection received'));
       });
     });
   },
   longestTextNoWrapNoTruncateNoClipH1V0: function() {
     console.log("text2tests.js longestTextNoWrapNoTruncateNoClipH1V0");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(1);
     setAlignV(0);
     
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextNoWrapNoTruncateNoClipH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextNoWrapNoTruncateNoClipH1V0));
 
       }, function(o) {
         resolve(assert(false,'longestTextNoWrapNoTruncateNoClipH1V0 Promise rejection received'));
       });
     });
   },
   longestTextWrapNoTruncateNoClipH0V1: function() {
     console.log("text2tests.js longestTextWrapNoTruncateNoClipH0V1");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(1);
     setTruncation(0);
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapNoTruncateNoClipH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapNoTruncateNoClipH0V1));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapNoTruncateNoClipH0V1 Promise rejection received'));
       });
     });
   },
   longestTextWrapNoTruncateNoClipH0V2: function() {
     console.log("text2tests.js longestTextWrapNoTruncateNoClipH0V2");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(2);
     setTruncation(0);
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapNoTruncateNoClipH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapNoTruncateNoClipH0V2));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapNoTruncateNoClipH0V2 Promise rejection received'));
       });
     });
   },
   longestTextNoWrapNoTruncateNoClipH0V1: function() {
     console.log("text2tests.js longestTextNoWrapNoTruncateNoClipH0V1");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(1);
     setTruncation(0);
     if( text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextNoWrapNoTruncateNoClipH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextNoWrapNoTruncateNoClipH0V1));
 
       }, function(o) {
         resolve(assert(false,'longestTextNoWrapNoTruncateNoClipH0V1 Promise rejection received'));
       });
     });
   },
   longestTextNoWrapNoTruncateNoClipH0V2: function() {
     console.log("text2tests.js longestTextNoWrapNoTruncateNoClipH0V2");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(2);
     setTruncation(0);
     if( text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextNoWrapNoTruncateNoClipH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextNoWrapNoTruncateNoClipH0V2));
 
       }, function(o) {
         resolve(assert(false,'longestTextNoWrapNoTruncateNoClipH0V2 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH0V0: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH0V0");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(0);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH0V0));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH0V0 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH0V1: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH0V1");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH0V1));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH0V1 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH0V2: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH0V2");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(0);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH0V2));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH0V2 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH1V0: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH1V0");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(1);
     setAlignV(0);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH1V0));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH1V0 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH1V1: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH1V1");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(1);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH1V1));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   longestTextWrapTruncateNoClipH1V2: function() {
     console.log("text2tests.js longestTextWrapTruncateNoClipH1V2");
     // set to longest text
     setText( longText3,"text=longest");
     setAlignH(1);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("longestTextWrapTruncateNoClipH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.longestTextWrapTruncateNoClipH1V2));
 
       }, function(o) {
         resolve(assert(false,'longestTextWrapTruncateNoClipH1V2 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapTruncateClipH1V1: function() {
     console.log("text2tests.js newlinesTextNoWrapTruncateClipH1V1");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(1);
     if( !text2.clip) {
       toggleClip();
     }
     if( text2.wordWrap) {
       toggleWordWrap();
     }
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapTruncateClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapTruncateClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapTruncateClipH1V1 Promise rejection received'));
       });
     });
   },
   continuousTextWrapNoTruncateNoClipH1V1: function() {
     console.log("text2tests.js continuousTextWrapNoTruncateNoClipH1V1");
     // set to longest text
     setText(continuousText,"text=continuousText");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     if( text2.clip) {
      toggleClip();
    }
    if( !text2.wordWrap) {
      toggleWordWrap();
    }
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousTextWrapNoTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.continuousTextWrapNoTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'continuousTextWrapNoTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   multilinesTextWrapNoTruncateNoClipH1V1: function() {
     console.log("text2tests.js multilinesTextWrapNoTruncateNoClipH1V1");
     // set to longest text
     setText(multilinesText,"text=multilinesText");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     if( text2.clip) {
      toggleClip();
    }
    if( !text2.wordWrap) {
      toggleWordWrap();
    }
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("multilinesTextWrapNoTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.multilinesTextWrapNoTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'multilinesTextWrapNoTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH0V0: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH0V0");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(0);
     setAlignV(0);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH0V0));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH0V0 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH0V1: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH0V1");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(0);
     setAlignV(1);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH0V1));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH0V1 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH0V2: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH0V2");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(0);
     setAlignV(2);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH0V2));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH0V2 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH1V0: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH1V0");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH1V0));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH1V0 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH1V1: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH1V1");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH1V2: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH1V2");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH1V2));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH1V2 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH2V0: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH2V0");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(2);
     setAlignV(0);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH2V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH2V0));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH2V0 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH2V1: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH2V1");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(2);
     setAlignV(1);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH2V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH2V1));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH2V1 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipH2V2: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipH2V2");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(2);
     setAlignV(2);
     setTruncation(0);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipH2V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipH2V2));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipH2V2 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapTruncateNoClipH1V1: function() {
     console.log("text2tests.js newlinesTextNoWrapTruncateNoClipH1V1");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(1);
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V0ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipNoLeadingH1V0ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipLeadingH1V0ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipLeadingH1V0ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V1ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipLeadingH1V1ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipLeadingH1V1ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipNoLeadingH1V2ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipNoLeadingH1V1ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot));
           cleanup()
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipNoLeadingH1V2ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateNoClipLeadingH1V2ParentRoot Promise rejection received'));
       });
     });
   },
   newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot: function() {
     console.log("text2tests.js newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot");
     // set to longest text
     setText(newlineText,"text=newlines");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=10;
     setParentToRoot();
     text2.clip=true;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
         bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot", resolve)
             }, timeoutForScreenshot).then(function(){
              cleanup();});

         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot));
           cleanup();
         }
       }, function(o) {
         resolve(assert(false,'newlinesTextNoWrapNoTruncateClipLeadingH1V2ParentRoot Promise rejection received'));
       });
     });
   }, wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0: function() {
    console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(0);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=false;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();
        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V0 Promise rejection received'));
      });
    });
  },
  wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1: function() {
    console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(1);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=false;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();
        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V1 Promise rejection received'));
      });
    });
  },
  wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2: function() {
    console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(2);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=false;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();
        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH0V2 Promise rejection received'));
      });
    });
  },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V0 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH1V2 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V0 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V1 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2: function() {
     console.log("text2tests.js wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=false;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
 
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextNoWrapNoTruncateNoClipH2V2 Promise rejection received'));
       });
     });
   }, 
   wordBoundaryCharsTextWrapNoTruncateNoClipH0V0: function() {
    console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH0V0");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(0);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=true;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();
        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH0V0", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH0V0));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH0V0 Promise rejection received'));
      });
    });
  },
  wordBoundaryCharsTextWrapNoTruncateNoClipH0V1: function() {
    console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH0V1");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(1);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=true;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();
        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH0V1", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH0V1));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH0V1 Promise rejection received'));
      });
    });
  },
  wordBoundaryCharsTextWrapNoTruncateNoClipH0V2: function() {
    console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH0V2");
    // set to longest text
    setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
    setAlignH(0);
    setAlignV(2);
    setTruncation(0);
    text2.leading=0;
    text2.clip=false;
    text2.wordWrap=true;

    return new Promise(function(resolve, reject) {
      text2.ready.then(function(myText) {
        bg.removeAll();

        textready(myText);
        if( doScreenshot) 
        {
            setTimeout( function() {
              doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH0V2", resolve)
            }, timeoutForScreenshot);
        } 
        else {
          resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH0V2));
        }
      }, function(o) {
        resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH0V2 Promise rejection received'));
      });
    });
  },
   wordBoundaryCharsTextWrapNoTruncateNoClipH1V0: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH1V0");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
 
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH1V0));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH1V0 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextWrapNoTruncateNoClipH1V1: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH1V1");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH1V1));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH1V1 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextWrapNoTruncateNoClipH1V2: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH1V2");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(1);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH1V2));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH1V2 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextWrapNoTruncateNoClipH2V0: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH2V0");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(0);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH2V0", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH2V0));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH2V0 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextWrapNoTruncateNoClipH2V1: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH2V1");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(1);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH2V1", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH2V1));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH2V1 Promise rejection received'));
       });
     });
   },
   wordBoundaryCharsTextWrapNoTruncateNoClipH2V2: function() {
     console.log("text2tests.js wordBoundaryCharsTextWrapNoTruncateNoClipH2V2");
     // set to longest text
     setText(wordBoundaryCharsText,"text=wordBoundaryCharsText");
     setAlignH(2);
     setAlignV(2);
     setTruncation(0);
     text2.leading=0;
     text2.clip=false;
     text2.wordWrap=true;
 
     return new Promise(function(resolve, reject) {
       text2.ready.then(function(myText) {
        bg.removeAll();
         textready(myText);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("wordBoundaryCharsTextWrapNoTruncateNoClipH2V2", resolve)
             }, timeoutForScreenshot);
         } 
         else {
           resolve(textMeasurementResults(expectedValuesMeasure.wordBoundaryCharsTextWrapNoTruncateNoClipH2V2));
         }
       }, function(o) {
         resolve(assert(false,'wordBoundaryCharsTextWrapNoTruncateNoClipH2V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0: function() {
     console.log("text2tests.js continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(0);
     setTruncation(0);
     if(text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
    
    if (text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0: function() {
     console.log("text2tests.js continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(0);
     setTruncation(0);
     if(text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }

     if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH1V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1: function() {
     console.log("text2tests.js continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(1);
     setTruncation(0);
     if(!text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
 
    if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2: function() {
     console.log("text2tests.js continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(2);
     setTruncation(0);
     if(!text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
 
    if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapNoTruncateNoClipNoEllipsisH0V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1: function() {
     console.log("text2tests.js continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(1);
     setTruncation(0);
     if(text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
 
     if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2: function() {
     console.log("text2tests.js continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(2);
     setTruncation(0);
     if(text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
 
     if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextNoWrapNoTruncateNoClipNoEllipsisH0V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH0V0: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH0V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(0);
     setTruncation(1);
     if(!text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
    if (text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH0V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH0V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH0V1: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH0V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH0V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH0V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH0V2: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH0V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH0V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH0V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH1V0: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH1V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(0);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH1V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH1V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH1V1: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH1V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH1V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH1V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH1V2: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipNoEllipsisH1V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipNoEllipsisH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipNoEllipsisH1V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipNoEllipsisH1V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipNoEllipsisH0V0: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH0V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(0);
     setTruncation(1);
     if(!text2.wordWrap) {
      toggleWordWrap();
    }
    if (text2.clip) {
      toggleClip();
    }
    if (!text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH0V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH0V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH0V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipEllipsisH0V1: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH0V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( !text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH0V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH0V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH0V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipEllipsisH0V2: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH0V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(0);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( !text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH0V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH0V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH0V2 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipEllipsisH1V0: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH1V0");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(0);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( !text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH1V0", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH1V0));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH1V0 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipEllipsisH1V1: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH1V1");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(1);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( !text2.ellipsis) {
      toggleEllipsis();
    }
 
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH1V1", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH1V1));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH1V1 Promise rejection received'));
       });
     });
   },
   continuousLongTextWrapTruncateNoClipEllipsisH1V2: function() {
     console.log("text2tests.js continuousLongTextWrapTruncateNoClipEllipsisH1V2");
     // set to longest text
     setText( continuousLongText,"text=continuousLong");
     setAlignH(1);
     setAlignV(2);
     setTruncation(1);
     if( text2.clip) {
       toggleClip();
     }
     if( !text2.wordWrap) {
       toggleWordWrap();
     }
     if( !text2.ellipsis) {
      toggleEllipsis();
    }
     return new Promise(function(resolve, reject) {
 
       text2.ready.then(function() {
         bg.removeAll();
         textready(text2);
         if( doScreenshot) 
         {
             setTimeout( function() {
               doScreenshotComparison("continuousLongTextWrapTruncateNoClipEllipsisH1V2", resolve)
             }, timeoutForScreenshot);
         } 
         else 
           resolve(textMeasurementResults(expectedValuesMeasure.continuousLongTextWrapTruncateNoClipEllipsisH1V2));
 
       }, function(o) {
         resolve(assert(false,'continuousLongTextWrapTruncateNoClipEllipsisH1V2 Promise rejection received'));
       });
     });
   }
 }

module.exports.beforeStart = beforeStart;
module.exports.tests = tests;


if(manualTest === true) {

  manual.runTestsManually(tests, beforeStart);

}


}).catch( function importFailed(err){
  console.error("Import failed for text2tests.js: " + err)
});
