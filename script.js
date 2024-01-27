        let count = 0;
        const set = new Set();
        const allKey = new Set();

        // reload of window
        window.onload = () => {
            let keySet = Object.keys(localStorage);   // object of keys

            keySet.forEach((e) => {
                set.add(localStorage.getItem(e));
                allKey.add(e);
            });

            set.forEach((e) => {
                const img = new Image();
                img.src = e;
                document.querySelector('.image-container').append(img);
            });
            count = set.size+1;
        }

        // addition of element
        const file_el = document.getElementById("file-el");
        const btn = document.getElementById("det-btn");

        file_el.addEventListener('change', () => {
            const reader = new FileReader();

            reader.readAsDataURL(file_el.files[0]);

            reader.addEventListener('load', () => {

                const url = reader.result;
                const img = new Image();
                img.src = url;

                let keyEle = count;
                count++;
                let strKey = String(keyEle);

                if(set.size > 18) {
                    window.alert("Limit Excedds!\nyou can't add more than 18 image!")
                }
                else if(set.has(url)) {
                    window.confirm('this image already present');
                    return;
                }
                while(allKey.has(strKey)) {
                    keyEle = Math.round(Math.random()*1000);
                    strKey = String(keyEle);
                }

                    document.querySelector('.image-container').appendChild(img);
                    set.add(url);
                    allKey.add(keyEle);
                    localStorage.setItem(`${keyEle}`, url);

            });
        });

        // Deletion of image
        let hidEle = document.getElementById("hide");
        function deleteImage() {
            let cont = document.querySelector(".image-container");
            let list = Object.entries(localStorage);
            
            cont.addEventListener("click",(i)=>{

                let elemntSrc = i.target.src;

                for (const [key,value] of list) {
                    if(value == elemntSrc) {
                        if(window.confirm("For Deletion! Press OK\nOR Press Cancel")){
                            localStorage.removeItem(key);
                            allKey.delete(key);
                            location.reload();
                        } 

                        hidEle.setAttribute("id","hide");
                        break;
                    }
                }
            });
        }

        btn.addEventListener("click",()=>{
            if(set.size == 0) {
                window.confirm("there is no image present to delete");
                return;
            }
            hidEle.removeAttribute("id");
            document.getElementById("img-cont").style.background = "#f0efef";
            deleteImage();
        });