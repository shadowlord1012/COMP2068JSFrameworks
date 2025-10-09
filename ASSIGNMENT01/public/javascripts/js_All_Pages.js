/* an image will follow you around on the screen as your "guild" */
const body = document.querySelector("html");
const mouseImage = document.querySelector("#followingMouse");

//Gets the language of the browser
var guildClicked = 0;

mouseImage.addEventListener("click", addMouseOver)

/* Need to make this much slower and catch up to the mouse */
function addMouseOver() {
    if(guildClicked === 0)
        guildClicked = 1;
    body.addEventListener('mousemove', function (e){
        
        $("#followingMouse").css({
            left: e.clientX+10 ,
            top: e.clientY+10
        });
    });
}

