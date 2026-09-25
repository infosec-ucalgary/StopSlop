// Stores the video ID that the user most recently right-clicked.
let lastVideoId = null;


// Listen for right-clicks anywhere on the YouTube page.
document.addEventListener("contextmenu", (event) => {

    // Find the closest link to where the user right-clicked.
    const videoElement = event.target.closest("a");

    // If the click was not inside a link, stop.
    if (!videoElement) {
        return;
    }

    // Get the URL of the link.
    const href = videoElement.href;

    // Stop if the link has no URL.
    if (!href) {
        return;
    }

    // Convert the URL string into a URL object.
    const url = new URL(href);

    // Make sure the link belongs to YouTube.
    if (url.hostname !== "www.youtube.com") {
        return;
    }

    // Extract the video ID from the URL.
    //
    // Example:
    // https://www.youtube.com/watch?v=ABC123
    //
    // The video ID is "ABC123".
    const videoId = url.searchParams.get("v");

    // Save the video ID if one was found.
    if (videoId) {
        lastVideoId = videoId;
    }
});


// Listen for messages from the background script.
browser.runtime.onMessage.addListener((message) => {

    // The background script sends this action when the user
    // clicks "Mark as AI Slop".
    if (message.action === "mark-slop") {

        // Return the last video ID we detected.
        return Promise.resolve({
            videoId: lastVideoId
        });
    }
});


// Retrieve the list of blocked videos from browser storage.
async function getBlockedVideos() {

    // Get the saved data using the key "blockedVideos".
    const data = await browser.storage.local.get("blockedVideos");

    // Return the array, or an empty array if none exists.
    return data.blockedVideos || [];
}


// Find and hide videos that are in the blocked list.
async function hideBlockedVideos() {

    // Get all video IDs that the user has marked.
    const blockedVideos = await getBlockedVideos();

    // Find links that contain a YouTube watch URL.
    const links = document.querySelectorAll(
        'a[href*="/watch?v="]'
    );

    // Check every matching link.
    for (const link of links) {

        // Convert the link into a URL object.
        const url = new URL(link.href);

        // Extract the video ID.
        const videoId = url.searchParams.get("v");

        // Skip links without a video ID.
        if (!videoId) {
            continue;
        }

        // Check whether this video has been blocked.
        if (blockedVideos.includes(videoId)) {

            // Find the video card containing the link.
            const container = link.closest(
                "ytd-rich-item-renderer, ytd-video-renderer"
            );

            // If a container was found, hide it.
            if (container) {
                container.style.display = "none";
            }
        }
    }
}


// Watch for changes to YouTube's webpage.
const observer = new MutationObserver(() => {

    // Run our blocking function whenever new content appears.
    hideBlockedVideos();
});


// Start observing the entire document.
//
// childList: Watch for elements being added or removed.
// subtree: Watch inside all descendants of the document.
observer.observe(document.body, {
    childList: true,
    subtree: true
});


// Run once when the script first loads.
hideBlockedVideos();