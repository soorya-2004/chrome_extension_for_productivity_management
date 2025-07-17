document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["history"], (data) => {
    const list = document.getElementById("history");
    const history = data.history || [];
    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.url} - ${item.timestamp}`;
      list.appendChild(li);
    });
  });
});
