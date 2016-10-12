
### How to launch this app from terminal on MacOS.

```
$ /Applications/my-app.app/Contents/MacOS/my-app
```

### How to launch this app from terminal on Windows.

```
$ C:\Users\<user>\AppData\Local\my\app-1.0.0\my-app.exe --enable-logging
```

### How to get a list of the existing identities of keychain.

```
$ security find-identity -p codesigning ~/Library/Keychains/login.keychain

Policy: Code Signing
  Matching identities
  1) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX "Mac Developer: foobar@example.com (AABBCCDDEE)"
  2) YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY "iPhone Developer: foobar@example.com (AABBCCDDEE)"
     2 identities found

  Valid identities only
  1) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX "Mac Developer: foobar@example.com (AABBCCDDEE)"
  2) YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY "iPhone Developer: foobar@example.com (AABBCCDDEE)"
     2 valid identities found
```

## Other references

 * https://www.npmjs.com/package/electron-complete-builder#code-signing
 * https://github.com/electron-userland/electron-builder/wiki/Code-Signing.


