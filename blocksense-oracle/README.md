# CloudCover Blocksense Oracle Usage

For our trustless peer to peer flight insurance platform to function, we need to get data from flight APIs on-chain. 

Blocksense seemed like a good candidate for this but I didn't current understand the limitations when I starting building with it. 
 
I very much would have liked to have used blocksense for the whole of the oracle usage for our project, but I'm happy that we were able to 
get it working in the capacity you can see below. 

I reused ID 31, initially I tried passing the value in as text, but could not get this to work, so instead I just took the flight status and assigned it 
a status code based on what the response was. 


```
cd examples/aviationstack
cargo update && cargo build --target wasm32-wasi --release
docker compose up
```




