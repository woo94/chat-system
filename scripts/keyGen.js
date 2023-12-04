const crypto = require("crypto");
const fs = require("fs-extra");

function generateKeyPair() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
}

async function main() {
  const { privateKey, publicKey } = generateKeyPair();
  await fs.ensureDir("./secret");
  const dirState = await fs.readdir("./secret");
  if (dirState.length > 0) {
    throw Error(
      "already public/private key pair existing\nif you want to create new one, delete existing key pair first",
    );
  }
  await fs.writeFile("./secret/publicKey.pem", publicKey, {
    encoding: "utf8",
  });
  await fs.writeFile("./secret/privateKey.pem", privateKey, {
    encoding: "utf8",
  });
}

main();
