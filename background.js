chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = tab.url;

    // Save to local storage
    chrome.storage.local.get(["history"], (data) => {
      const history = data.history || [];
      history.push({ url, timestamp: new Date().toISOString() });
      chrome.storage.local.set({ history }, () => {
        console.log("Saved to local storage:", { url });

        // ✅ After local save, POST to backend
        fetch("http://localhost:5002/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            timestamp: new Date().toISOString(),
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log("Saved to backend:", data))
          .catch((err) => console.error("Failed to sync:", err));
      });
    });
  }
});
