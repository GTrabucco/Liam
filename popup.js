var fileName = document.getElementById("filename");
if (!fileName.value) {
    var m = new Date();
    var dateString =
        m.getFullYear() +
        ("0" + (m.getMonth() + 1)).slice(-2) +
        ("0" + m.getDate()).slice(-2) +
        ("0" + m.getHours()).slice(-2) +
        ("0" + m.getMinutes()).slice(-2) +
        ("0" + m.getSeconds()).slice(-2) + ".txt";
    document.getElementById("filename").value = dateString;
}

var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function () {
    var fileName = document.getElementById("filename").value;
    var formattedFileName = fileName.substr(0, fileName.lastIndexOf('.')) || fileName;
    try {
        function closeTabs(tabs) {
            var tabUrls = tabs.map(x => { return x.url }).join('\n')
            var tabIds = tabs.map(x => { return x.id })
            chrome.downloads.download({ url: 'data:text/plain;base64,' + btoa(tabUrls), filename: `Treats/${m.getFullYear()}/${m.toLocaleString('default', { month: 'long' })}/${m.getDate()}/${formattedFileName}.txt` }, (id) => {
                //chrome.tabs.remove(tabIds)
            })
        }

        function onError(error) {
            console.error(`Error: ${error}`);
        }

        chrome.tabs.query({ currentWindow: true }).then(closeTabs, onError);

    } catch (error) {
        console.error(error)
    }
});