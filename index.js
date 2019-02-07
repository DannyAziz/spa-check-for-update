const isLocalStorageEnabled = () => {
    try {
        var mod = '__storage_test__';
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
}

const stringToHash = (str) => {
    const len = str.length;
    let hash = 0;
    if (len === 0) return hash;
    let i;
    for (i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const checkForUpdate = (link = window.location.origin + '/index.html', callback = () => {}, errCallback = () => {}) => {
    if (isLocalStorageEnabled()) {
        var versionHash = localStorage.getItem('version_hash');
      } else {
        return ;
      }
    return fetch(link)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('offline');
            }
            return response.text();
        })
        .then(html => {
            var uptodate_version_hash = stringToHash(html);
            localStorage.setItem("version_hash", uptodate_version_hash);
            if (versionHash) {
                if (uptodate_version_hash != versionHash) {
                    callback();
                }
            };
        })
        .catch(err => { 
            errCallback(err);
        });
}

module.exports = checkForUpdate