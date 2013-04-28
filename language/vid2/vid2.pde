
import processing.xml.*;

XML xml;
int counter = 0;
int curStat = 0;
XML[] stats;

String[] qualities = {
  "posemo", "negemo", "anger", "i", "we", "depression", "honesty"
};
//joy, sorrow, anger, pride, affection, regret, honesty ?
int curQuality = 2;

float[] pastVals;

float[] vals = {
  0, 0, 0, 0, 0, 0, 0
};
float[] maxVals = {
  0, 0, 0, 0, 0, 0, 0
};


float easing = 0.02;

void setup() {

  size(1280, 720);
  frameRate(30);

  noStroke();
  fill(255, 180);

  pastVals = new float[width];

  xml = loadXML("husband.xml");
  stats = xml.getChildren("stat");

  printExtremes();
}

void draw() {
  if (curStat < stats.length) {

    float lastFrame;
    if (curStat == 0) lastFrame = 0;
    else lastFrame = parseFloat(stats[curStat-1].getChild("time").getContent())*30;
    float nextFrame = parseFloat(stats[curStat].getChild("time").getContent())*30;

   // println(counter+" "+lastFrame+" t:"+stats[curStat].getChild("time").getContent()+" fr:"+frameRate+" "+nextFrame);
    
    noSmooth();
    background(0);
    stroke(255, 255);
    float pct = ((float)counter-lastFrame)/(nextFrame-lastFrame);
    
    float s0;
    if (curStat == 0) s0 = 0;
    else s0 = parseFloat(stats[curStat-1].getChild(qualities[curQuality]).getContent());
    float s1 = parseFloat(stats[curStat].getChild(qualities[curQuality]).getContent());
    doStat(s0, s1, pct);

    for (int i=0; i<width; i++) {
      line(i, height, i, height-pastVals[i]);
    }
    
    
    if (counter >= nextFrame) {
      curStat++;
    } 
    counter++;
    saveFrame("frames/husband-anger-######.png");
  } 
  else {
    background(255, 0, 0);
  }

}


void doStat(float s0, float s1, float pct) {
  float w = (width)/qualities.length;
  float h = map(s0, -maxVals[curQuality], maxVals[curQuality], -0.9*height, 0.9*height);
  float nextH = map(s1, -maxVals[curQuality], maxVals[curQuality], -0.9*height, 0.9*height);

  for (int j=0; j<width-1; j++) {
    pastVals[j] = pastVals[j+1];
  }

  float target = h;// + (nextH-h)*pct;

  pastVals[width-1] = constrain(target, 0, 0.9*height);
  //println(frameCount+" "+curStat+" "+s1);
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

