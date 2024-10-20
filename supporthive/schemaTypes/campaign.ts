export default {
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    {
      name: 'createdBy',
      title: 'CreatedBy',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Campaign Country',
      type: 'string',
    },
    {
      name: 'city',
      title: 'Campaign City',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Campaign Category',
      type: 'string',
      options: {
        list: [
          {title: 'Education', value: 'Education'},
          {title: 'Health', value: 'Health'},
          {title: 'Emergency Assistance', value: 'Emergency Assistance'},
          {title: 'Community Development', value: 'Community Development'},
          {title: 'Career', value: 'Career'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'description',
      title: 'Campaign Description',
      type: 'text',
    },
    {
      name: 'goalAmount',
      title: 'Campaign Goal Amount',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Campaign Start Date',
      type: 'datetime',
    },
    {
      name: 'endDate',
      title: 'Campaign End Date',
      type: 'datetime',
    },
    {
      name: 'raiseMoneyFor',
      title: 'What do you want to raise money for?',
      type: 'text',
    },
    {
      name: 'importance',
      title: 'Why is this campaign important to you?',
      type: 'text',
    },
    {
      name: 'impact',
      title: 'What impact will this campaign have?',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Have Images related to your Campaign?',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'supportingDocuments',
      title: 'Supporting Documents',
      type: 'array',
      of: [{type: 'file'}],
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Campaign Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
        ],
      },
      initialValue: 'pending', // When a user creates a campaign, it starts as pending
    },
  ],
}
