
import processing.xml.*;

XML xml;
int counter = 0;
int curStat = 0;
XML[] stats;

String[] qualities = {
  "posemo", "negemo", "anger", "i", "we", "depression", "honesty"
};

String[] qualityNames = {
  "joy", "sorrow", "anger", "pride", "affection", "regret", "honesty"
};
int curQuality = 0;

float[] pastVals;

float[] vals = {
  0, 0, 0, 0, 0, 0, 0
};
float[] maxVals = {
  0, 0, 0, 0, 0, 0, 0
};

int valsLength;

float easing = 0.02;

void setup() {

  xml = loadXML("sam.xml");
  stats = xml.getChildren("stat");

  printExtremes();
  pastVals = new float[valsLength];
  
  size(valsLength, 720);
  
  fill(0);
  stroke(255);
  smooth();
  

  noLoop();
}

void draw() {
  
  while (curQuality < qualities.length) {
    
    while (counter < valsLength) {
  
      float lastFrame;
      if (curStat == 0) lastFrame = 0;
      else lastFrame = parseFloat(stats[curStat-1].getChild("time").getContent())*30;
      float nextFrame = parseFloat(stats[curStat].getChild("time").getContent())*30;
  
     // println(counter+" "+lastFrame+" t:"+stats[curStat].getChild("time").getContent()+" fr:"+frameRate+" "+nextFrame);
      
      float pct = ((float)counter-lastFrame)/(nextFrame-lastFrame);
      
      float s0;
      if (curStat == 0) s0 = 0;
      else s0 = parseFloat(stats[curStat-1].getChild(qualities[curQuality]).getContent());
      float s1 = parseFloat(stats[curStat].getChild(qualities[curQuality]).getContent());
      doStat(s0, s1, pct);
      
      if (counter >= nextFrame) {
        curStat++;
      } 
      counter++;
    } 
    
    rect(0, 0, width, height);
    for (int i=0; i<valsLength; i++) {
      line(i, height, i, height-pastVals[i]);
      pastVals[i] = 0;
    }
    saveFrame("frames/sam-"+qualityNames[curQuality]+".png");
    
    curStat = 0;
    counter = 0;
    curQuality++;
  }

}


void doStat(float s0, float s1, float pct) {
  float w = (width)/qualities.length;
  float h = map(s0, -maxVals[curQuality], maxVals[curQuality], -0.9*height, 0.9*height);
  float nextH = map(s1, -maxVals[curQuality], maxVals[curQuality], -0.9*height, 0.9*height);

  float target = h;// + (nextH-h)*pct;

  pastVals[counter] = constrain(target, 0, 0.9*height);
  println(curStat+" "+s1);
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
  
  valsLength = int(parseFloat(stats[stats.length-1].getChild("time").getContent())*30)+1;
}

