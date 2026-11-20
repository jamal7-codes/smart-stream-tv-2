
export function renderChannels(channels, view = "main") {

    const preview_video = document.getElementById("preview-video");
    const previewTitle = document.getElementById("preview-title");

    const listcontainer = document.getElementById("channel-list");

    // Clear the previous channels
    listcontainer.innerHTML = "";

    //check if there are no channels
    if (channels.length === 0) {
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




        if (view === "blacklist") {

            //create restore button
            const restorButton = document.createElement("button");
            restorButton.type = "button";
            restorButton.className = "bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg";
            restorButton.textContent = "Restore"
            restorButton.dataset.action = "restore"

            // create delete button
            const deleteButton = document.createElement("button")
            deleteButton.type = "button";
            deleteButton.className = "delete bg-red-500 w-16 h-8 rounded-lg hover:bg-red-100 flex-shrink-0 cursor-pointer";
            deleteButton.dataset.action = "delete"
            deleteButton.setAttribute("aria-label", "Delete channel")
            deleteButton.textContent = "Delete";

            listItem.appendChild(deleteButton);
            listItem.appendChild(restorButton)

        } else {
            // Create favorite button
            const favButton = document.createElement("button");

            favButton.type = "button";
            favButton.className = "favButton w-6 h-6 ml-auto flex-shrink-0 cursor-pointer";
            favButton.dataset.action = "favorite";

            // Display favorite status
            favButton.textContent = channel.isFavorite ? "★" : "☆";

            // create blacklist button 
            const blacklistButton = document.createElement("button")
            blacklistButton.type = "button";
            blacklistButton.className = "blacklist bg-red-500 hover:bg-red-100 w-24 rounded-lg h-8 flex-shrink-0 cursor-pointer"
            blacklistButton.dataset.action = "blacklist"
            blacklistButton.textContent = "🚫 blacklist"


            listItem.appendChild(blacklistButton)
            listItem.appendChild(favButton);

        }


        //create restore button







        // Append elements to li
        listItem.appendChild(channelLogo);
        listItem.appendChild(channelText);

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
