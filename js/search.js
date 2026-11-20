import { renderChannels } from "./ui.js";

export function search(channelsData) {



  const searchInput = document.getElementById("search-input");

  const categoryBtn = document.querySelectorAll(".category-btn")



  function filtredChannels(channelsData, searchTerm) {
    if (!searchTerm) return channelsData;


    const searchTermLower = searchTerm.toLowerCase();
    return channelsData.filter(channel => {

      return channel.name.toLowerCase().includes(searchTermLower);

    });
  }


  categoryBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const cate = e.target.dataset.category;
      if (cate === "All") {
     const filtredChannels = channelsData.filter(channel => !channel.isBlacklisted)
        renderChannels(filtredChannels);

      } else if (cate === "favorite") {

        const filterfav = channelsData.filter(
          channel => channel.isFavorite === true && !channel.isBlacklisted
        );

        renderChannels(filterfav);
      }
      
      else if (cate === "blacklist") {
        const filterblacklist = channelsData.filter(channel => channel.isBlacklisted === true)
        renderChannels(filterblacklist, "blacklist")
      } else {

        const filtred = channelsData.filter(channel => channel.category === cate && !channel.isBlacklisted)

        renderChannels(filtred)
      }


    })
  });




  //Update results when user types
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.trim(); // Trim whitespace



    const filteredResults = filtredChannels(channelsData, searchTerm);
    renderChannels(filteredResults)
  });

  // Show all channel on page load
  renderChannels(channelsData);

}