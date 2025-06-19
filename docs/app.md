# Mega-App

Mobile trading web-app for BTC test-net. Demostrates a use case for binary options p2p exchange.

**Proof-Of-Concept**

## Live preview

<div style="position: relative;display:inline-block; height: 800px; width: 550px">
<iframe src="../webapp?user=alice" style="position: relative;display:inline-block; height: 100%; width: 100%; border:none"></iframe>
</div>
<div id="cpdiv" style="position: relative;display:none; height: 800px; width: 550px">
<iframe src="../webapp?user=bob" style="position: relative;display:inline-block; height: 100%; width: 100%; border:none"></iframe>
</div>
<div>
    <input type="checkbox" id="counterparty" name="counterparty" onclick="this.checked ? (document.getElementById('cpdiv').style.display='inline-block'): (document.getElementById('cpdiv').style.display='none'); document.body.classList.add('close')" />
    <label for="counterparty">Counterparty</label>
</div>


> Serverless app. P2P-network relies on WebRTC here, start-up time is peer-discovery.

> Since offer negotiation relies on Mega-p2p and database is not optimized, the app tx-negotiates matched offers slowly - it is a 10 seconds cycle, betweeen updates. Takes like minute or two to negotiate all transactions (incl.querying mock-up oracle).

> The app does not submit tx-es automatically - they can be found in offer-view (`msg`) and submitted manually.

> EDUCATIONAL AND DEMONSTRATIONAL PURPOSES ONLY. Offers in webapp are malleable (originator signature not checked). APp doesn't publish TXes, but they can be found in offer view (see video) 

## Install


To install a web app from Safari, navigate to [THE APP](https://dk14.github.io/wolfram-mega/webapp/) in Safari, tap the "Share" button, select "Add to Home Screen," and then tap "Add" in the popup. This will create a shortcut on your home screen that acts like a native app. 
Detailed Steps:
- Open Safari: Launch the Safari web browser.
- Navigate to the Website: Enter the URL of the website you want to install as a web app.
- Tap the Share Button: Look for the "Share" button, often represented by a square with an arrow, at the bottom of the screen.
- Select "Add to Home Screen": From the share menu, choose "Add to Home Screen".
- Tap "Add": Confirm the installation by tapping "Add" in the popup that appears.
- Find the App: The installed web app will now be on your home screen, appearing as a dedicated icon. 

## Video

<img src="https://i.imgur.com/iLSNJZk.gif"></img>

<a href="./mega-demo.mp4" target="_blank">LINK</a> (non-verbal nevertheless)