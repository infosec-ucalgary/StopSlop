// Create a new option in the browser's right-click menu.
//
// "id" is how we identify this menu item later.
// "title" is the text the user sees.
// "contexts" determines where the option appears.
browser.contextMenus.create({
    id: "mark-slop",
    title: "Mark as AI Slop",
    contexts: ["page", "link", "video"]
});

// Listen for the user clicking a context menu item.
browser.contextMenus.onClicked.addListener(async (info, tab) => {

    // Ignore clicks on any menu item other than ours.
    if (info.menuItemId !== "mark-slop") {
        return;
    }

    // Make sure we have a valid tab to communicate with.
    if (!tab || !tab.id) {
        return;
    }

    // Ask the content script which video the user interacted with.
    const response = await browser.tabs.sendMessage(tab.id, {
        action: "mark-slop"
    });

    // If the content script found a video, save its ID.
    if (response && response.videoId) {

        // Retrieve the existing list of blocked videos.
        const data = await browser.storage.local.get("blockedVideos");

        // Use an empty array if no videos have been blocked yet.
        const blockedVideos = data.blockedVideos || [];

        // Avoid adding the same video twice.
        if (!blockedVideos.includes(response.videoId)) {
            blockedVideos.push(response.videoId);
        }

        // Save the updated list.
        await browser.storage.local.set({
            blockedVideos: blockedVideos
        });
    }
});