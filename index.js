let parent = document.querySelector('.results');
let songcard = document.createElement('div');
songcard.classList.add("Songcard");
// elements
let thumbnailDiv = document.createElement('div');
thumbnailDiv.classList.add("thumbnail");
let songbodyDiv = document.createElement('div');
songbodyDiv.classList.add("songbody");
// --> childs
let img = document.createElement('img');
img.classList.add = "thumb_image";
let h3 = document.createElement('h3');
h3.classList.add = "title";
let h4 = document.createElement('h4');
h4.classList.add = "author";
let btns = document.createElement('div');
btns.className = "btn";
let gotobtn = document.createElement('a');
gotobtn.className = "watch";
gotobtn.textContent = "Watch"
let downbtn = document.createElement('a');
downbtn.className = "dnlbtn";
downbtn.textContent = "Download";
let text = document.getElementById("song");
let query = text.value;
let submitBtn = document.getElementById("submit");
let errorStatus = document.createElement('p');
errorStatus.className = "error";
errorStatus.textContent = "Please enter something ...";
submitBtn.addEventListener('click',e=>{
    let url = "";
    query = text.value;
    if(query.length !=0){
        const API_HEAD = "https://api.diioffc.web.id/api/search/youtube?query";
        const DOWN_API_HEAD= "https://api.diioffc.web.id/api/download/ytmp3?url=";
        
        new Promise((resolve)=>{
            let request = fetch(`${API_HEAD}=${query.trim()}`);
            resolve(request);
        })
        .then((response)=>{
            if(response.ok){
                return response.json();
            }else{
                console.log("error");
            }
        })
        .then((data)=>{
            if(data.status){
                return data.result[0];
            }
        })
        .catch(err=>{
            console.log(`ERROR ! ${err}`);
        })
        .then((arr)=>{
            console.log(`Search Results found for ${query}`);
            gotobtn.href = arr.url;
            url = arr.url;
            // btns.append(gotobtn);
            downbtn.hidden=true;
            btns.append(downbtn);
        })
        .catch(err=>{
            console.log(`ERROR ! ${err}`);
        })
        // download logic
    .then((res)=>{
        return new Promise(res=>{
        let request = fetch(`${DOWN_API_HEAD}${gotobtn.href}`);
           res(request);
        }); 
      })
      .then(res=>{
          if(res.ok){
              return res.json();
            }
        })
        .catch(err=>{
            console.log(`ERROR ${err}`);
        })
        .then(data=>{
            parent.append(songcard);
            songcard.append(thumbnailDiv);
            img.src = data.result.thumbnail;
            img.alt = data.result.description;
            img.style.width="100%";
            thumbnailDiv.append(img);
            songcard.append(songbodyDiv);
            h3.textContent = data.result.title;
            h3.style.fontSize=".94rem";
            songbodyDiv.append(h3);
            h4.textContent = `Author: ${data.result.author.name}`;
            h4.style.fontFamily="Montserrat"
            h4.style.fontSize = ".94rem"
            songbodyDiv.append(h4);
            songbodyDiv.append(btns);
            downbtn.href = data.result.download.url;
            downbtn.hidden=false;
        })
    }
    else{
        parent.append(errorStatus);
        setTimeout(()=>{
            errorStatus.remove();
        },3000);
    }
    songcard.remove();
});