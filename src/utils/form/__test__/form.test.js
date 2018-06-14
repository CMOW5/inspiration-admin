import Form from '../form';

test('form data is valid', () => {
  const startState = new Form({
    'email': 'user@example.com',
    'password': '123456',
  });

  /* testing the form data */
  let formData = startState.data();

  expect(formData)
    .toEqual({'email': 'user@example.com', 'password': '123456'});

  /* testing FormData object */
  formData = new FormData();
  formData.set('email', 'user@example.com');
  formData.set('password', '123456');
  expect(formData)
    .toEqual(startState.getFormData());


  /* testing formData is cleared correctly */
  startState.reset();
  const resetData = startState.data();

  expect(resetData)
    .toEqual({'email': '', 'password': ''});
});

test('form errors are saved correctly', () => {
  const startState = new Form({});

  const errors = {
    'response': {
      'data': {
        'errors': {
          'general': [
            'general error message.',
          ],
          'email': [
            'email error message.',
          ],
          'password': [
            'password error message.',
          ],
        },
      },
    },
  };
  /* are errors being saved correctly ? */
  startState.saveErrors(errors);

  expect(startState.hasError('email'))
    .toBe(true);
  expect(startState.hasError('password'))
    .toBe(true);
  expect(startState.hasError('general'))
    .toBe(true);

  /* is error message correct ? */
  expect(startState.getErrorMessage('email'))
    .toBe('email error message.');
  expect(startState.getErrorMessage('password'))
    .toBe('password error message.');
  expect(startState.getErrorMessage('general'))
    .toBe('general error message.');

  /* are errors cleared correctly ? */
  startState.clearErrors();

  expect(startState.hasError('email'))
    .toBe(false);
  expect(startState.hasError('password'))
    .toBe(false);
  expect(startState.hasError('general'))
    .toBe(false);
});
