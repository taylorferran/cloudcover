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
    registration: Option<String>,
    iata: Option<String>,
    icao: Option<String>,
    icao24: Option<String>,
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

    let flight_status = flight_response.data[0].flight_status.clone();
    let status_code = match flight_status.as_str() {
        "active" => 0,
        "landed" => 1,
        "cancelled" => 2,
        _ => -1,
    };
    let status_code_f64: f64 = status_code as f64;

    println!("Status code: {}", status_code);

    let mut payload: Payload = Payload::new();
    
    payload.values.push(DataFeedResult {
        id: data_feed.id.clone(),
        value: DataFeedResultValue::Numerical(status_code_f64),
    });
    Ok(payload)
}
