import { sign, verify } from "sigstore";

import { readFile, writeFile } from "node:fs/promises"

(async () => {
  const artifactBuffer = await readFile("artifact.zip");

  const bundle = await sign(artifactBuffer);
  await writeFile("artifact.zip.sigstore", JSON.stringify(bundle));

  // await verify(bundle, artifactBuffer, {
  //   certificateIssuer: "1.3.6.1.4.1.57264.1.1",
  //   certificateIdentityURI: "https://github.com/AshCorr/sigstore-test/.github/workflows/test.yml@refs/heads/main"
  // });

  console.log("Verified!");
})();
