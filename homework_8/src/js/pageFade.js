function fadeInPage() {
    if (!window.AnimationEvent) { 
        return; 
    }
    const fader = document.getElementById("fader");
    fader.classList = 'fade-out';
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) { 
        return; 
    }
    let anchors = document.getElementsByTagName('a');
    for (let i in anchors) {
        if (anchors[i].hostname !== window.location.hostname || anchors[i].pathname === window.location.pathname) {
            continue;
        }
        anchors[i].addEventListener('click', function(e) {
            const fader = document.getElementById('fader');
            let anchor = e.currentTarget;
            let listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            }
            fader.addEventListener('animationend', listener);
            e.preventDefault();
            fader.classList = 'fade-in';
        });
    }
});

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }
    const fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});
