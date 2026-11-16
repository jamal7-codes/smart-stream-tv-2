const API_URL = "https://6afadfe3730c1d152f32a62d.mockapi.io/channels"


export async function getChannels() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Faild to fetch channel")
    }
    const channels = await response.json();
    return channels
}


export async function resetChannels(channels) {

 
    for (const channel of channels) {

     const response = await fetch(`${API_URL}/${channel.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"

             },
            body: JSON.stringify({
                isFavorite: false,
                isBlacklisted: false
            })
        });
        if (!response.ok) {
            throw new Error(`Failed to update ${channel.name}`)
        }
        console.log(`${channel.name} updated`)
    }

    console.log("Termine !");
}



