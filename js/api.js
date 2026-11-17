
// Store the MockAPI URL in one constant so we can reuse it
const API_URL = "https://6afadfe3730c1d152f32a62d.mockapi.io/channels";

// GET: Create a function to retrieve all channels from the API
export async function getChannels() {
    // Send a GET request to the API.
    const response = await fetch(API_URL);


   
    // Check if the server returned a successful response
    if (!response.ok) {
        // Stop the function and show an error if the request failed
        throw new Error(`Failed to fetch channels: ${response.status}`);
    }

    // Convert the response body from JSON into JavaScript data
    const channels = await response.json();

    // Return the channels so other files can use them
    return channels;
}

// POST: Create a function to add a new channel to the API
export async function createChannel(channel) {
    // Send a POST request with the new channel
    const response = await fetch(API_URL, {
        // Define the HTTP method
        method: "POST",

        // Tell the server that we are sending JSON data
        headers: {
            "Content-Type": "application/json"
        },

        // Convert the channel object into a JSON string
        body: JSON.stringify(channel)
    });

    // Check if the server returned a successful response
    if (!response.ok) {
        // Stop the function and show the HTTP error status.
        throw new Error(`Failed to create channel: ${response.status}`);
    }

    // Convert and return the created channel.
    return await response.json();
}

// PUT: Create a function to update an existing channel.
export async function updateChannel(id, changes) {
     
    // Build the URL using the channel ID.
    const response = await fetch(`${API_URL}/${id}`, {
        // Define the HTTP method.
        method: "PUT",

        // Tell the server that we are sending JSON data.
        headers: {
            "Content-Type": "application/json"
        },

        // Convert the changes object into a JSON string.
        body: JSON.stringify(changes)
    });

    // Check if the server returned a successful response.
    if (!response.ok) {
        // Stop the function and show the HTTP error status.
        throw new Error(`Failed to update channel: ${response.status}`);
    }

    // Convert and return the updated channel.
    return await response.json();
}

// DELETE: Create a function to delete a channel.
export async function deleteChannel(id) {
    // Build the URL using the channel ID.
    const response = await fetch(`${API_URL}/${id}`, {
        // Define the HTTP method.
        method: "DELETE"
    });

    // Check if the server returned a successful response.
    if (!response.ok) {
        // Stop the function and show the HTTP error status.
        throw new Error(`Failed to delete channel: ${response.status}`);
    }

    // Convert and return the deleted channel response.
    return await response.json();
}

// TEMPORARY: Create a function to reset favorite and blacklist values
export async function resetChannels(channels) {
    // Loop through every channel in the array.
    for (const channel of channels) {
        // Send a PUT request for the current channel.
        const response = await fetch(`${API_URL}/${channel.id}`, {
            // Define the HTTP method
            method: "PUT",

            // Tell the server that we are sending JSON data
            headers: {
                "Content-Type": "application/json"
            },

            // Reset both properties to false
            body: JSON.stringify({
                isFavorite: false,
                isBlacklisted: false
            })
        });

        // Check if the update was successful
        if (!response.ok) {
            // Stop the function if the update failed
            throw new Error(`Failed to reset channel: ${channel.name}`);
        }

        // Display a message for the updated channel
        console.log(`${channel.name} updated.`);
    }

    // Display a message when all channels have been reset
    console.log("All channels have been reset.");
}
