## **WebRTC Live Streaming Project**

This project allows you to create a **peer-to-peer live streaming platform** using **WebRTC**. With the help of **ngrok**, the server running locally can be accessed over the internet.

### **Features:**
- Real-time video streaming using WebRTC.
- Mute functionality for the stream.
- Minimal UI with a modern look.
- Public access using ngrok for easy sharing.
  
---

### **Prerequisites:**
Make sure you have the following installed:
1. **Node.js** – [Download and Install Node.js](https://nodejs.org/)
2. **ngrok** – [Get ngrok](https://ngrok.com/)
3. **A verified ngrok account** – Required to generate an authtoken.

---

### **How to Run the Project:**

#### 1. Clone the repository:
```bash
git clone https://github.com/your-username/webrtc-livestreaming.git
cd webrtc-livestreaming
```

#### 2. Install dependencies:
```bash
npm install
```

#### 3. Add your ngrok auth token:
```bash
ngrok config add-authtoken YOUR_NGROK_AUTHTOKEN
```

Get the auth token from your [ngrok dashboard](https://dashboard.ngrok.com/get-started/your-authtoken).

#### 4. Start the server:
```bash
node server.js
```

You should see output like:
```
Server running on http://localhost:3000
```

#### 5. Expose your local server using ngrok:
Open a new terminal and run:
```bash
ngrok http 3000
```

If successful, you’ll see something like:
```
Forwarding                    https://abcd1234.ngrok.io -> http://localhost:3000
```

#### 6. Share the ngrok URL:
- Share the public URL (e.g., `https://abcd1234.ngrok.io`) with anyone to join your stream.

---

### **Usage:**
1. Open the URL (either `http://localhost:3000` or the ngrok URL) in your browser.
2. Click **"Start Streaming"** to begin the video stream.
3. Share the link with a remote peer to allow them to join the stream.

---

### **Project Structure:**
```
/webrtc-livestreaming
│
├── server.js          # Node.js backend for signaling and static file serving
├── public/
│   ├── index.html     # Frontend HTML for the streaming UI
│   ├── style.css      # CSS for styling the interface
│   └── script.js      # JavaScript to handle WebRTC logic
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation (you are here)
```

---

### **Troubleshooting:**
- **Authentication Failed in ngrok:**  
  Ensure you’ve added your auth token correctly using:
  ```bash
  ngrok config add-authtoken YOUR_AUTHTOKEN
  ```

- **Server Not Accessible via ngrok:**  
  Ensure your Node.js server is running and accessible locally at `http://localhost:3000`. Use `Ctrl+C` to stop and restart the server if needed.

---

### **License:**
This project is licensed under the [MIT License](LICENSE).

---

### **Contributing:**
Feel free to fork this repository and open a pull request for any enhancements or bug fixes!
