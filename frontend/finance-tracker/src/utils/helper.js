export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // regex ensures basic email validation
    return regex.test(email);
};

/* The validateEmail function:
Takes an email string as input.
Uses a regular expression (regex) to check if it's in the proper email format.
Returns true if it's valid, false otherwise. */

export const getInitials = (name) => {
    if(!name) return "";
    const words = name.split(" ");
    let initials ="";
    for (let i = 0; i<Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();//Converts the final initials to uppercase before returning
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionPart
        ? `${formattedInteger}.${fractionPart}`
        : formattedInteger;
}; //addThousandsSeparator(1234567.89)  // "1,234,567.89"

//recharts expects clean, predictable data.
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.category || "Unknown",
    amount: item?.amount || 0,
  }));
};
/* 
Input:
[
  { category: "Food", amount: 500 },
  { category: "Travel" }, // no amount
  {} // no category, no amount
]

Output:
[
  { category: "Food", amount: 500 },
  { category: "Travel", amount: 0 },
  { category: "Unknown", amount: 0 }
]
*/