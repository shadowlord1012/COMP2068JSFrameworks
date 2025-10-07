/* an image will follow you around on the screen as your "guild" */
const body = document.querySelector("html");
const mouseImage = document.querySelector("#followingMouse");
const hoverBoxArea = document.getElementById('hoverArea');
const revealedTextArea = document.getElementById('revealedText');
const hiddenText = document.getElementById('hiddentText');

//Gets the language of the browser
var guildClicked = 0;
if(hoverBoxArea != null)
    hoverBoxArea.addEventListener("mouseover", function (){
        if(guildClicked === 1){
            revealedTextArea.style.display = 'block';
        }
        else
        {
            hiddenText.setAttribute(this.hidden, false);
        }
    });
if(hoverBoxArea != null)
    hoverBoxArea.addEventListener("mouseout", function (){
        if(guildClicked===1){
            revealedTextArea.style.display = 'none';
        }
        else {
            hiddenText.setAttribute(this.hidden, true);
        }
    });

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

