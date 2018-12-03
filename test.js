function jpegify(path, name) {
    console.log('jpegifying...');

    return new Promise(resolve => {
        Jimp.read(path, (err, file) => {
            if (err) throw err;
            var path = './tempimg/' + name + '.jpg'
            file.write(path, () => {
                resolve(path);
            });
        });
    });
}
  
async function hash(name, type) {
    console.log('hashing...');
    var path;

    path = 'img/' + name + type;

    if(type == '.png') {
        path = await jpegify(path, name);
        console.log('new path: ', path);
    }

    console.log('using path: ', path);

    return imghash.hash(path, hashparams.bits, hashparams.format)
        .then((hash) => {
        console.log('image hash: ', hash);
        return hash;
    });
    // TODO: delete tempimg;
}