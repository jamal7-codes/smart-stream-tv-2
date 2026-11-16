import { getChannels , resetChannels } from "./api.js";
import { renderChannels } from "./ui.js";
import { search } from "./search.js";

async function init() {

    const channelsData = await getChannels()

    await resetChannels(channelsData)

    console.log(channelsData);
    renderChannels(channelsData);
    search(channelsData)

}


init();

