window.addEventListener("load", function() {
            if (window !== window.parent) {
                document.getElementById("embed-overlay").style.display = "block";
            } else {
                document.getElementById("embed-overlay").style.display = "none";
            }
        });
