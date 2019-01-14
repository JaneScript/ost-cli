const urllib = require('urllib');
const compressing = require('compressing');
const httpClient = urllib.create();
const rename = require('./rename');
const registry = 'https://registry.npmjs.org';

function downloadNpm(url, savePath, directoryName = null) {
  const version = url.split('@')[1];
  const pkgName = url.split('@')[0];
  const pkgUrl = `${registry}/${pkgName}/${version || 'latest'}`;
  return new Promise((resolve, reject) => {
    httpClient
      .request(pkgUrl, {
        dataType: 'json',
        followRedirect: true,
      })
      .then(fetchPkgResult => {
        const { tarball } = fetchPkgResult.data.dist;
        return httpClient.request(tarball, {
          streaming: true,
          followRedirect: true
        });
      })
      .then(fetchPkgDist => {
        const res = fetchPkgDist.res;
        return compressing.tgz.uncompress(res, savePath);
      })
      .then(() => {
        if(directoryName && directoryName !== 'package') {
          rename(`${savePath}/package`, `${savePath}/${directoryName}`);
        }
        resolve(savePath);
      })
      .catch(err => {
        reject({
          __MSG__: 'Download npm fail',
          err
        })
      })
  });
}

module.exports = downloadNpm;
