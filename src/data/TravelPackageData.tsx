interface TravelPackageType {
   id: number;
   page: string;
   thumb: string;
   tag?: string;
   featured?: string;
   duration: string;
   group_size?: string;
   title: string;
   destination: string;
   location: string;
   original_price?: number;
   price: number;
   rating: number;
   total_reviews?: string;
   country?: string;
   recommended?: string;
   category?: string;
   departure_date?: string;
   return_date?: string;
   accommodation?: string;
   transportation?: string;
   meals_included?: string;
   activities?: string[];
   difficulty?: string;
   age_group?: string;
}

const travel_package_data: TravelPackageType[] = [
   {
      id: 1,
      page: "travel_packages",
      thumb: "/assets/img/listing/su/listing-1.jpg",
      tag: "Featured",
      duration: "7 Days 6 Nights",
      group_size: "12 Guests",
      title: "Two Hour Walking Tour of Manhattan",
      destination: "New York City",
      location: "New York City, USA",
      price: 320,
      rating: 4.5,
      total_reviews: "(02 Reviews)",
      departure_date: "2024-02-15",
      return_date: "2024-02-22",
      accommodation: "3-Star Hotel",
      transportation: "Bus",
      meals_included: "Breakfast & Dinner",
      activities: ["Sightseeing", "Museum Tours", "City Walk"],
      difficulty: "Easy",
      age_group: "All Ages"
   },
   {
      id: 2,
      page: "travel_packages",
      thumb: "/assets/img/listing/su/listing-2.jpg",
      duration: "5 Days 4 Nights",
      group_size: "8 Guests",
      title: "When you visit the Eternal Dubai City",
      destination: "Dubai",
      location: "Dubai, UAE",
      price: 220,
      rating: 4.5,
      total_reviews: "(02 Reviews)",
      departure_date: "2024-03-01",
      return_date: "2024-03-06",
      accommodation: "4-Star Hotel",
      transportation: "Flight",
      meals_included: "All Meals",
      activities: ["Desert Safari", "City Tour", "Shopping"],
      difficulty: "Easy",
      age_group: "All Ages"
   },
   {
      id: 3,
      page: "travel_packages",
      thumb: "/assets/img/listing/su/listing-3.jpg",
      tag: "Featured",
      duration: "3 Days 2 Nights",
      group_size: "15 Guests",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      destination: "Rome",
      location: "Rome, Italy",
      price: 420,
      rating: 4.5,
      total_reviews: "(02 Reviews)",
      departure_date: "2024-04-10",
      return_date: "2024-04-13",
      accommodation: "3-Star Hotel",
      transportation: "Train",
      meals_included: "Breakfast",
      activities: ["Museum Tours", "Historical Sites", "Art Galleries"],
      difficulty: "Moderate",
      age_group: "Adults"
   },
   {
      id: 4,
      page: "travel_packages",
      thumb: "/assets/img/listing/su/listing-4.jpg",
      duration: "10 Days 9 Nights",
      group_size: "20 Guests",
      title: "Day Oahu Tour Honolulu Pearl Harbor, & Diamond",
      destination: "Hawaii",
      location: "Honolulu, Hawaii, USA",
      price: 120,
      rating: 4.5,
      total_reviews: "(02 Reviews)",
      departure_date: "2024-05-15",
      return_date: "2024-05-25",
      accommodation: "Resort",
      transportation: "Flight",
      meals_included: "All Meals",
      activities: ["Beach Activities", "Historical Tours", "Snorkeling"],
      difficulty: "Easy",
      age_group: "All Ages"
   },
   {
      id: 5,
      page: "travel_packages",
      thumb: "/assets/img/listing/su/listing-5.jpg",
      tag: "Popular",
      duration: "6 Days 5 Nights",
      group_size: "10 Guests",
      title: "European Adventure: Paris to Rome",
      destination: "Europe",
      location: "Paris, France to Rome, Italy",
      price: 890,
      rating: 4.8,
      total_reviews: "(15 Reviews)",
      departure_date: "2024-06-01",
      return_date: "2024-06-07",
      accommodation: "4-Star Hotels",
      transportation: "Train & Flight",
      meals_included: "Breakfast & Dinner",
      activities: ["City Tours", "Museum Visits", "Wine Tasting"],
      difficulty: "Moderate",
      age_group: "Adults"
   },
   {
      id: 6,
   page: "travel_packages",
   thumb: "/assets/img/listing/su/listing-6.jpg",
   tag: "Adventure",
   duration: "4 Days 3 Nights",
   group_size: "8 Guests",
   title: "Swiss Alps Adventure Package",
   destination: "Switzerland",
   location: "Interlaken, Switzerland",
   price: 650,
   rating: 4.7,
   total_reviews: "(08 Reviews)",
   departure_date: "2024-07-10",
   return_date: "2024-07-14",
   accommodation: "Mountain Lodge",
   transportation: "Train",
   meals_included: "All Meals",
   activities: ["Hiking", "Skiing", "Mountain Tours"],
   difficulty: "Challenging",
   age_group: "Adults"
   }
];

export default travel_package_data;
export type { TravelPackageType };