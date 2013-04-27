
import processing.xml.*;

XML xml;
int counter = 0;
int curStat = 0;
XML[] stats;

String[] qualities = {
  "posemo", "negemo", "anger", "i", "we", "depression", "honesty"
};
float[] vals = {
  0, 0, 0, 0, 0, 0, 0
};
float[] maxVals = {
  0, 0, 0, 0, 0, 0, 0
};


float easing = 0.05;

void setup() {

  size(400, 400);
  frameRate(30);

  noStroke();
  fill(255, 180);

  xml = loadXML("margaret.xml");
  stats = xml.getChildren("stat");

  printExtremes();
}

void draw() {
  if (curStat < stats.length) {
    float nextFrame = parseFloat(stats[curStat+1].getChild("time").getContent())*frameRate;
    if (counter >= nextFrame) {
      curStat++;
    } 

    noSmooth();
    background(0);
    fill(255, 255);
    playStat(stats[curStat]);

    translate(0, height/2);
    
    smooth();
    fill(255, 180);
    playStat(stats[curStat]);

    counter++;
  } 
  else {
    background(0);
  }

  saveFrame("frames/marg-######.png");
}

void playStat(XML s) {
  float border = 50;
  float w = (width - 2*border)/qualities.length;
  for (int i=0; i<qualities.length; i++) {
    float h = map(parseFloat(s.getChild(qualities[i]).getContent()), -maxVals[i], maxVals[i], -height+2*border, height-2*border);
    vals[i] = constrain(vals[i], 10, height*0.5-2*border);
    vals[i] += (h - vals[i])*easing;
    rect(border+i*(w+1), 0.5*height-border-vals[i], w, vals[i]);
  }
}

void printExtremes() {

  for (int i=30; i<stats.length; i++) {
    for (int j=0; j<qualities.length; j++) {
      maxVals[j] = max(maxVals[j], abs(parseFloat(stats[i].getChild(qualities[j]).getContent())));
    }
  }
  for (int j=0; j<qualities.length; j++) {
    println(qualities[j]+" "+maxVals[j]);
  }
}

