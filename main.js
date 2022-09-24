video = "";
status = "";
objects = [];
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(400,600);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 400, 600);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number-of-objects").innerHTML = "Number of Objects Detected are :"+objects.length;

            fill("#66ff00");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#66ff00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
console.log("Model Loaded: ");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}