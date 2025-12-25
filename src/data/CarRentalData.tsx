interface CarRentalType {
   id: number;
   page: string;
   thumb: string;
   tag?: string;
   featured?: string;
   available?: string;
   make: string;
   model: string;
   year: number;
   type: string;
   transmission: string;
   fuel_type: string;
   seats: number;
   doors: number;
   luggage_capacity: string;
   price_per_day: number;
   original_price?: number;
   rating: number;
   total_reviews?: string;
   location: string;
   pickup_locations: string[];
   dropoff_locations: string[];
   amenities: string[];
   insurance_included: boolean;
   mileage_limit: string;
   age_requirement: number;
   deposit_required: number;
   recommended?: string;
   category?: string;
}

const car_rental_data: CarRentalType[] = [
   {
      id: 1,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-1.jpg",
      tag: "Economy",
      available: "Available",
      make: "Toyota",
      model: "Yaris",
      year: 2023,
      type: "Economy",
      transmission: "Manual",
      fuel_type: "Petrol",
      seats: 5,
      doors: 4,
      luggage_capacity: "2 Small Bags",
      price_per_day: 35,
      rating: 4.5,
      total_reviews: "(12 Reviews)",
      location: "New York City, USA",
      pickup_locations: ["Airport", "Downtown", "Hotel"],
      dropoff_locations: ["Airport", "Downtown", "Hotel"],
      amenities: ["Air Conditioning", "Bluetooth", "USB Port"],
      insurance_included: true,
      mileage_limit: "200 km/day",
      age_requirement: 21,
      deposit_required: 200,
      category: "economy manual"
   },
   {
      id: 2,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-2.jpg",
      tag: "Compact",
      available: "Available",
      make: "Honda",
      model: "Civic",
      year: 2023,
      type: "Compact",
      transmission: "Automatic",
      fuel_type: "Hybrid",
      seats: 5,
      doors: 4,
      luggage_capacity: "2 Large Bags",
      price_per_day: 45,
      original_price: 55,
      rating: 4.7,
      total_reviews: "(18 Reviews)",
      location: "Los Angeles, USA",
      pickup_locations: ["Airport", "Downtown"],
      dropoff_locations: ["Airport", "Downtown"],
      amenities: ["Air Conditioning", "GPS", "Bluetooth", "Cruise Control"],
      insurance_included: true,
      mileage_limit: "250 km/day",
      age_requirement: 21,
      deposit_required: 250,
      category: "compact automatic"
   },
   {
      id: 3,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-3.jpg",
      tag: "SUV",
      featured: "Featured",
      available: "Available",
      make: "Ford",
      model: "Explorer",
      year: 2023,
      type: "SUV",
      transmission: "Automatic",
      fuel_type: "Petrol",
      seats: 7,
      doors: 4,
      luggage_capacity: "4 Large Bags",
      price_per_day: 85,
      rating: 4.8,
      total_reviews: "(25 Reviews)",
      location: "Miami, USA",
      pickup_locations: ["Airport", "Beach Resort", "Downtown"],
      dropoff_locations: ["Airport", "Beach Resort", "Downtown"],
      amenities: ["Air Conditioning", "GPS", "Bluetooth", "Rear Camera", "Leather Seats"],
      insurance_included: true,
      mileage_limit: "300 km/day",
      age_requirement: 25,
      deposit_required: 500,
      category: "suv automatic"
   },
   {
      id: 4,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-4.jpg",
      tag: "Luxury",
      available: "Available",
      make: "BMW",
      model: "5 Series",
      year: 2023,
      type: "Luxury",
      transmission: "Automatic",
      fuel_type: "Diesel",
      seats: 5,
      doors: 4,
      luggage_capacity: "3 Large Bags",
      price_per_day: 120,
      original_price: 150,
      rating: 4.9,
      total_reviews: "(30 Reviews)",
      location: "San Francisco, USA",
      pickup_locations: ["Airport", "Downtown", "Hotel"],
      dropoff_locations: ["Airport", "Downtown", "Hotel"],
      amenities: ["Air Conditioning", "GPS", "Bluetooth", "Leather Seats", "Sunroof", "Premium Sound"],
      insurance_included: true,
      mileage_limit: "200 km/day",
      age_requirement: 28,
      deposit_required: 1000,
      category: "luxury automatic"
   },
   {
      id: 5,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-5.jpg",
      tag: "Convertible",
      available: "Limited",
      make: "Mercedes-Benz",
      model: "E-Class Cabriolet",
      year: 2023,
      type: "Convertible",
      transmission: "Automatic",
      fuel_type: "Petrol",
      seats: 4,
      doors: 2,
      luggage_capacity: "2 Small Bags",
      price_per_day: 150,
      rating: 4.8,
      total_reviews: "(15 Reviews)",
      location: "Las Vegas, USA",
      pickup_locations: ["Airport", "Strip Hotels"],
      dropoff_locations: ["Airport", "Strip Hotels"],
      amenities: ["Air Conditioning", "GPS", "Bluetooth", "Leather Seats", "Premium Sound"],
      insurance_included: true,
      mileage_limit: "150 km/day",
      age_requirement: 30,
      deposit_required: 1500,
      category: "convertible automatic"
   },
   {
      id: 6,
      page: "car_rental",
      thumb: "/assets/img/listing/listing-6.jpg",
      tag: "Van",
      available: "Available",
      make: "Chevrolet",
      model: "Express",
      year: 2023,
      type: "Van",
      transmission: "Automatic",
      fuel_type: "Petrol",
      seats: 12,
      doors: 4,
      luggage_capacity: "6 Large Bags",
      price_per_day: 95,
      rating: 4.6,
      total_reviews: "(20 Reviews)",
      location: "Orlando, USA",
      pickup_locations: ["Airport", "Theme Parks"],
      dropoff_locations: ["Airport", "Theme Parks"],
      amenities: ["Air Conditioning", "Bluetooth", "USB Ports", "Sliding Doors"],
      insurance_included: true,
      mileage_limit: "250 km/day",
      age_requirement: 25,
      deposit_required: 600,
      category: "van automatic"
   }
];

export default car_rental_data;
export type { CarRentalType };