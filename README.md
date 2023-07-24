# Use Case #7

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test/use-case`
To run all use-cases locally:
1.	Submit the form with all fields filled in correctly: a name of 3 or more characters, a valid email, 'Agree to Terms' checked, and a gender selected.
2.	Submit the form with a very long valid name to check if the form can handle names of any length.
3.	Submit the form with a name that is less than 3 characters long.
4. Submit the form with a complex email address that is valid (e.g., test.name+alias@example.co.uk) to test the robustness of the email validation.
5. Change the gender from male to female and submit the form with all other fields filled in correctly.
6. Re-submit the form after an initial successful submission with all fields filled in correctly.
7. Submit the form with the 'Name' field left blank.
8. Submit the form with an invalid email address (e.g., without the "@" symbol).
9. Submit the form without checking the 'Agree to Terms' checkbox.
10. Submit the form without selecting a gender.
