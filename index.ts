import { sign, verify } from "sigstore";

import { readFile, writeFile } from "node:fs/promises"

(async () => {
  const artifactBuffer = await readFile("artifact.zip");

  const bundle = await sign(artifactBuffer);
  await writeFile("artifact.zip.sigstore", JSON.stringify(bundle));

  await verify(bundle, artifactBuffer, {
    certificateIssuer: "https://token.actions.githubusercontent.com",
    certificateIdentityURI: "https://github.com/AshCorr/sigstore-test/.github/workflows/test.yml@refs/heads/main"
  });

  console.log("Verified!");
})();
