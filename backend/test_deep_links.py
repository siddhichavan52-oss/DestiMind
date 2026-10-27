import urllib.parse

def generate_hotel_deep_links(hotel_name: str, destination_name: str, city: str, state: str, checkin: str, checkout: str, adults: int = 2, rooms: int = 1):
    search_term = f"{hotel_name} {destination_name} {city} {state}".strip()
    encoded_q = urllib.parse.quote_plus(search_term)
    encoded_hotel = urllib.parse.quote_plus(f"{hotel_name} {city}")
    
    # 1. Google Hotels with dates & guests pre-filled
    # Google Travel supports: dates=YYYY-MM-DD_YYYY-MM-DD
    google_hotels_url = f"https://www.google.com/travel/hotels?q={encoded_q}&dates={checkin}_{checkout}&adults={adults}&rooms={rooms}"
    
    # 2. Booking.com with dates, adults, and rooms pre-filled
    booking_com_url = f"https://www.booking.com/searchresults.html?ss={encoded_hotel}&checkin={checkin}&checkout={checkout}&group_adults={adults}&no_rooms={rooms}"
    
    # 3. Agoda with check-in, check-out, adults, rooms pre-filled
    agoda_url = f"https://www.agoda.com/search?text={encoded_hotel}&checkIn={checkin}&checkOut={checkout}&rooms={rooms}&adults={adults}"
    
    # 4. Google Maps place search
    google_maps_url = f"https://www.google.com/maps/search/{encoded_q}"
    
    return {
        "googleHotelsUrl": google_hotels_url,
        "bookingComUrl": booking_com_url,
        "agodaUrl": agoda_url,
        "googleMapsUrl": google_maps_url,
        "primaryBookingUrl": google_hotels_url,
    }

if __name__ == "__main__":
    links = generate_hotel_deep_links(
        hotel_name="Kudrat - A Boutique Homestay",
        destination_name="Tirthan Valley",
        city="Kullu",
        state="Himachal Pradesh",
        checkin="2026-11-05",
        checkout="2026-11-10",
        adults=2,
        rooms=1
    )
    for k, v in links.items():
        print(f"{k}: {v}")
