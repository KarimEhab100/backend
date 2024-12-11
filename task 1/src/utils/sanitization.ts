class Sanitization {
    /**for showing the important information for user only */
    User(user: any) {
        return {
            _id: user?._id,
            username: user?.username,
            name: user?.name,
            email: user?.email,
            role: user?.role,
            active: user?.active,
            hasPassword: user?.hasPassword,
            image: user?.image,
        }
    }
}

const sanitization = new Sanitization();
export default sanitization;