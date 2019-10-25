function copyOnClick() {
    var copyText = document.getElementById("shortenURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Short URL copied: \n" + copyText.value);
}