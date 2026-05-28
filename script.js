const learnButton = document.getElementById("learnBtn");
const learnElement = document.getElementById("learnElmnt");
const mainPage = document.getElementById("mainPage");
const abtBckBtn = document.getElementById("abtBckBtn");

learnButton.addEventListener("click", function () {

    mainPage.style.display = "none";

    learnElement.style.display = "flex";

    learnElement.scrollIntoView({ behavior: "smooth" });

});

abtBckBtn.addEventListener("click", function () {

    mainPage.style.display = "block";

    learnElement.style.display = "none";

   window.scrollTo({ 
    top: 0, 
    behavior: "smooth"

   });


});