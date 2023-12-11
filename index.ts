import { bundleToJSON } from "@sigstore/bundle";
import {
  CIContextProvider,
  DSSEBundleBuilder,
  FulcioSigner,
  RekorWitness,
  TSAWitness,
} from "@sigstore/sign";
import { write } from "node:fs";

import { readFile, writeFile } from "node:fs/promises"

(async () => {
  // Set-up the signer
  const signer = new FulcioSigner({
    fulcioBaseURL: "https://fulcio.sigstore.dev",
    identityProvider: new CIContextProvider("sigstore"),
  });

  // Set-up the witnesses
  const rekorWitness = new RekorWitness({
    rekorBaseURL: "https://rekor.sigstore.dev",
  });

  // Instantiate a bundle builder
  const bundler = new DSSEBundleBuilder({
    signer,
    witnesses: [rekorWitness],
  });

  const artifactBuffer = await readFile("artifact.zip");

  // Sign a thing
  const artifact = {
    type: "application/zip",
    data: artifactBuffer,
  };

  const bundle = await bundler.create(artifact);
  await writeFile("cosign.bundle", JSON.stringify(bundleToJSON(bundle)))
})();
