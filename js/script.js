'use strict';

// Change active class of rovers buttons and
// change selection dropdown menu options

    const perseverance = document.getElementById("perseverance");
    const curiosity = document.getElementById("curiosity");
    const povSeletorPerseverance = document.getElementById("pov-select-perseverance");
    const povSeletorCuriosity = document.getElementById("pov-select-curiosity");

    perseverance.addEventListener("change", () => {
        perseverance.classList.add("active");
        curiosity.classList.remove("active");
        povSeletorPerseverance.style.display = "inline-block";
        povSeletorCuriosity.style.display = "none";
    },false);

    curiosity.addEventListener("change", () => {
        curiosity.classList.add("active");
        perseverance.classList.remove("active");
        povSeletorPerseverance.style.display = "none";
        povSeletorCuriosity.style.display = "inline-block";
    },false);

    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('max', today);


// Function that starts the search


    const body = document.getElementById("body")
    const form = document.getElementById("form");
    const submitButton = document.getElementById("btn-submit");
    const searchResultBox = document.getElementById("search-result-box");
    const searchResultNumber = document.getElementById("search-result");


    const columnOne = document.getElementById("column1");
    const columnTwo = document.getElementById("column2");
    const columnThree = document.getElementById("column3");
    const popUpImg = document.getElementById("popUpImg");

    console.log(popUpImg)


    submitButton.addEventListener("click", function(e){

        columnOne.innerHTML = "";
        columnTwo.innerHTML = "";
        columnThree.innerHTML = "";

        e.preventDefault();

        var data = new FormData(form);
        searchResultBox.style.display = "none";

        // Check if date input is filled

        if(data.get("date") != ""){
        
            var roverData;

            // Set variables and constants to use the NASA API
        
            const URL_Nasa = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
            let roverType = data.get("radio-option");
            let dateForm = data.get("date");
            let roverPovPerseverance = data.get("pov-select-perseverance");
            let roverPovCuriosity = data.get("pov-select-curiosity");
            const apiKey = "br0NPsC8vL4nnZbUjp9djgc8M4hEo9qlUNUN3puR";

            // Check which rover the user selected

            var povSelected;

            if(roverType == "perseverance"){
                povSelected = roverPovPerseverance;
            }else{
                povSelected = roverPovCuriosity;
            }

            // If the user did not select a POV, the API will fetch all results

            if(povSelected == "all"){
                var urlComplete = URL_Nasa+roverType+'/photos?earth_date='+dateForm+'&api_key='+apiKey;
            }else{
                var urlComplete = URL_Nasa+roverType+'/photos?earth_date='+dateForm+'&camera='+povSelected+'&api_key='+apiKey;
            }

            // Fetch results
            
            fetch(urlComplete)
                .then( nasaData => nasaData.json())
                .then( nasaData => roverData = nasaData)
                .then( () => {

                    // Here it identifies how many results the array has

                    let dataRows = roverData.photos.length;

                    if(dataRows != 0){

                        searchResultBox.style.display = "block";

                        columnOne.innerHTML = "";
                        columnTwo.innerHTML = "";
                        columnThree.innerHTML = "";

                        searchResultNumber.innerHTML = "Showing "+ dataRows +" results in this search"

                        // Start putting the results into columns.

                        window.addEventListener("click", (event) => {
                            const item = document.querySelector(".activeImg");
                            if(item != null){
                                if(!item.contains(event.target)){
                                    item.classList.remove("activeImg");
                                    popUpImg.classList.remove("popUpImgActive");
                                }
                            }
                        }) 

                        for (let i = 0; i < dataRows; i++) {

                            // First column


                                let div = document.createElement("div");
                                div.className = "column-element";
                                let img = document.createElement("img");
                                img.src = roverData.photos[i].img_src;

                                img.addEventListener("click", () => {
                                    img.parentNode.classList.add("activeImg");
                                    popUpImg.classList.add("popUpImgActive");
                                })

                                img.className = "img-column";

                                columnOne.appendChild(div).appendChild(img);

                            // Second column

                            
                            if(i <= dataRows){

                                i++;

                                let div2 = document.createElement("div");
                                let img2 = document.createElement("img");
                                div2.className = "column-element";
                                img2.src = roverData.photos[i].img_src;
                                img2.addEventListener("click", () => {
                                    img2.parentNode.classList.add("activeImg");
                                    popUpImg.classList.add("popUpImgActive");
                                })
                                img2.className = "img-column";
                                
                                columnTwo.appendChild(div2).appendChild(img2);

                            // Third column

                                if(i <= dataRows){

                                    i++

                                    let div3 = document.createElement("div");
                                    let img3 = document.createElement("img");
                                    div3.className = "column-element";
                                    img3.src = roverData.photos[i].img_src;
                                    img3.addEventListener("click", () => {
                                        img3.parentNode.classList.add("activeImg");
                                        popUpImg.classList.add("popUpImgActive");
                                    })
                                    img3.className = "img-column";

                                    columnThree.appendChild(div3).appendChild(img3);
                                }
                            }
                        }
                    }else{
                        searchResultBox.style.display = "block";
                        searchResultNumber.innerHTML = "There are no results for this date or this POV";
                    }
                console.clear();
            })
        }
    })

// Button to go up

    const buttonGoUp = document.getElementById("btn-go-up");

    window.addEventListener("scroll", () =>{
        let scrollY = this.scrollY;
        var screenHeight = screen.height;

        if(scrollY > (screenHeight + (screenHeight/2))){
            buttonGoUp.style.opacity = "1";
        }else{
            buttonGoUp.style.opacity = "0";
        }
    })

    buttonGoUp.addEventListener("click", () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });