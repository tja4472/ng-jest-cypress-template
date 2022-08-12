// https://jestjs.io/docs/configuration#resolver-string
module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    packageFilter: (pkg) => {
      if (pkg.name === undefined) {
        return { ...pkg };
      }
      /*    
      if (pkg.name.includes('event')) {
        console.log('+++', pkg.name);
      }
      */
      if (
        // pkg.name === 'uuid' ||
        pkg.name === 'rxjs' ||
        pkg.name === '@firebase/app' ||
        pkg.name === '@firebase/auth' ||
        pkg.name === '@firebase/auth-compat' ||
        pkg.name === '@firebase/database' ||
        pkg.name === '@firebase/database-compat' ||
        pkg.name === '@firebase/firestore' ||
        pkg.name === '@firebase/firestore-compat' ||
        pkg.name === '@firebase/messaging' ||
        pkg.name === '@firebase/storage' ||
        pkg.name === '@firebase/util' ||
        pkg.name === 'firebase'
      ) {
        // console.log('>>>', pkg.name)
        delete pkg['exports'];
        delete pkg['module'];
      }
      return pkg;
    },
  });
};
