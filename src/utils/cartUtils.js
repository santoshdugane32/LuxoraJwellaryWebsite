export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const getCartKey = () => {
    const user = getUser();

    if (!user) {
        return "cart_guest";
    }

    return `cart_${user.id}`;
};