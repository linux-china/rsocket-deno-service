run:
   deno test --reload --allow-net deno_client.ts

testing:
   rsocket-cli --metadataFormat composite --dataFormat json --request --route UserService.findById -i "1" --debug ws://localhost:8080/rsocket
