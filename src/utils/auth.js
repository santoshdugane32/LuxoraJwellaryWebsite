export const getUser = () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
};


export const getCartKey = () => {
    const user = getUser();

    if (!user) {
        return null;
    }

    return `lux_cart_${user.id || user.email}`;
};