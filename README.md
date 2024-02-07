# SyncQ
Providing custom subtitles for video and sync it with the video
This project provides a simple API for managing videos and subtitles, along with a frontend application and API.
***
## Project Details

### Overview

This project aims to provide a straightforward solution for uploading videos, associating subtitles with specific videos, and retrieving subtitles through a RESTful API. The frontend application allows users to interact with the API and test the video player with subtitles.

### Technologies Used

- Node.js
- Html & CSS
- JavaScript
- Multer
- Fluent-ffmpeg
- Other dependencies listed in [`package.json`](package.json)

***
## Frontend Guide

This guide explains how to interact with the frontend components of the video player and subtitle uploader.

### Frontend Components

#### HTML Structure [`main.html`](main.html)

The HTML file consists of the following components:

- **Video Input**: Allows users to select a video file.
- **Subtitle Input**: A textarea for entering subtitles in the format `00:00:40.530\nSubtitle Text`.
- **Create VTT File Button**: Initiates the creation of a VTT file with entered subtitles.
- **Video Player**: Displays the selected video and subtitles.

#### JavaScript Logic (`main.js`)

The JavaScript file contains the following functions:

##### 1. `handleVideoInput(event)`

- Triggered when a user selects a video file.
- Retrieves the video player element and the selected video file.
- Sets the source of the video player to a URL created from the selected video file.

##### 2. `createVttFile()`

- Triggered when the user clicks the "Create VTT File" button.
- Retrieves the entered subtitle text and the video player element.
- Checks if the subtitle text is not empty and follows the format `00:00:40.530\nSubtitle Text`.
- Creates a WebVTT content string using the entered subtitle and the duration of the video.
- Creates a Blob from the content and generates a URL for the Blob.
- Creates a new track element, sets its attributes, appends it to the video player, and sets the mode to 'showing' to display the subtitles by default.

### Frontend Testing Steps

Follow these steps to test the frontend components:

1. Open the `index.html` file in a web browser.
2. Use the "Choose File" button to select a video file.
3. Enter subtitles in the textarea using the format `00:00:40.530\nSubtitle Text`.
4. Click the "Create VTT File" button to create subtitles for the video.
5. Verify that the video plays with the entered subtitles displayed.

```diff
Take Note that Inputs must be in format :-
00:00:40.530
////text.
or
00:00:40.530-->00:00:43.530
////texts
```

**Note**: Ensure that your server (backend) is running to handle video and subtitle uploads. Adjust the file paths and server configurations in the HTML and JavaScript files if necessary.

For more detailed testing, consider using different video files and subtitles. Ensure that the frontend and backend are integrated correctly to handle video and subtitle interactions.
***
## API Test Guide

This guide provides step-by-step instructions on how to test the API for uploading videos, subtitles, and retrieving subtitles using the provided endpoints.

### Upload a Video

1. Use the `/api/upload/video` endpoint to upload a video file.
2. Make a `POST` request to `http://localhost:3000/api/upload/video` using tools like cURL or Postman.
3. Attach the video file to the request.
4. Upon successful upload, note the `videoId` returned in the response.

### Upload Subtitles

1. Use the `/api/upload/subtitles/:videoId` endpoint to upload subtitles for a specific video.
2. Replace `:videoId` in the endpoint with the actual `videoId` obtained in the previous step.
3. Make a `POST` request to `http://localhost:3000/api/upload/subtitles/:videoId` using tools like cURL or Postman.
4. Attach the subtitles file to the request.

### Retrieve Subtitles

1. Open Postman or any similar tool that allows HTTP requests.
2. Create a new request.
3. Set the request type to `GET`.
4. Enter the API endpoint for subtitle retrieval: `http://localhost:3000/api/subtitles/:videoId`.
   - Replace `:videoId` with the actual `videoId` obtained from the video upload.
   - Adjust the base URL and port based on your server configuration.
5. Click the "Send" button to execute the request.
6. If the setup is correct, the response body should contain the WebVTT-formatted subtitles associated with the specified video.

**Note**: Ensure that your server is running and the provided endpoints are correctly configured. Adjust the URLs and ports as needed based on your server setup.
