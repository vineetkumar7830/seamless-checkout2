# Remote Frontend Collaboration Guide

Since you are working remotely, your frontend developer needs a way to "see" your local API server and its Swagger documentation. Here are the best ways to do that:

## 1. Using VS Code "Port Forwarding" (Internal Tool)
*Note: If you see an error like `spawn code-tunnel.exe ENOENT`, it means the internal VS Code helper is missing. Use the alternatives below instead.*

1. In your VS Code, go to the **Ports** tab (usually next to the Terminal).
2. Click **Forward a Port** and enter `9000`.
3. Change the **Visibility** to "Public" (Right-click the link).
4. Send the generated URL to your developer.

## 2. Using SSH Pinggy (Zero-Install Backup)
If `npx` or `ngrok` gives you SSL or Permission errors, use this built-in Windows command. It requires **no installation**:
1. Open a new terminal and run:
   ```bash
   ssh -p 443 -R0:localhost:9000 qr@pinggy.io
   ```
2. It will ask "Are you sure you want to continue connecting?". Type `yes` and press Enter.
3. It will generate a URL (e.g., `https://random-id.a.pinggy.link`).
4. Share that URL with your developer.

## 2. Using SSH Localhost.run (Fastest Zero-Install)
If the previous commands failed, try this one. It uses a different port (22) and usually bypasses more firewalls:
1. Open a new terminal and run:
   ```bash
   ssh -R 80:localhost:9000 ssh.localhost.run
   ```
2. If asked "Are you sure you want to continue?", type `yes` and press Enter.
3. Look for the line that says `tuned to https://your-name.lhr.life`.
4. Share that link with your developer.

## 3. Manual Ngrok Download (Fixes SSL/NPM Errors)
If `npx` gave you an SSL error, download it manually to bypass the error:
1. Go to [ngrok.com/download](https://ngrok.com/download) and download the Windows ZIP.
2. Extract the `ngrok.exe` to your project folder (`d:\seamless-checkout2`).
3. Open a terminal and run:
   ```bash
   .\ngrok.exe http 9000
   ```
4. Copy the "Forwarding" URL and share it.

## 5. Troubleshooting WiFi Connection Issues
If the developer can see the URL on mobile data but **not on WiFi**, the WiFi network is likely blocking the tunnel domain.

### Quick Fixes for the Developer:
- **Change DNS**: Ask them to set their DNS to **Google DNS** (`8.8.8.8` and `8.8.4.4`) or **Cloudflare** (`1.1.1.1`).
- **Disable Firewall**: Temporarily disable any aggressive network firewalls or "Safe Search" features on the router.
- **Use a VPN**: Connecting to a VPN often bypasses network-level blocks on tunneling services.
- **Try Localtunnel**: Switch to Method #3 above, as different networks block different tunneling providers.

---
## 6. Remote Swagger Access
Once you have shared the tunnel URL, your developer can access the full API documentation at:
`[TUNNEL_URL]/api/docs`

They can then:
1. See every endpoint and requirement.
2. Use the **Try it out** button to send real requests to your machine.
3. See exactly what JSON body is required for the new 2FA Login and Company features.

## 4. Frontend Configuration
The frontend developer should update their `.env` file (or config) to point to your tunnel:
```env
# Frontend .env
VITE_API_BASE_URL=https://your-tunnel-url.forwarded.com/api
```

---
> **Important**: Keep your `npm run start:dev` terminal running while they are testing, or the tunnel will disconnect!
