export function useValidate() {
    function validateEmail(email) {
        return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
    }

    return {
        validateEmail,
    };
}
