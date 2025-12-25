
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}

const menu_data: MenuItem[] = [
    {
        id: 1,
        title: "Home",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/", title: "Travel Agency" },
            { link: "/car-rental-home", title: "Car Rental" },
        ],
    },
    {
        id: 2,
        title: "Travel Packages",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/travel-packages", title: "All Packages" },
            { link: "/package-details/1", title: "Package Details" },
        ],
    },
    {
        id: 3,
        title: "Car Rental",
        link: "#",
        has_dropdown: true,
        sub_menus: [
            { link: "/car-listing", title: "Available Cars" },
            { link: "/car-details/1", title: "Car Details" },
        ],
    },
];

export default menu_data;