import { getChannels } from "./api.js";
import { renderChannels } from "./ui.js";
import { search } from "./search.js";


 const message = document.querySelector("#message")
//create a globsal array to store channels
let channels = [];

//initalize the application
async function init() {
    

    try {

        //display the loading message
        message.textContent = "Chargement..."

        //fetch channels and update the golbal array
        const channels = await getChannels()

        console.log(channels);
        renderChannels(channels);
        search(channels)

        //clear the message
        message.textContent = "";

    } catch (error) {
        //display error in the console
        console.error(error)

        //error mesage
        message.textContent = "Impossible de changer les channels"
    }
}

init();

