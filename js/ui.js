
export function renderChannels(channels) {

    const preview_video = document.getElementById("preview-video");
    const previewTitle = document.getElementById("preview-title");

    const listcontainer = document.getElementById("channel-list");

    // Clear the previous channels
    listcontainer.innerHTML = "";

    //check if there are no channels
    if(channels.length === 0) {
        listcontainer.textContent = "No channels found."
        listcontainer.classList.add("text-white/70");
        return;
    }

    // Create the list
    const listElement = document.createElement("ul");

    listElement.className = "flex gap-3 w-max md:w-full md:flex-col";

    listcontainer.appendChild(listElement);

    // Loop through channels
    channels.forEach((channel) => {

        // Create li
        const listItem = document.createElement("li");

        listItem.className = "group bg-[#202B45] hover:bg-[#7C5CFC] text-white p-4 rounded-lg cursor-pointer transition flex-shrink-0 flex items-center gap-3";

        // Store channel ID
        listItem.dataset.id = channel.id;

        // Create logo
        const channelLogo = document.createElement("img");

        channelLogo.src = channel.logo;
        channelLogo.alt = channel.name;
        channelLogo.className = "w-10 h-12 object-contain";

        // Create channel text
        const channelText = document.createElement("span");

        channelText.textContent = `${channel.channelNumber} - ${channel.name}`;

        // Create favorite button
        const favButton = document.createElement("button");

        favButton.type = "button";
        favButton.className = "favButton w-6 h-6 ml-auto flex-shrink-0 cursor-pointer";
        favButton.dataset.action = "favorite";

        // Display favorite status
        favButton.textContent = channel.isFavorite ? "★" : "☆";

        // Append elements to li
        listItem.appendChild(channelLogo);
        listItem.appendChild(channelText);
        listItem.appendChild(favButton);

        // Append li to ul
        listElement.appendChild(listItem);

        // Channel selection
        listItem.addEventListener("click", (event) => {

            // Don't select channel when clicking favorite
            if (event.target.closest("button")) return;

            listElement.querySelectorAll("li").forEach((item) => {
                item.classList.remove("bg-purple-600");
                item.classList.add("bg-[#202B45]");
            });

            listItem.classList.remove("bg-[#202B45]");
            listItem.classList.add("bg-purple-600");

            preview_video.src = channel.video;
            previewTitle.textContent = channel.name;
        });

    })
}
