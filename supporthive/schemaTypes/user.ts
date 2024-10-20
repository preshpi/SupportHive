export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'uid',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          {title: 'Male', value: 'male'},
          {title: 'Female', value: 'female'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
    },
    {
      name: 'terms',
      title: 'Terms and Conditions Accepted',
      type: 'boolean',
    },
  ],
}
