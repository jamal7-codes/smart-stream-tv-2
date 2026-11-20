import { deleteChannel, getChannels, updateChannel } from "./api.js";
import { renderChannels } from "./ui.js";
import { search } from "./search.js";


export function showToast(message, type = "success") {
    let toast = document.getElementById("toast-notification");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";

        // Position and appearance
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.zIndex = "999999";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "10px";
        toast.style.color = "white";
        toast.style.fontWeight = "bold";
        toast.style.transition = "opacity 0.3s ease";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.backgroundColor =
        type === "success" ? "#16a34a" : "#dc2626";

    toast.style.opacity = "1";

    clearTimeout(toast.hideTimeout);

    toast.hideTimeout = setTimeout(() => {
        toast.style.opacity = "0";
    }, 4000);
}
 
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
        // message.textContent = "";

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
            renderChannels(
                channels.filter(item => item.isBlacklisted),
                "blacklist"
            );;

            // message.textContent = "Channel deleted successfully!";
            showToast("Channel deleted successfully!");

        } catch (error) {
            console.error(error);
            // message.textContent = "Failed to delete channel.";
            showToast("Failed to delete channel.", "error")
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

            // message.textContent = "Favorite updated successfully!";
            showToast("Favorite updated successfully!");

        } catch (error) {
            console.error(error);
            // message.textContent = "Failed to update favorite.";
            showToast("Failed to update favorite.", "error")
        }
        return;
    }
    if (action === "blacklist") {

        try {
            //update channels on the server
            const updatedChannel = await updateChannel(channel.id, {
                isBlacklisted: true
            });

            // update local channel
            channel.isBlacklisted = updatedChannel.isBlacklisted;

            // Hide blacklisted channels
            renderChannels(channels.filter((item) => !item.isBlacklisted));

            // message.textContent = "Channel blacklisted successfully!";
            showToast("Channel blacklisted successfully!", "error")

        } catch (error) {
            console.error(error);
            // message.textContent = "Failed to blacklist channel.";
          showToast("Failed to blacklist channel." , "error")

        }

        return;
    }

    if (action === "restore") {
        try {
            const updatedChannel = await updateChannel(channel.id, {
                isBlacklisted: false
            });

            channel.isBlacklisted = updatedChannel.isBlacklisted;

            renderChannels(
                channels.filter(item => item.isBlacklisted),
                "blacklist"
            );

            //refrech
            // message.textContent = "Channel restored successfully!";
            showToast("Channel restored successfully!")

        } catch (error) {
            console.error(error);
            showToast("Failed to restore channel", "error")
        }

        return;
    }
});
