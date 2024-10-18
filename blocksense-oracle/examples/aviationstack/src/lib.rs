use anyhow::Result;
use blocksense_sdk::{  
    oracle::{DataFeedResult, DataFeedResultValue, Payload, Settings}, 
    oracle_component,
    spin::http::{send, Method, Request, Response},
};
use serde::Deserialize;
use url::Url;

#[derive(Deserialize, Debug)]
#[allow(dead_code)]
struct Rate {
    from: String,
    to: String,
    rate: f64,
    timestamp: u64,
}

use serde::Serialize;

#[derive(Debug, Serialize, Deserialize)]
struct Pagination {
    limit: u32,
    offset: u32,
    count: u32,
    total: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct AirportInfo {
    airport: String,
    timezone: String,
    iata: String,
    icao: String,
    terminal: Option<String>,
    gate: Option<String>,
    delay: Option<u32>,
    scheduled: String,
    estimated: String,
    actual: Option<String>,
    estimated_runway: Option<String>,
    actual_runway: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct AirlineInfo {
    name: String,
    iata: String,
    icao: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct FlightInfo {
    number: String,
    iata: String,
    icao: String,
    codeshared: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct AircraftInfo {
    registration: String,
    iata: String,
    icao: String,
    icao24: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct LiveFlightData {
    updated: String,
    latitude: f64,
    longitude: f64,
    altitude: f64,
    direction: f64,
    speed_horizontal: f64,
    speed_vertical: f64,
    is_ground: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct Flight {
    flight_date: String,
    flight_status: String,
    departure: AirportInfo,
    arrival: AirportInfo,
    airline: AirlineInfo,
    flight: FlightInfo,
    aircraft: AircraftInfo,
    live: Option<LiveFlightData>,
}

#[derive(Debug, Serialize, Deserialize)]
struct FlightResponse {
    pagination: Pagination,
    data: Vec<Flight>,
}


#[oracle_component]
async fn oracle_request(settings: Settings) -> Result<Payload> {

    println!("1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

    let data_feed = settings.data_feeds.first().unwrap();
    let url = match data_feed.data.as_str() {
        "FR1730" => Url::parse("https://api.aviationstack.com/v1/flights?access_key=f323a3a96ca09fd72db3029c3ad3fbb0&flight_iata=FR1730")?,
        &_ => todo!(),
    };
    println!("URL - {}", url.as_str());
    let mut req = Request::builder();
    req.method(Method::Get);
    req.uri(url);
    req.header("user-agent", "*/*");
    req.header("Accepts", "application/json");

    let req = req.build();
    let resp: Response = send(req).await?;

    let body = resp.into_body();
    let string = String::from_utf8(body).expect("Our bytes should be valid utf8");
    let flight_response: FlightResponse = serde_json::from_str(&string).unwrap();
    //let value: Rate = serde_json::from_str(&string).unwrap();


    println!("2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    println!("{:?}", flight_response);
    println!("3XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    println!("{}", flight_response.data[0].flight_status.clone());
    println!("4XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

    let mut payload: Payload = Payload::new();
    
    payload.values.push(DataFeedResult {
        id: data_feed.id.clone(),
        value: DataFeedResultValue::Text(flight_response.data[0].flight_status.clone()),
    });
    Ok(payload)
}
