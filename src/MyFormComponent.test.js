import { render, screen, fireEvent } from '@testing-library/react';
import MyFormComponent from './MyFormComponent';

/*
1.	Submit the form with all fields filled in correctly: a name of 3 or more characters, a valid email, 'Agree to Terms' checked, and a gender selected.
2.	Submit the form with a very long valid name to check if the form can handle names of any length.
3.	Submit the form with a complex email address that is valid (e.g., test.name+alias@example.co.uk) to test the robustness of the email validation.
4.	Change the gender from male to female and submit the form with all other fields filled in correctly.
5.	Re-submit the form after an initial successful submission with all fields filled in correctly.
6.	Submit the form with the 'Name' field left blank.
7.	Submit the form with an invalid email address (e.g., without the "@" symbol).
8.	Submit the form without checking the 'Agree to Terms' checkbox.
9.	Submit the form without selecting a gender.
10.	Submit the form with a name that is less than 3 characters long.
*/

describe('<MyFormComponent/>', () => {
  const mockData = {
    name: 'TestName',
    email: 'email@test.com',
    agreeTerms: true,
    gender: 'male'
  }
  let formComponent;
  let name;
  let email;
  let agreeTerms;
  let genders;
  let submit;
  let form;

  const setup = () => {
    name = screen.getByPlaceholderText('Name');
    email = screen.getByPlaceholderText('Email');
    agreeTerms = screen.getByRole('checkbox');
    genders = screen.getAllByRole('radio');
    submit = screen.getByRole('button', { name: /Submit/i });
    form = document.querySelector('form');
  };

  beforeEach(() => {
    formComponent = render(<MyFormComponent />);
  });

  afterEach(() => {
    formComponent.unmount();
  });

  test('Submit the form with all fields filled in correctly', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    expect(form).toHaveFormValues(mockData);
  });

  test('Submit the form with a very long valid name', () => {
    const longName = 'TestNameTestNameTestNameTestNameTestNameTestNameTestNameTestNameTestNameTestNameTestName';

    setup();

    fireEvent.change(name, {target: {value: longName }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    expect(form).toHaveFormValues({
      ...mockData,
      name: longName
    });
  });

  test('Submit the form with a complex email address that is valid', () => {
    const complexEmail = 'test.name+alias@example.co.uk';

    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: complexEmail }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    expect(form).toHaveFormValues({
      ...mockData,
      email: complexEmail
    });
  });

  test('Change the gender from male to female', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[1])
    fireEvent.click(submit)

    expect(form).toHaveFormValues({
      ...mockData,
      gender: 'female'
    });
  });

  test('Re-submit the form after an initial successful submission', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)
    fireEvent.click(submit)

    expect(form).toHaveFormValues({});
  });

  test('Submit the form with the \'Name\' field left blank.', () => {
    setup();

    fireEvent.change(name, {target: {value: '' }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    const nameError = screen.getByText(/Name must be at least 3 characters./i)

    expect(nameError).toBeInTheDocument();
  });

  test('Submit the form with a name that is less than 3 characters long', () => {
    setup();

    fireEvent.change(name, {target: {value: 'ad' }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(submit)

    const genderError = screen.getByText(/Name must be at least 3 characters./i)

    expect(genderError).toBeInTheDocument();
  });

  test('Submit the form with an invalid email address', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: 'email.test.com' }})
    fireEvent.click(agreeTerms)
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    const emailError = screen.getByText(/Email must be valid./i)

    expect(emailError).toBeInTheDocument();
  });

  test('Submit the form without checking the \'Agree to Terms\' checkbox', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(genders[0])
    fireEvent.click(submit)

    const agreeTermsError = screen.getByText(/You must agree to the terms./i)

    expect(agreeTermsError).toBeInTheDocument();
  });

  test('Submit the form without selecting a gender', () => {
    setup();

    fireEvent.change(name, {target: {value: mockData.name }})
    fireEvent.change(email, {target: {value: mockData.email }})
    fireEvent.click(agreeTerms)
    fireEvent.click(submit)

    const genderError = screen.getByText(/You must select a gender./i)

    expect(genderError).toBeInTheDocument();
  });
});
