# StopSlop

StopSlop is a Firefox browser extension that allows users to mark YouTube videos as "AI Slop" and hide those videos when they appear again.

## Overview

StopSlop currently works by allowing the user to right-click a YouTube video and select **"Mark as AI Slop"**.

When a video is marked:

1. StopSlop extracts the video's YouTube ID.
2. The ID is saved using Firefox's local extension storage.
3. When the video appears again, StopSlop detects its ID.
4. The video is hidden from the YouTube page.

The list of blocked videos is stored locally in the browser.

## Current Features

- Mark YouTube videos as AI Slop
- Remember previously marked videos
- Hide marked videos when they appear again
- Works with dynamically loaded YouTube content
- Uses Firefox's local extension storage
- Currently designed for Firefox

## Installing in Firefox

StopSlop is currently an early development version and is not distributed through the Firefox Add-ons store.

To install the extension locally:

# Running StopSlop in Firefox

StopSlop is currently a development extension, so it is not installed through the Firefox Add-ons store.

To run StopSlop, you need to load the extension manually into Firefox.

## Requirements

You need:
- Firefox
- Git
- A copy of the StopSlop repository

## Step 1: Clone the repository

Open a terminal and clone the repository:

```bash
git clone [https://github.com/infosec-ucalgary/StopSlop.git](https://github.com/infosec-ucalgary/StopSlop.git)
```

Enter the repository:

```bash
cd StopSlop
```

## Step 2: Open Firefox

Open Firefox. In the address bar, enter:

```text
about:debugging#/runtime/this-firefox
```

Press **Enter**. This opens the `about:debugging` page.

## Step 3: Load StopSlop

On the `about:debugging` page, select:
**This Firefox**

Then click:
**Load Temporary Add-on...**

## Step 4: Select the extension

Navigate to the StopSlop repository you cloned. Open the `extension` folder. Inside the folder, select:

`manifest.json`

Click **Open**. Firefox will now load StopSlop as a temporary extension.

## Step 5: Open YouTube

Open Youtube

StopSlop will automatically run on YouTube pages.

## Step 6: Mark a video as AI Slop

1. Find a YouTube video.
2. Right-click the video or its link.
3. From the context menu, select **Mark as AI Slop**.
4. The extension will save the video's YouTube ID. The video should then be hidden.

## Step 7: Test the extension

1. Refresh the YouTube page.
2. Find the same video again.
3. If StopSlop detects the video, it will hide it automatically.
4. You can also close and reopen Firefox and test the video again. The blocked video ID is stored using Firefox's local extension storage.

---

### Important: Temporary Extensions

When StopSlop is loaded using **Load Temporary Add-on...**, Firefox treats it as a temporary development extension. The extension may need to be loaded again after restarting Firefox. This is expected while StopSlop is being developed and tested. A future version can be packaged and distributed as a normal Firefox extension.
