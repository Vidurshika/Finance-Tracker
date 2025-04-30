export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // regex ensures basic email validation
    return regex.test(email);
};

/* The validateEmail function:
Takes an email string as input.
Uses a regular expression (regex) to check if it's in the proper email format.
Returns true if it's valid, false otherwise. */