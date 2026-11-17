import { getChannels } from "./api.js";
import { renderChannels } from "./ui.js";
import { search } from "./search.js";
import { updateChannel } from "./api.js";


 const message = document.querySelector("#message")
//create a globsal array to store channels
let channels = [];

//initalize the application
async function init() {
    
    

    try {

        //display the loading message
        message.textContent = "Chargement..."

        //fetch channels and update the golbal array
        channels = await getChannels()

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

const listcontainer = document.getElementById("channel-list");

listcontainer.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;

    if (action !== "favorite") return;

    const channelElement = button.closest("li");
    const channelId = channelElement.dataset.id;

    const channel = channels.find(
        (channel) => String(channel.id) === String(channelId)
    );

    if (!channel) return;

    try {
        const updatedChannel = await updateChannel(channel.id, {
            isFavorite: !channel.isFavorite
        });

        // Update local data
        channel.isFavorite = updatedChannel.isFavorite;

        // Render again
        renderChannels(channels);

        message.textContent = "Favorite updated successfully!";
    } catch (error) {
        console.error(error);
        message.textContent = "Failed to update favorite.";
    }
});