import { deleteChannel, getChannels } from "./api.js";
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

    const channelElement = button.closest("li");
    const channelId = channelElement.dataset.id;

    const channel = channels.find(
        (channel) => String(channel.id) === String(channelId)
    );

    if (!channel) return;

    // delete action
    if (action === "delete") {

        const confirmed = confirm(
            "Are you sure you want to delete this channel?"
        );

        if (!confirmed) return;

        try {
            // delete from server
            await deleteChannel(channelId);

            // remove from local array
            channels = channels.filter(
                (item) => String(item.id) !== String(channelId)
            );

            //render update list
            renderChannels(channels);

            message.textContent = "Channel deleted successfully!";

        } catch (error) {
            console.error(error);
            message.textContent = "Failed to delete channel.";
        }

        return;
    }

    // favorite
    if (action === "favorite") {

        try {
            const updatedChannel = await updateChannel(channel.id, {
                isFavorite: !channel.isFavorite
            });

            channel.isFavorite = updatedChannel.isFavorite;

            renderChannels(channels);

            message.textContent = "Favorite updated successfully!";

        } catch (error) {
            console.error(error);
            message.textContent = "Failed to update favorite.";
        }
        return;
    }
});
